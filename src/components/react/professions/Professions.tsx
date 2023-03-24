import { ICharacter } from "../../../interfaces/ICharacters"
import GET from "../../../api/GET"
import ENDPOINTS from "../../../api/ENDPOINTS"
import { useEffect, useState } from "react"

interface IProfessions {
	cookie: string
	selectedCharacter: ICharacter
}
function fetchProfessions({ cookie }: IProfessions) {
	return GET({ cookie, url: ENDPOINTS.professions })
}

const Professions = ({ cookie, selectedCharacter }: IProfessions) => {
	if (!cookie) return
	const [professions, setProfessions] = useState()
	useEffect(() => {
		fetchProfessions({ cookie, selectedCharacter }).then((res) =>
			setProfessions(res)
		)
	}, [cookie, selectedCharacter])
	console.log("data", professions)

	return <div>hier wird was tolles {JSON.stringify(professions)}</div>
}

export default Professions
