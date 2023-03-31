import {
	IDragonFlightProfessions,
	KnownRecipe
} from "../../../interfaces/IProfessions"
import Styles from "./styles.module.css"
import React, { useState } from "react"
interface IProfessions {
	professionToCharacter: IDragonFlightProfessions[]
}

const Professions = ({ professionToCharacter }: IProfessions) => {
	const [selectedProfession, setProfession] = useState<string | null>(null)
	const [selectedItem, setSelectedItem] = useState<{
		itemId: number
		name: string
	} | null>(null)
	const professionData = professionToCharacter?.find(
		({ profession }) => profession?.name === selectedProfession
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
								<table>
									<tbody>
										<tr className={Styles.tableHeading}>
											<th>Item:</th>
										</tr>

										{professionData.tiers.known_recipes.map(
											({ name, itemId }) => (
												<tr key={itemId} style={{ marginBottom: "1rem" }}>
													<td>
														<a
															href={`https://wowhead.com/item=${itemId}`}
															className={Styles.wowHeadItem}
														>
															<label className={Styles.item}>{name}</label>
														</a>
													</td>
													<td>
														<button
															className={Styles.selectButton}
															type="button"
															id={name}
															onClick={() => setSelectedItem({ itemId, name })}
														>
															Select
														</button>
													</td>
												</tr>
											)
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				)}
				{selectedItem && (
					<div>
						<p>
							{" "}
							cool, you want to craft ${selectedItem.name}, this should be a
							modal? or a new page?
						</p>
					</div>
				)}
			</>
		</>
	)
}

export default Professions
