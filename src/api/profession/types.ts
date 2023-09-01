export type { wow_trade_webscraper, PrismaPromise } from "@prisma/client"
export interface DragonFlightProfessions {
	profession: Profession
	tiers: Tiers
}

export interface IProfession {
	profession: Profession
	tiers: Tiers[]
}

export interface Profession {
	key: Key
	name: string
	id: number
}

export interface Key {
	href: string
}

export interface Tiers {
	skill_points: number
	max_skill_points: number
	tier: Tier
	known_recipes: KnownRecipe[] | KnownRecipeWithItemId[]
}

export interface Tier {
	name: string
	id: number
}

export interface KnownRecipe {
	key: string
	name: string
	id: number
	id_crafted_item: number
}

export interface KnownRecipeWithKey extends Omit<KnownRecipe, 'key'> {
	key: Key
}

export interface KnownRecipeWithItemId extends KnownRecipe {
	itemId: number
}

export interface ProfessionSkillTree {
	links: string
	id: number
	name: string
	minimum_skill_level: number
	maximum_skill_level: number
	categories: Category[]
}

export interface ProfessionalSkillTreeResponse extends Omit<ProfessionSkillTree, 'categories'> {
	categories: CategoryWithKey[];
}

export interface ProfessionSkillTreeResponse {
	_links: Links
	id: number
	name: string
	minimum_skill_level: number
	maximum_skill_level: number
	categories: CategoryWithKey[]
}

export interface Links {
	self: Link
}

export interface Link {
	href: string
}

export interface Category {
	name: string
	recipes: KnownRecipe[]
}

export interface CategoryCreate {
	name: string
	recipes: { create: KnownRecipe[] }
}

export interface CategoryWithKey extends Omit<Category, 'recipes'> {
	recipes: KnownRecipeWithKey[]
}

export interface Iwow_trade_webscraper {
	id: number
	id_crafted_item: number
	item_name: string
	id_recipe: number
}
