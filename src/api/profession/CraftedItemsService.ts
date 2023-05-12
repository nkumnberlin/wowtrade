import { getCraftedItemsCollection } from '../services/database';
import { ICraftingData, ProfessionSkillTree } from './types';
import { transformRecipeNameLower } from './RecipeService';
import { AnyBulkWriteOperation } from 'mongodb';

export const fetchProfessionsByRecipeNames = async (recipeNames: string[]) => {
  const mongoCollection = getCraftedItemsCollection();
  return await mongoCollection
    .find(
      {
        item_name: {
          $in: recipeNames,
        },
      },
      {
        projection: {
          id: 1,
          id_crafted_item: 1,
          item_name: 1,
        },
      }
    )
    .toArray();
};

export const getAllCraftedItems = () => getCraftedItemsCollection().find().toArray();

export const updateCraftedItemsWithRecipeId = async (
  professionSkillTrees: ProfessionSkillTree[]
) => {
  const craftedItemCollection = await getCraftedItemsCollection();
  const craftedItem = await craftedItemCollection.findOne();
  if (craftedItem?.id_recipe) {
    return;
  }
  const recipesByProfession = professionSkillTrees.map((professionSkillTree) => {
    return professionSkillTree.categories
      .map((category) => {
        return category.recipes.map((recipe) => ({
          ...recipe,
          name: transformRecipeNameLower(recipe),
        }));
      })
      .reduce((acc, current) => [...acc, ...current], []);
  });
  const writeOperationsByProfession = recipesByProfession.map((professionRecipes) =>
    professionRecipes.map<AnyBulkWriteOperation<ICraftingData>>((recipe) => ({
      updateOne: {
        filter: {
          item_name: recipe.name,
        },
        update: {
          $set: {
            id_recipe: recipe.id,
          },
        },
        upsert: true,
      },
    }))
  );
  return Promise.all(
    writeOperationsByProfession.map((writeOperations) =>
      craftedItemCollection.bulkWrite(writeOperations)
    )
  );
};

export const removeAllCraftedItemsWithEmptyId = async () => {
  const craftedItemsCollection = await getCraftedItemsCollection();
  return craftedItemsCollection.deleteMany({
    id_crafted_item: undefined,
  });
};
