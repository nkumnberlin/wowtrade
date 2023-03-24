import React, { useState } from "react"
import Characters from "@component/react/characters"
import { ICharacter } from "../../../interfaces/ICharacters"
import Professions from "@component/react/professions"
interface ICharacterHandler {
	children: React.ReactNode
	characters: ICharacter[]
	cookie: string
}
function CharacterHandler({ children, characters, cookie }: ICharacterHandler) {
	const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(
		null
	)
	console.log("bingo", selectedCharacter)
	return (
		<>
			<Characters
				characters={characters}
				setSelectedCharacter={setSelectedCharacter}
			/>
			{/*<Professions cookie={cookie} selectedCharacter={selectedCharacter} />*/}
			{children}
		</>
	)
}

export default CharacterHandler
