import { FastifyPluginCallback, FastifyRequest } from "fastify"
import { getAllProfessionSkillTrees } from "../ProfessionService"

export const professionController: FastifyPluginCallback = (
	app,
	opts,
	done
) => {
	app.get("/professions", async (req: FastifyRequest, res) => {
		try {
			const allProfessions = await getAllProfessionSkillTrees()
			return await res.status(200).send({
				status: 200,
				data: allProfessions
			})
		} catch (e) {
			console.log("error while in professions", e)
			return res.status(500).send({
				status: 500,
				message: "Error while fetching Professions"
			})
		}
	})
	done()
}
