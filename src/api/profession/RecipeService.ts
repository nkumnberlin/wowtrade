import { fetchProfessionsByRecipeNames } from './CraftedItemsService';
import { KnownRecipe } from './types';

export const transformRecipeNameLower = (knownRecipe: KnownRecipe) =>
  knownRecipe.name
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll("'", '')
    .replaceAll('"', '')
    .replaceAll(':', '-')
    .replaceAll('.', '-');
export const transformRecipesNameLower = (knownRecipes: KnownRecipe[]) =>
  knownRecipes.map(transformRecipeNameLower);

export const fetchProfessionsForRecipes = async (knownRecipes: KnownRecipe[]) => {
  const recipeNames = transformRecipesNameLower(knownRecipes);
  return await fetchProfessionsByRecipeNames(recipeNames);
};
