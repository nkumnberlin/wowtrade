import ROUTES from "./ENDPOINTS"
import GET from "./GET"

export async function getCharacters(cookie: string) {
	const url = new URL(ROUTES.base + ROUTES.characters).href
	return GET({ cookie, url: url })
}
