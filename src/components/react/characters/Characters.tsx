import React, { Dispatch } from "react"
import { ICharacter } from "../../../interfaces/ICharacters"
import Styles from "./styles.module.css"

interface ICharacters {
	characters: ICharacter[]
	setSelectedCharacter: Dispatch<React.SetStateAction<ICharacter>>
}
const Characters = ({ characters, setSelectedCharacter }: ICharacters) => {
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
								data-characters-button
								className={Styles.selectButton}
								type="button"
								id={character.name}
								onClick={() => setSelectedCharacter(character)}
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
