export interface DragonFlightProfessions {
  profession: Profession;
  tiers: Tiers;
}

export interface IProfession {
  profession: Profession;
  tiers: Tiers[];
}

export interface Profession {
  key: Key;
  name: string;
  id: number;
}

export interface Key {
  href: string;
}

export interface Tiers {
  skill_points: number;
  max_skill_points: number;
  tier: Tier;
  known_recipes: KnownRecipe[] | KnownRecipeWithItemId[];
}

export interface Tier {
  name: string;
  id: number;
}

export interface KnownRecipe {
  key: Key;
  name: string;
  id: number;
  id_crafted_item?: number;
}

export interface KnownRecipeWithItemId extends KnownRecipe {
  itemId: number;
}

export interface ProfessionSkillTree {
  _links: Links;
  id: number;
  name: string;
  minimum_skill_level: number;
  maximum_skill_level: number;
  categories: Category[];
}

export interface Links {
  self: Link;
}

export interface Link {
  href: string;
}

export interface Category {
  name: string;
  recipes: KnownRecipe[];
}

export interface ICraftingData {
  id: number;
  id_crafted_item: number;
  item_name: string;
  id_recipe: number;
}
