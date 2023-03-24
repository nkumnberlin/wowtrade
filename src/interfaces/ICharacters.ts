export interface ICharacter {
	character: Character
	protected_character: ProtectedCharacter
	name: string
	id: number
	realm: Realm
	playable_class: PlayableClass
	playable_race: PlayableRace
	gender: Gender
	faction: Faction
	level: number
	account_id: number
	armoryUrl: string
}

export interface Character {
	href: string
}

export interface ProtectedCharacter {
	href: string
}

export interface Realm {
	key: Key
	name: Name
	id: number
	slug: string
}

export interface Key {
	href: string
}

export interface Name {
	en_US: string
	es_MX: string
	pt_BR: string
	de_DE: string
	en_GB: string
	es_ES: string
	fr_FR: string
	it_IT: string
	ru_RU: string
	ko_KR: string
	zh_TW: string
	zh_CN: string
}

export interface PlayableClass {
	key: Key
	name: Name
	id: number
}

export interface PlayableRace {
	key: Key
	name: Name
	id: number
}

export interface Gender {
	type: string
	name: Name
}

export interface Faction {
	type: string
	name: Name
}
