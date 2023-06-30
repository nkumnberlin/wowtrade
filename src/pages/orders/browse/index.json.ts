import { getAllProfessionSkillTrees } from "@/profession"

export async function getProfessionSkillTrees() {
	const allProfessions = await getAllProfessionSkillTrees()
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
