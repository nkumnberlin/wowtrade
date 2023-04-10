const ORDERS = {
	viewLast5: "/order",
	viewAuth: "/authenticated/order",
	create: "/authenticated/order",
	delete: "/authenticated/order"
}
const ROUTES = {
	base: "http://localhost:3000",
	characters: "/authenticated/characters",
	professions: "/authenticated/character/professions",
	...ORDERS
}

export default ROUTES
