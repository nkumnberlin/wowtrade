import { useEffect, useState } from "react"

interface IProfessions {
	professionToCharacter: any
}

const Professions = ({ professionToCharacter }: IProfessions) => {
	const [selectedProfession, setSelectedProfession] = useState()

	console.log("data", professionToCharacter)

	return (
		<div>hier wird was tolles {JSON?.stringify(professionToCharacter)}</div>
	)
}

export default Professions
