export interface Key {
	href: string
}
export interface KnownRecipe {
	key: Key
	name: string
	id: number
	id_crafted_item?: number
}
export interface ProfessionSkillTree {
	_links: any
	id: number
	name: string
	minimum_skill_level: number
	maximum_skill_level: number
	categories: Category[]
}

export interface Category {
	name: string
	recipes: KnownRecipe[]
}
