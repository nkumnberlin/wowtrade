import GET from "./GET"
import ROUTES from "./ENDPOINTS"
import { ICreateListing } from "../interfaces/ICreateListing"
import POST from "./POST"

export async function getLast5Orders() {
	const url = new URL(ROUTES.base + ROUTES.viewLast5).href
	return GET({ url: url })
}

interface IPostCreateOrder {
	cookie: string
	data: ICreateListing
}
export async function createOrder({ cookie, data }: IPostCreateOrder) {
	const createListing = new URL(ROUTES.base + ROUTES.create)
	return POST({
		cookie,
		data,
		url: createListing.href
	}).then((res) => res.json())
}
