// // bsp astro
// export async function get({ params }) {
// 	const id = params.id
// 	const product = await getProduct(id)
//
// 	if (!product) {
// 		return new Response(null, {
// 			status: 404,
// 			statusText: "Not found"
// 		})
// 	}
//
// 	return new Response(JSON.stringify(product), {
// 		status: 200,
// 		headers: {
// 			"Content-Type": "application/json"
// 		}
// 	})
// }
// bsp astro
import { getAllProfessionSkillTrees } from "../../../api/profession/ProfessionService"

export async function getProfessionSkillTrees() {
	const allProfessions = await getAllProfessionSkillTrees()
	console.log("ppp")
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
	})
}
