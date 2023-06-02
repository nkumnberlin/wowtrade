import { ProfessionSkillTree, CraftingData, PrismaPromise } from "./types"
import { transformRecipeNameLower } from "./RecipeService"
import { prisma } from "../utils/db"

// Prisma.PrismaPromise<Array<CraftingDataGetPayload<T>>>
export const fetchProfessionsByRecipeNames = (recipeNames: string[]) =>
	prisma.craftingData.findMany({
		where: {
			item_name: {
				in: recipeNames
			}
		},
		select: {
			id: true,
			id_crafted_item: true,
			item_name: true
		}
	}) as PrismaPromise<Array<CraftingData>>

export const getAllCraftedItems = () =>
	prisma.craftingData.findMany() as PrismaPromise<Array<CraftingData>>

export const updateCraftedItemsWithRecipeId = async (
	professionSkillTrees: ProfessionSkillTree[]
) => {
	const craftedItem = await prisma.craftingData.findFirst()
	if (craftedItem?.id_recipe) {
		return
	}
	const recipesByProfession = professionSkillTrees.map(
		(professionSkillTree) => {
			return professionSkillTree.categories
				.map((category) => {
					return category.recipes.map((recipe) => ({
						...recipe,
						name: transformRecipeNameLower(recipe)
					}))
				})
				.reduce((acc, current) => [...acc, ...current], [])
		}
	)

	const writeOperationsByProfession = recipesByProfession
		.map((professionRecipes) =>
			professionRecipes.map((recipe) =>
				prisma.craftingData.update({
					where: {
						item_name: recipe.name
					},
					data: {
						id_recipe: recipe.id
					}
				})
			)
		)
		.reduce((acc, current) => [...acc, ...current])

	return Promise.all(writeOperationsByProfession)
}

export const removeAllCraftedItemsWithEmptyId = () =>
	prisma.craftingData.deleteMany({
		where: {
			id_crafted_item: undefined
		}
	})
