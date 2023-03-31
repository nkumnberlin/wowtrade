import {
	IDragonFlightProfessions,
	KnownRecipe
} from "../../../interfaces/IProfessions"
import professions from "@component/react/professions/index"
import Styles from "./styles.module.css"
import { useState } from "react"
interface IProfessions {
	professionToCharacter: IDragonFlightProfessions[]
}

const Professions = ({ professionToCharacter }: IProfessions) => {
	const [selectedProfession, setProfession] = useState<string | null>(null)

	const professionData = professionToCharacter?.find(
		({ profession }) => profession?.name === selectedProfession
	)
	console.log(
		"professiondata",
		professionData,
		"selectedprof",
		selectedProfession,
		"professiondata",
		professionData?.tiers?.skill_points,
		professionData?.tiers?.max_skill_points,
		professionData?.tiers?.tier.name,
		professionData?.tiers?.known_recipes.length
	)
	return (
		<>
			Choose a profession:
			{professionToCharacter.map(({ profession }) => (
				<button
					className={Styles.selectButton}
					type={"button"}
					onClick={() => setProfession(profession.name)}
				>
					{profession.name}
				</button>
			))}
			<>
				{selectedProfession && (
					<div>
						Selected Profession:
						{selectedProfession}
						<div>
							<p>Current SkillPoints = {professionData.tiers.skill_points}</p>
							<p>
								Max SkillPoints SkillPoints = $
								{professionData.tiers.max_skill_points}
							</p>
							<>Current Tier = {professionData.tiers.tier.name}</>
							<p>Known Recipes = {professionData.tiers.known_recipes.length}</p>
							<div className={Styles.itemContainer}>
								{professionData.tiers.known_recipes.map(({ name, itemId }) => (
									<a
										href={`https://wowhead.com/item=${itemId}`}
										className={`q=epic`}
									>
										<label className={Styles.item}>{name}</label>
									</a>
								))}
							</div>
						</div>
					</div>
				)}
			</>
			{/*<div>hier wird was tolles {JSON?.stringify(professionToCharacter)}</div>*/}
		</>
	)
}

export default Professions
