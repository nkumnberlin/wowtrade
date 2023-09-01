import { PassportRequest } from "../../interfaces"

export function isUnauthenticated(request: PassportRequest): boolean {
	return !request.isAuthenticated(request)
}
