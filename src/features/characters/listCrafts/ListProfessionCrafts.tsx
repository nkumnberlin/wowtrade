import React from "react"
import Styles from "../../professions/styles.module.css"
import WoWHeadLink from "@component/react/components/wowHeadLink"
import { IDragonFlightProfessions } from "../../../interfaces/IProfessions"
import { IItem } from "../../../interfaces/IItem"

interface IListProfessionCrafts {
	selectedProfession: string
	professionData: IDragonFlightProfessions
	setSelectedItem: React.Dispatch<React.SetStateAction<IItem>>
}
const ListProfessionCrafts = ({
	selectedProfession,
	professionData,
	setSelectedItem
}: IListProfessionCrafts) => {
	return (
		<div>
			Selected Profession:
			{selectedProfession}
			<div>
				<p>Current SkillPoints = {professionData.tiers.skill_points}</p>
				<p>
					Max SkillPoints SkillPoints = ${professionData.tiers.max_skill_points}
				</p>
				<>Current Tier = {professionData.tiers.tier.name}</>
				<p>Known Recipes = {professionData.tiers.known_recipes.length}</p>
				<div className={Styles.itemContainer}>
					<table>
						<tbody>
							<tr className={Styles.tableHeading}>
								<th>Item:</th>
							</tr>

							{professionData.tiers.known_recipes.map(({ name, itemId }) => (
								<tr key={itemId} style={{ marginBottom: "1rem" }}>
									<td>
										<WoWHeadLink itemId={itemId}>
											<label className={Styles.item}>{name}</label>
										</WoWHeadLink>
									</td>
									<td>
										<button
											className="ml-2 block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
											type="button"
											id={name}
											onClick={() => setSelectedItem({ itemId: itemId, name })}
										>
											Select
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default ListProfessionCrafts
