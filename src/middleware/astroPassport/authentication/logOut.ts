import { PassportRequest } from "../../interfaces"

export async function logOut(request: PassportRequest): Promise<void> {
	// @ts-ignore
	const property = request.passport.userProperty
	request[property] = null
	// @ts-ignore
	await request.passport._sm.logOut(request)
}
