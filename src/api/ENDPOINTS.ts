const env = import.meta.env
const publicAPIEndpoint = env.PUBLIC_API_ENDPOINT

const ORDERS = {
	viewLast5: "/viewLast5",
	order: "/order",
	viewAuth: "/authenticated/order",
	create: "/authenticated/order",
	delete: "/authenticated/order"
}
const PROFESSIONS = {
	allProfessions: "/professions",
	professionsToCharacter: "/authenticated/character/professions"
}
const ROUTES = {
	base: publicAPIEndpoint,
	characters: "/authenticated/characters",
	...ORDERS,
	...PROFESSIONS
}

export default ROUTES
