import { AstroGlobal, MiddlewareNext } from "astro"
import { passport } from "../api/oauth/bnetPassport"
import { logIn } from "./astroPassport/authentication/logIn"
import { logOut } from "./astroPassport/authentication/logOut"
import { isAuthenticated } from "./astroPassport/authentication/isAuthenticated"
import { isUnauthenticated } from "./astroPassport/authentication/isUnAuthenticated"

export interface PassportResponse extends Response {
	redirect?: (val: any) => void
	setHeader?: (val: string, val2: string) => void
	end?: (val: any) => void
}

export interface PassportUser {}
export interface PassportRequest extends Request {
	login: typeof logIn
	logIn: typeof logIn
	logout: typeof logOut
	logOut: typeof logOut
	isAuthenticated: typeof isAuthenticated
	isUnauthenticated: typeof isUnauthenticated
	passport: typeof passport
	user?: PassportUser
	authInfo?: Record<string, any>
	account?: PassportUser
	query: { [key: string]: string }
}
export interface ExtendContext extends AstroGlobal {
	request: PassportRequest
	response: PassportResponse
}

export type MiddlewareRequestHandler<r> = (
	context: ExtendContext,
	next: MiddlewareNext<r>
) => Promise<r> | Promise<void> | void
