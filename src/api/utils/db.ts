import { PrismaClient } from "@prisma/client"
export const prisma = new PrismaClient()

export function exclude<T, Key extends keyof T>(
	object: T,
	keys: Key[]
): Omit<T, Key> {
	for (let key of keys) {
		delete object[key]
	}
	return object
}
