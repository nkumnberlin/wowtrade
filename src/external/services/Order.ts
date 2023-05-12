import GET from "../methods/GET"
import ROUTES from "../ENDPOINTS"
import { ICreateListing } from "../../interfaces/ICreateListing"
import POST from "../methods/POST"
import DELETE from "../methods/DELETE"

export async function getLast5Orders() {
	const url = new URL(ROUTES.base + ROUTES.viewLast5).href
	return GET({ url: url })
}

export async function ordersToItem(itemId: string) {
	const url = new URL(ROUTES.base + ROUTES.order)
	url.searchParams.set("id_crafted_item", itemId)
	return GET({ url: url.href })
}

interface ICreateOrder {
	cookie: string
	data: ICreateListing
}

export async function getOrdersToUser({ cookie }: { cookie: string }) {
	const url = new URL(ROUTES.base + ROUTES.viewAuth).href
	return GET({ url, cookie })
}
export async function createOrder({ cookie, data }: ICreateOrder) {
	const createListing = new URL(ROUTES.base + ROUTES.create)
	return POST({
		cookie,
		data,
		url: createListing.href
	}).then((res) => res.json())
}

interface IDeleteOrder {
	cookie: string
	id_crafted_item: number
}
export async function deleteOrder({ cookie, id_crafted_item }: IDeleteOrder) {
	const deleteOrderURL = new URL(ROUTES.base + ROUTES.delete)
	deleteOrderURL.searchParams.set("id_crafted_item", String(id_crafted_item))
	return DELETE({ cookie, url: deleteOrderURL.href })
}
