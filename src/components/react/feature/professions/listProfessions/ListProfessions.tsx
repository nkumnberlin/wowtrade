import * as React from "react"
import Styles from "@component/react/feature/professions/styles.module.css"
import { IDragonFlightProfessions } from "../../../../../interfaces/IProfessions"

interface IListProfessions {
	professionToCharacter: IDragonFlightProfessions[]
	setProfession: React.Dispatch<React.SetStateAction<string>>
}
const ListProfessions = ({
	professionToCharacter,
	setProfession
}: IListProfessions) => {
	return (
		<>
			Choose a profession:
			{professionToCharacter.map(({ profession }) => (
				<button
					key={profession.name}
					className={Styles.selectButton}
					type={"button"}
					onClick={() => setProfession(profession.name)}
				>
					{profession.name}
				</button>
			))}
		</>
	)
}

export default ListProfessions
