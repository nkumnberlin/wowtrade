import {
	IDragonFlightProfessions,
	KnownRecipe
} from "../../../interfaces/IProfessions"
import Styles from "./styles.module.css"
import React, { useEffect, useRef, useState } from "react"
import Modal from "@component/react/modal"
import { Modal as FlowModal } from "flowbite"
import { IItem } from "../../../interfaces/IItem"
import WoWHeadLink from "@component/react/wowHeadLink"
interface IProfessions {
	professionToCharacter: IDragonFlightProfessions[]
}

const Professions = ({ professionToCharacter }: IProfessions) => {
	const modalRef = useRef<HTMLElement | null>(null)
	const modal = new FlowModal(modalRef.current)

	const [selectedProfession, setProfession] = useState<string | null>(null)
	const [selectedItem, setSelectedItem] = useState<IItem | null>(null)
	const professionData = professionToCharacter?.find(
		({ profession }) => profession?.name === selectedProfession
	)

	useEffect(() => {
		if (!selectedItem) return
		if (!modalRef.current) return
		modal.toggle()
	}, [selectedItem])
	const onClose = () => {
		setSelectedItem(null)
		modal.toggle()
	}

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
														<WoWHeadLink itemId={itemId}>
															<label className={Styles.item}>{name}</label>
														</WoWHeadLink>
													</td>
													<td>
														<button
															className="ml-2 block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
				<Modal onClose={onClose} ref={modalRef} item={selectedItem} />
			</>
		</>
	)
}

export default Professions
