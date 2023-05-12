import { ObjectId } from "mongodb"

const DAY_IN_SECONDS = 86_400

export enum ListingDuration {
	SIX_HOURS = DAY_IN_SECONDS / 4,
	TWELVE_HOURS = DAY_IN_SECONDS / 2,
	ONE_DAY = DAY_IN_SECONDS,
	THREE_DAYS = DAY_IN_SECONDS * 3,
	SEVEN_DAYS = DAY_IN_SECONDS * 7
}

export interface ListingData {
	_id?: ObjectId
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
	listingDuration: ListingDuration
	expiredAt?: Date
	createdAt?: Date
	item: { id_crafted_item: number; item_name: string }
	qualityProcChance: number
	multicraftPercentage: number
}

export interface ExpectingListingData {
	difficulty: string
	quality: string
	creatorAccountId?: number
	qualifiedCharacterName: string
	profession: string
	currentSkill: string
	commission: {
		silver: string
		gold: string
	}
	listingDuration: string
	item: { id_crafted_item: string; item_name: string }
	qualityProcChance: string
	multicraftPercentage: string
}

export interface FrontendListingData
	extends Omit<ListingData, "creatorAccountId"> {}

export type OrderFetchRequest = {
	Querystring: {
		itemName?: string
		id_crafted_item?: string
		accountId?: string
	}
}
