import { passport as BNetPassport } from "../api/oauth/bnetPassport"
import { logIn } from "./astroPassport/authentication/logIn"
import { logOut } from "./astroPassport/authentication/logOut"
import { isAuthenticated } from "./astroPassport/authentication/isAuthenticated"
import { isUnauthenticated } from "./astroPassport/authentication/isUnAuthenticated"
import { AstroGlobal, MiddlewareNext } from "astro"
import passport from "passport"
import {log} from "astro/dist/core/logger/core";

interface PassportResponse extends Response {
	redirect?: (val: any) => void
	setHeader?: (val: string, val2: string) => void
	end?: (val: any) => void
}

interface PassportUser {}
export interface PassportRequest extends Request {
	login: typeof logIn
	logIn: typeof logIn
	logout: typeof logOut
	logOut: typeof logOut
	isAuthenticated: typeof isAuthenticated
	isUnauthenticated: typeof isUnauthenticated
	passport: typeof BNetPassport
	user?: PassportUser
	authInfo?: Record<string, any>
	account?: PassportUser
}
interface ExtendContext extends AstroGlobal {
	request: PassportRequest
	response: PassportResponse
}

type MiddlewareRequestHandler<r> = (
	context: ExtendContext,
	next: MiddlewareNext<r>
) => Promise<r> | Promise<void> | void

export interface BnetUser {
	sub: string
	id: number
	battletag: string
	provider: string
	token: string
}
// interface adden
// login / logout / authenticate
// setten
// implementierung anpassen
// fastify passport
// tmp stuff in dings speichern
//
export const onRequest: MiddlewareRequestHandler<Response> = async (
	context,
	next
) => {
	const { url, request,  } = context

	if (url.pathname === "/authenticate/login") {
		console.log("passport... take it away")
		if (!context.response) {
			context.response = await next()
			context.response.redirect = context.redirect
		}
		context.response.setHeader = (key, val) =>
			context.response.headers.set(key, val)
		context.response.headers.set("pee", "poo")
		console.log("peepo", context.response.headers.set)
		console.log("peep22o", context.response.headers)
		request.passport = BNetPassport
		request.logIn = logIn
		request.login = logIn
		request.logout = logOut
		request.logOut = logOut
		request.isAuthenticated = isAuthenticated
		request.isUnauthenticated = isUnauthenticated
		context.response.end = () =>
			console.log("fff");
		await BNetPassport.authenticate("bnet", { failureRedirect: "/" })(
			request,
			context.response,
			next
		)
		console.log("RESP", context.response)
		if(!context.response.headers.get("location")){
			return new Response(JSON.stringify({error: "Redirect Location not set!.",}), {
				status: 400,
			})
		}
		return context.redirect(context.response.headers.get("location"), 302);
		// console.log(context.response.headers)
	}
	return await next()
}
