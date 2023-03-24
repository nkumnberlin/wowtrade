import GET from "./GET"
import ROUTES from "./ENDPOINTS"

export async function getCharacters(cookie: string) {
	return GET({ cookie, url: ROUTES.characters })
}

export async function getProfessionsToCharacter(cookie: string) {
	return GET({ cookie, url: ROUTES.professions })
}
