import { PassportRequest } from "../../index"

export async function logOut(request: PassportRequest): Promise<void> {
	const property = request.passport.userProperty
	request[property] = null
	await request.passport.sessionManager.logOut(request)
}
