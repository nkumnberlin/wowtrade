import React, { Dispatch, useEffect, useState } from "react"
import { ICharacter } from "../../interfaces/ICharacters"
import Styles from "./styles.module.css"

interface ICharacters {
	characters: ICharacter[]
	setSelectedCharacter: Dispatch<React.SetStateAction<ICharacter>>
}
const Characters = ({ characters }: ICharacters) => {
	const [selectedCharacter, setSelectedCharacter] = useState<ICharacter | null>(
		null
	)
	useEffect(() => {
		if (selectedCharacter !== null) {
			// window.location.href = `/authenticated/characters/professions/eu/${selectedCharacter.realm.name.en_GB}/${selectedCharacter.name}`
		}
	}, [selectedCharacter])

	return (
		<table>
			<tbody>
				<tr className={Styles.tableHeading}>
					<th>Name:</th>
					<th>Faction:</th>
					<th>Class:</th>
					<th>Race:</th>
					<th>Level:</th>
					<th>Server:</th>
				</tr>
				{characters?.map((character) => (
					<tr key={character.name} style={{ marginBottom: "1rem" }}>
						<td>{character.name}</td>
						<td>{character.faction.name.en_GB}</td>
						<td>{character.playable_class.name.en_GB}</td>
						<td>{character.playable_race.name.en_GB}</td>
						<td>{character.level}</td>
						<td>{character.realm.name.en_GB}</td>
						<td>
							<button
								className={Styles.selectButton}
								type="button"
								data-realm={character.realm.name.en_GB}
								data-name={character.name}
								id={character.name}
							>
								Select
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default Characters
