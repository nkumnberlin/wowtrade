import { PassportRequest } from "../../interfaces"

export function isAuthenticated(request: PassportRequest): boolean {
	// @ts-ignore
	const property = request.passport.userProperty
	return !!request[property]
}
