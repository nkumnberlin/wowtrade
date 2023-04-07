import {
	IDragonFlightProfessions,
	KnownRecipe
} from "../../../../interfaces/IProfessions"
import Styles from "./styles.module.css"
import React, { useEffect, useRef, useState } from "react"
import Modal from "@component/react/components/modal"
import { Modal as FlowModal } from "flowbite"
import { IItem } from "../../../../interfaces/IItem"
import WoWHeadLink from "@component/react/components/wowHeadLink"
import ExpectedItemQuality from "@component/react/feature/professions/createListing/expectedItemQuality"
import ListProfessions from "@component/react/feature/professions/listProfessions"
import ListProfessionCrafts from "@component/react/feature/professions/listProfessionCrafts"
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
			<>
				<ListProfessions
					professionToCharacter={professionToCharacter}
					setProfession={setProfession}
				/>
				{selectedProfession && (
					<ListProfessionCrafts
						professionData={professionData}
						selectedProfession={selectedProfession}
						setSelectedItem={setSelectedItem}
					/>
				)}
				<Modal onClose={onClose} ref={modalRef} item={selectedItem}>
					<ExpectedItemQuality />
				</Modal>
			</>
		</>
	)
}

export default Professions
