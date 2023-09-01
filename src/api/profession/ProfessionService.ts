import { getAllCraftedItems } from "./CraftedItemsService"
import { transformRecipeNameLower } from "./RecipeService"
import {
	Category,
	ICraftingData,
	ProfessionSkillTree,
	ProfessionSkillTreeResponse
} from "./types"
import { PrismaPromise } from "@prisma/client"
import { prisma } from "../utils/db"
import { OAuthClient } from "../oauth/client"

const oauthClient = new OAuthClient()

const BASE_URL = "https:eu.api.blizzard.com"

import professionMap from "../assets/professionCalls.json"

const PROFESSION_SKILL_TIER_URL = (professionId: number, skillTierId: number) =>
	`${BASE_URL}/data/wow/profession/${professionId}/skill-tier/${skillTierId}?namespace=static-eu&locale=en_US&region=eu`

const getProfessionSkillTree = async (
	professionId: number,
	skillTierId: number
) => {
	console.log("OAUTH",  oauthClient.client);
	const authToken = await oauthClient.getToken()

	return (await fetch(PROFESSION_SKILL_TIER_URL(professionId, skillTierId), {
		method: "GET",
		headers: {
			Authorization: `Bearer ${authToken.token.access_token}`
		}
	}).then((res) => res.json())) as ProfessionSkillTreeResponse
}

const saveAllProfessions = async () => {
	const allProfessionsResponses = await Promise.all(
		professionMap.map(({ professionId, skillTierId }) =>
			getProfessionSkillTree(professionId, skillTierId)
		)
	)
	const allProfessions = allProfessionsResponses.map<ProfessionSkillTree>(
		(professionResponse) => ({
			id: professionResponse.id,
			links: professionResponse._links.self.href,
			name: professionResponse.name,
			maximum_skill_level: professionResponse.maximum_skill_level,
			minimum_skill_level: professionResponse.minimum_skill_level,
			categories: professionResponse.categories
		})
	)
	const allCraftedItems = await getAllCraftedItems()
	const allCraftedItemsMap = allCraftedItems.reduce(
		(acc, curr) => ({
			...acc,
			[curr.item_name]: curr
		}),
		{} as { [key: string]: ICraftingData }
	)
	const allProfessionsWithMappedRecipes = allProfessions.map<Omit<ProfessionSkillTree, 'categories'> & {
		categories: {
			create: Category[],
		}
	}>(
		(professionSkillTree) => {
			const mappedProfessionSkillTreeCategoriesCreateInput =
				professionSkillTree.categories.map<Category>((category) => {
					const mappedRecipes = category.recipes
						.map((recipe) => ({
							...recipe,
							id_crafted_item:
								allCraftedItemsMap[transformRecipeNameLower(recipe)]
									?.id_crafted_item
						}))
						.filter((recipe) => recipe.id_crafted_item)
					return {
						...category,
						recipes: mappedRecipes
					};
				})

			return {
				...professionSkillTree,
				categories: {
					create: mappedProfessionSkillTreeCategoriesCreateInput.filter(
						(category) => category.recipes.length
					)
				}
			};
		}
	)
	console.log("ALL PROFESSIONS", allProfessionsWithMappedRecipes);
	return  await Promise.all(
		allProfessionsWithMappedRecipes.map((professionSkillTree) => prisma.professionSkillTree.create({data: professionSkillTree, include: {
			categories: true
			}}))
	)

}

export const getAllProfessionSkillTrees = async () =>
	prisma.professionSkillTree.findMany() as PrismaPromise<
		Array<ProfessionSkillTree>
	>

export const saveAllProfessionsIfNotExist = async () => {
	const professions = await getAllProfessionSkillTrees()
	console.log("PROFESSIONS", professions)
	if (!professions.length) {
		return saveAllProfessions()
	}
}
