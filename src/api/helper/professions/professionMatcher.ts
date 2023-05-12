import {
  ProfessionalStructure,
  ProfessionlessSkillesRecipes,
  WowBody,
  UserProfessionsBody,
} from './types';
import { resources } from './source';

const transformResources = (resources: WowBody[]) =>
  resources.reduce((a, b) => {
    const recipe = {
      [b.RecipeId]: {
        ...(b as ProfessionlessSkillesRecipes),
      },
    };

    return {
      ...a,
      [b.ProfessionId]: {
        ...a[b.ProfessionId],
        [b.SkillTierId]: {
          ...((a[b.ProfessionId] && a[b.ProfessionId][b.SkillTierId]) || {}),
          ...recipe,
        },
      },
    };
  }, {} as ProfessionalStructure);

const transformedResources = transformResources(resources);
export const matchUserToProfessions = (userProfessionsBody: UserProfessionsBody) =>
  userProfessionsBody.primaries.reduce((a, b) => {
    const dragonIsleTier = b.tiers.find((tier) => tier.tier.name.includes('Dragon Isles'));
    const keyedRecipes = dragonIsleTier?.known_recipes.reduce((acc, recipe) => {
      return {
        ...acc,
        [recipe.id]: transformedResources[b.profession.id][dragonIsleTier.tier.id][recipe.id],
      };
    }, {});
    return {
      ...a,
      [b.profession.id]: {
        ...a[b.profession.id],
        [dragonIsleTier?.tier?.id || '']: keyedRecipes,
      },
    };
  }, {} as ProfessionalStructure);
