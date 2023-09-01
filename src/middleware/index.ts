import { passport } from "../api/oauth/bnetPassport"
import { logIn } from "./astroPassport/authentication/logIn"
import { logOut } from "./astroPassport/authentication/logOut"
import { isAuthenticated } from "./astroPassport/authentication/isAuthenticated"
import { isUnauthenticated } from "./astroPassport/authentication/isUnAuthenticated"
import cookie from "cookie-signature"
import { MiddlewareRequestHandler } from "./interfaces"

const env = import.meta.env

export const onRequest: MiddlewareRequestHandler<Response> = async (
	context,
	next
) => {
	const { url, request } = context
	if (!context.response) {
		context.response = await next()
		context.response.redirect = context.redirect
		context.response.setHeader = (key, val) =>
			context.response.headers.set(key, val)
		context.response.end = () => {}
	}

	request.passport = passport
	request.logIn = logIn
	request.login = logIn
	request.logout = logOut
	request.logOut = logOut
	request.isAuthenticated = isAuthenticated
	request.isUnauthenticated = isUnauthenticated

	if (url.pathname === env.LOGIN) {
		await passport.authenticate("bnet", { failureRedirect: "/" })(
			request,
			context.response,
			next
		)
		if (!context.response.headers.get("location")) {
			return new Response(
				JSON.stringify({ error: "Redirect Location not set!" }),
				{
					status: 400
				}
			)
		}
		return context.redirect(context.response.headers.get("location"), 302)
	}

	if (url.pathname.includes(env.CALLBACK)) {
		const urlSearchParams = new URLSearchParams(request.url.split("?")[1])
		request.query = Object.fromEntries(urlSearchParams.entries())
		const token = await new Promise<string>((resolve, reject) =>
			passport.authorize("bnet", (user) => {
				resolve(user.token)
			})(request, context.response, next)
		)
		if (!token) {
			return context.response
		}
		const cookieToken = cookie.sign(token, env.SECRET)
		context.cookies.set(env.TOKEN_NAME, cookieToken)
		return context.response
	}
	return await next()
}

//cookie signieren
// authenticfacgion in middleware to check each call if authentificated
