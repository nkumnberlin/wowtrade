import { PassportRequest } from "../../index"

export async function logIn<T = unknown>(
	request: PassportRequest,
	user: T,
	options: { session?: boolean } = {}
) {
	if (!request.passport) {
		throw new Error("passport.initialize() plugin not in use")
	}

	const session = options.session === undefined ? true : options.session
	console.log("session ", session, user)
	if (session) {
		try {
			// @ts-ignore
			await request.passport._sm._serializeUser(user);
		} catch (e) {
			request.user = null
			throw e
		}
	}
}
