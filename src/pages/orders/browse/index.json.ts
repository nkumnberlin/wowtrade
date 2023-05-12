import { getAllProfessionSkillTrees } from "../../../api/profession/TmpProfessionService"
import {
	initializeDatabase,
	killConnection
} from "../../../api/services/database"

export async function getProfessionSkillTrees() {
	await initializeDatabase()
	const allProfessions = await getAllProfessionSkillTrees()
	await killConnection()
	if (!allProfessions) {
		return new Response(null, {
			status: 404,
			statusText: "Not found"
		})
	}

	return new Response(JSON.stringify(allProfessions), {
		status: 200,
		headers: {
			"Content-Type": "application/json"
		}
	}).json()
}
