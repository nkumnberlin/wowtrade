import cookieSignature from "cookie-signature"
const env = import.meta.env

function resolveCookie(cookie: string) {
	return cookieSignature.unsign(cookie, env.SECRET)
}

export default resolveCookie
