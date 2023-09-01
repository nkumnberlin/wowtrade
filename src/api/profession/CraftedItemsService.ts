import { ProfessionSkillTree, Iwow_trade_webscraper, PrismaPromise } from "./types"
import { transformRecipeNameLower } from "./RecipeService"
import { prisma } from "../utils/db"

// Prisma.PrismaPromise<Array<CraftingDataGetPayload<T>>>
export const fetchProfessionsByRecipeNames = (recipeNames: string[]) =>
	prisma.wow_trade_webscraper.findMany({
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
	}) as PrismaPromise<Array<Iwow_trade_webscraper>>

export const getAllCraftedItems = () => {
	console.log(prisma);
	return prisma.wow_trade_webscraper.findMany() as PrismaPromise<Array<Iwow_trade_webscraper>>
}

export const updateCraftedItemsWithRecipeId = async (
	professionSkillTrees: ProfessionSkillTree[]
) => {
	const craftedItem = await prisma.wow_trade_webscraper.findFirst()
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

	return recipesByProfession
		.map((professionRecipes) =>
			professionRecipes.map((recipe) =>
				prisma.wow_trade_webscraper.update({
					where: {
						id: recipe.id
					},
					data: {
						id_recipe: recipe.id
					}
				})
			)
		)
		.reduce((acc, current) => [...acc, ...current])
}

export const removeAllCraftedItemsWithEmptyId = () =>
	prisma.wow_trade_webscraper.deleteMany({
		where: {
			id_crafted_item: undefined
		}
	})
