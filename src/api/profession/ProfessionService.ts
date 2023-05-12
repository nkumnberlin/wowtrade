import { getProfessionsCollection } from "../services/database"
import { getAllCraftedItems } from "./CraftedItemsService"
import { transformRecipeNameLower } from "./RecipeService"
import { Category, ICraftingData, ProfessionSkillTree } from "./types"

// const OAuthClient = require("../oauth/client")

// const oauthClient = new OAuthClient()

// const BASE_URL = "https://eu.api.blizzard.com"

const professionMap: {
	professionId: number
	skillTierId: number
}[] = require("../assets/professionCalls.json")

// const PROFESSION_SKILL_TIER_URL = (professionId: number, skillTierId: number) =>
// 	`${BASE_URL}/data/wow/profession/${professionId}/skill-tier/${skillTierId}?namespace=static-eu&locale=en_US&region=eu`

// const getProfessionSkillTree = async (
// 	professionId: number,
// 	skillTierId: number
// ) => {
// 	const authToken = await oauthClient.getToken()

// return (await fetch(PROFESSION_SKILL_TIER_URL(professionId, skillTierId), {
// 	method: "GET",
// 	headers: {
// 		Authorization: `Bearer ${authToken.token.access_token}`
// 	}
// }).then((res) => res.json())) as ProfessionSkillTree
// }

// const saveAllProfessions = async () => {
// 	const allProfessions = await Promise.all(
// 		professionMap.map(({ professionId, skillTierId }) =>
// 			getProfessionSkillTree(professionId, skillTierId)
// 		)
// 	)
// 	const allCraftedItems = await getAllCraftedItems()
// 	const allCraftedItemsMap = allCraftedItems.reduce(
// 		(acc, curr) => ({
// 			...acc,
// 			[curr.item_name]: curr
// 		}),
// 		{} as { [key: string]: ICraftingData }
// 	)
// 	const allProfessionsWithMappedRecipes = allProfessions.map(
// 		(professionSkillTree) => {
// 			const mappedProfessionSkillTreeCategories =
// 				professionSkillTree.categories.map((category) => {
// 					const mappedRecipes = category.recipes
// 						.map((recipe) => ({
// 							...recipe,
// 							id_crafted_item:
// 								allCraftedItemsMap[transformRecipeNameLower(recipe)]
// 									?.id_crafted_item
// 						}))
// 						.filter((recipe) => recipe.id_crafted_item)
// 					return {
// 						...category,
// 						recipes: mappedRecipes
// 					} as Category
// 				})
//
// 			return {
// 				...professionSkillTree,
// 				categories: mappedProfessionSkillTreeCategories.filter(
// 					(category) => category.recipes.length
// 				)
// 			} as ProfessionSkillTree
// 		}
// 	)
// 	const professionCollection = getProfessionsCollection()
// 	return professionCollection.insertMany(allProfessionsWithMappedRecipes)
// }

// export const saveAllProfessionsIfNotExist = async () => {
// 	const professionCollection = getProfessionsCollection()
// 	const professions = await professionCollection.find().toArray()
// 	if (!professions.length) {
// 		return saveAllProfessions()
// 	}
// }

export const getAllProfessionSkillTrees = async () => {
	return getProfessionsCollection().find().toArray()
}
