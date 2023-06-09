import { PassportRequest } from "../../index"

export function isUnauthenticated(request: PassportRequest): boolean {
	return !request.isAuthenticated(request)
}
