export default function isAuthenticated(cookie: string) {
	console.log("GOOKIE", cookie)
	// logik zum pruefen
	return cookie?.includes("wow-trade-session")
}
