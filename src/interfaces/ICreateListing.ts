const DAY_IN_SECONDS = 86_400
export enum ListingDuration {
	SIX_HOURS = DAY_IN_SECONDS / 4,
	TWELVE_HOURS = DAY_IN_SECONDS / 2,
	ONE_DAY = DAY_IN_SECONDS,
	THREE_DAYS = DAY_IN_SECONDS * 3,
	SEVEN_DAYS = DAY_IN_SECONDS * 7
}
export interface ICreateListing {
	difficulty: string
	quality: string
	qualityProcChance: string
	qualifiedCharacterName: string
	creatorAccountId?: string
	profession: string
	commission: {
		silver: string
		gold: string
	}
	listingDuration: string
	expiredAt?: Date
	createdAt?: Date
	item: {
		id_crafted_item: string
		item_name: string
	}
	multicraftPercentage: string
}
