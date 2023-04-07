import GET from "./GET"
import ROUTES from "./ENDPOINTS"
import { ICreateListing } from "../interfaces/ICreateListing"
import POST from "./POST"

export async function getCharacters(cookie: string) {
	const url = new URL(ROUTES.base + ROUTES.characters).href
	return GET({ cookie, url: url })
}

export async function getProfessionsToCharacter(
	cookie: string,
	name: string,
	server: string,
	region: string
) {
	const professionURL = new URL(ROUTES.base + ROUTES.professions)
	console.log("profession call", professionURL.href)
	if (name === undefined || server === undefined) return
	professionURL.searchParams.append("name", name.toLowerCase())
	professionURL.searchParams.append("slug", server.toLowerCase())
	professionURL.searchParams.append("region", region.toLowerCase())
	console.log("___", professionURL)
	return GET({ cookie, url: professionURL.href })
}

interface IPostCreateListing {
	cookie: string
	data: ICreateListing
}
export async function postCreateListing({ cookie, data }: IPostCreateListing) {
	console.log("xx", data, cookie)
	const createListing = new URL(ROUTES.base + ROUTES.createOrder)
	return POST({
		cookie,
		data,
		url: createListing.href
	})
}
