const env = import.meta.env
import {
	getAllProfessionSkillTrees
	// saveAllProfessionsIfNotExist
} from "../profession/ProfessionService"
import {
	removeAllCraftedItemsWithEmptyId,
	updateCraftedItemsWithRecipeId
} from "../profession/CraftedItemsService"
import { ICraftingData, ProfessionSkillTree } from "../profession/types"

import { ListingData } from "../order/types"
import { Db, MongoClient } from "mongodb"

export const url = `mongodb+srv://${env.ACC}:${env.PW}@crafteditemsdb.kp6faxe.mongodb.net/craftedItemsDB?retryWrites=true&w=majority`
const craftedItemsCollectionName = "craftedItems"
const listingsCollectionName = "orders"
const listingsProfessionsName = "professions"

let client: MongoClient
let db: Db

export const getCraftedItemsCollection = () =>
	db.collection<ICraftingData>(craftedItemsCollectionName)
export const getListingsCollection = () =>
	db.collection<ListingData>(listingsCollectionName)
export const getProfessionsCollection = () =>
	db.collection<ProfessionSkillTree>(listingsProfessionsName)

export const killConnection = async () => client.close()

export const initializeDatabase = async () => {
	client = await MongoClient.connect(url)
	db = client.db()
	const listingsCollection = getListingsCollection()
	await listingsCollection.createIndex(
		{ expiredAt: 1 },
		{ expireAfterSeconds: 0 }
	)
	await saveAllProfessionsIfNotExist()
	const allProfessionSkillTrees = await getAllProfessionSkillTrees()
	await updateCraftedItemsWithRecipeId(allProfessionSkillTrees)
	await removeAllCraftedItemsWithEmptyId()
}
