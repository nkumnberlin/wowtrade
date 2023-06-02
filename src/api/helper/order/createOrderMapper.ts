import { ExpectingListingData, OrderDuration } from "../../order/types"

function listingDuration(duration: string) {
	if (duration === "6") return OrderDuration.SIX_HOURS
	if (duration === "12") return OrderDuration.TWELVE_HOURS
	if (duration === "24") return OrderDuration.ONE_DAY
	return OrderDuration.ONE_DAY
}
export function createOrderMapper(data: ExpectingListingData) {
	return {
		difficulty: parseInt(data.difficulty, 10),
		quality: data.quality,
		qualifiedCharacterName: data.qualifiedCharacterName,
		creatorAccountId: data.creatorAccountId,
		profession: data.profession,
		currentSkill: parseInt(data.currentSkill, 10),
		commission: {
			silver: parseInt(data.commission.silver, 10),
			gold: parseInt(data.commission.gold, 10)
		},
		listingDuration: listingDuration(data.listingDuration),
		item: {
			id_crafted_item: parseInt(data.item.id_crafted_item, 10),
			item_name: data.item.item_name
		},
		qualityProcChance: parseInt(data.qualityProcChance, 10),
		multicraftPercentage: parseInt(data.multicraftPercentage, 10)
	}
}
