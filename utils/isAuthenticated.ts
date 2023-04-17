export default function isAuthenticated(cookie: string) {
	// logik zum pruefen
	console.log("COOKIE", cookie)
	return cookie?.includes(".")
}
