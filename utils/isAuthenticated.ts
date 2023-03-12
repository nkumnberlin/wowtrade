export default function isAuthenticated(cookie: string) {
	// logik zum pruefen
	return cookie?.includes("wow-trade-session")
}
