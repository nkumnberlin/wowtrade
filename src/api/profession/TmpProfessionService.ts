import { getProfessionsCollection } from "../services/database"

export const getAllProfessionSkillTrees = async () => {
	const x = await getProfessionsCollection()

	return x.find().toArray()
}
