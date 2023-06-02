const env = import.meta.env
import {
	getAllProfessionSkillTrees
	// saveAllProfessionsIfNotExist
} from "../profession/TmpProfessionService"
import {
	removeAllCraftedItemsWithEmptyId,
	updateCraftedItemsWithRecipeId
} from "../profession/CraftedItemsService"
import { ICraftingData, ProfessionSkillTree } from "../profession/types"

import { Order } from "../order/types"
import { Db, MongoClient } from "mongodb"

console.log("_++++_ env meter", env, process.env.ACC)
export const url = `mongodb+srv://${env.ACC}:${env.PW}@crafteditemsdb.kp6faxe.mongodb.net/craftedItemsDB?retryWrites=true&w=majority`
const craftedItemsCollectionName = "craftedItems"
const listingsCollectionName = "orders"
const listingsProfessionsName = "professions"

let client: MongoClient
let db: Db

export const getCraftedItemsCollection = () =>
	db.collection<ICraftingData>(craftedItemsCollectionName)
export const getListingsCollection = () =>
	db.collection<Order>(listingsCollectionName)
export const getProfessionsCollection = () =>
	db.collection<ProfessionSkillTree>(listingsProfessionsName)
export const killConnection = async () => {
	await client.close()
	console.log("kill db success")
}

export const initializeDatabase = async () => {
	client = await MongoClient.connect(url)
	db = client.db()
	console.log("init DB success")
	// const listingsCollection = getListingsCollection()
	// await listingsCollection.createIndex(
	// 	{ expiredAt: 1 },
	// 	{ expireAfterSeconds: 0 }
	// )
	// await saveAllProfessionsIfNotExist()
	// const allProfessionSkillTrees = await getAllProfessionSkillTrees()
	// await updateCraftedItemsWithRecipeId(allProfessionSkillTrees)
	// await removeAllCraftedItemsWithEmptyId()
}
