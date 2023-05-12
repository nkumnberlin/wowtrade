export interface WowBody {
  Id: number;
  ListOfReagents: null;
  Name: string;
  SkillTierId: number;
  Category: string | null;
  IsCommodity: boolean;
  Reagents: null;
  RecipeId: number;
  CraftedQuantity: number;
  ProfessionId: number;
}

export interface ProfessionlessSkillesRecipes
  extends Omit<WowBody, 'ProfessionId' | 'SkillTierId' | 'RecipeId'> {}

export interface ProfessionalStructure {
  [professionId: number]: {
    [skillTierId: number]: {
      [recipeId: number]: ProfessionlessSkillesRecipes;
    };
  };
}

export interface UserProfessionsBody {
  _links: Links;
  character: Character;
  primaries: Primary[];
}

export interface Links {
  self: Self;
}

export interface Self {
  href: string;
}

export interface Character {
  key: Self;
  name: string;
  id: number;
  realm?: Realm;
}

export interface Profession {
  key: Self;
  name: string;
  id: number;
}

export interface Realm {
  key: Self;
  name: Name;
  id: number;
  slug: string;
}

export interface Name {
  en_US: string;
  es_MX: string;
  pt_BR: string;
  de_DE: string;
  en_GB: string;
  es_ES: string;
  fr_FR: string;
  it_IT: string;
  ru_RU: string;
  ko_KR: string;
  zh_TW: string;
  zh_CN: string;
}

export interface Primary {
  profession: Profession;
  tiers: TierElement[];
}

export interface TierElement {
  skill_points: number;
  max_skill_points: number;
  tier: TierTier;
  known_recipes: Character[];
}

export interface TierTier {
  name: string;
  id: number;
}
