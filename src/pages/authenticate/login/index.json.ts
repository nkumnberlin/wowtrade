//
// export async function getProfessionSkillTrees() {
// 	const allProfessions = await getAllProfessionSkillTrees()
// 	if (!allProfessions) {
// 		return new Response(null, {
// 			status: 404,
// 			statusText: "Not found"
// 		})
// 	}
//
// 	return new Response(JSON.stringify(allProfessions), {
// 		status: 200,
// 		headers: {
// 			"Content-Type": "application/json"
// 		}
// 	}).json()
// }

// app.get("/login/oauth/battlenet", authenticator.authenticate("bnet"))
import { passport } from "../../../api/oauth/bnetPassport"
import { APIRoute } from "astro"
import { req } from "astro/dist/core/messages"

export async function authenticateUser() {
	console.log("dakjybgfjs")
	return passport.authenticate("bnet", (pp) => {
		console.log(pp)
	})

	return new Response(JSON.stringify(""), {
		status: 200,
		headers: {
			"Content-Type": "application/json"
		}
	}).json()
}
