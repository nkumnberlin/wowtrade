import { PassportRequest } from "../../index"

export function isAuthenticated(request: PassportRequest): boolean {
	const property = request.passport.userProperty
	return !!request[property]
}
