export interface Listing {
	_id?: string
	difficulty: number
	quality: string
	qualifiedCharacterName: string
	creatorAccountId?: number
	profession: string
	currentSkill: number
	commission: {
		silver: number
		gold: number
	}
	listingDuration: string
	expiredAt?: Date
	createdAt?: Date
	item: { id_crafted_item: number; item_name: string }
	qualityProcChance: number
	multicraftPercentage: number
}
