import ROUTES from "./ENDPOINTS"
import GET from "./GET"

export async function professionsToCharacter(
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
