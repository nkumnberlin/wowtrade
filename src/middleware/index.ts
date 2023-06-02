import { MiddlewareHandler } from "astro"
import { passport } from "../api/oauth/bnetPassport"

import { defineMiddleware } from "astro/dist/core/middleware"

function initAuth() {}

declare namespace astro {
	export interface Request {
		user: boolean
	}
}
export const onRequest: MiddlewareHandler<Response> = async (context, next) => {
	console.log("____ c", passport)
	const { url } = context
	context.request.user = false
	if (url.pathname === "/authenticate/login") {
		console.log("passport... take it away")
		const x = await passport.authenticate("bnet", (pp) => console.log(pp))
		const popoo = x()
		console.log("x authenticate", x)
	}
	return await next()
}
