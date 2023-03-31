export interface IDragonFlightProfessions {
	profession: Profession
	tiers: Tiers
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
	known_recipes: KnownRecipe[]
}

export interface Tier {
	name: string
	id: number
}

export interface KnownRecipe {
	name: string
	recipeId: number
	itemId: number
}
