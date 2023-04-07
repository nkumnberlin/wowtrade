import { IDragonFlightProfessions } from "../../../../interfaces/IProfessions"
import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import Modal from "@component/react/components/modal"
import { Modal as FlowModal } from "flowbite"
import { IItem } from "../../../../interfaces/IItem"
import ExpectedItemQuality from "@component/react/feature/professions/createListing/expectedItemQuality"
import ListProfessions from "@component/react/feature/professions/listProfessions"
import ListProfessionCrafts from "@component/react/feature/professions/listProfessionCrafts"
import ItemDifficulty from "@component/react/feature/professions/createListing/itemDifficulty"
interface IProfessions {
	professionToCharacter: IDragonFlightProfessions[]
}
enum SupportedViews {
	quality = "quality",
	difficulty = "difficulty"
}

const ModalViews = new Map<SupportedViews, FunctionComponent>([
	[SupportedViews.quality, ExpectedItemQuality],
	[SupportedViews.difficulty, ItemDifficulty]
])

const Professions = ({ professionToCharacter }: IProfessions) => {
	const modalRef = useRef<HTMLElement | null>(null)
	const modal = new FlowModal(modalRef.current)

	const [selectedProfession, setProfession] = useState<string | null>(null)
	const [selectedItem, setSelectedItem] = useState<IItem | null>(null)
	const [currentModalView, setCurrentModalView] = useState<SupportedViews>(
		SupportedViews.quality
	)
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

	useEffect(() => {
		const url = new URL(window.location.href)
		if (url.searchParams.get("difficulty")) {
			console.log("diffi")
			return setCurrentModalView(SupportedViews.quality)
		}
		return setCurrentModalView(SupportedViews.difficulty)
	}, [window?.location?.href])

	useEffect(() => {
		console.log("123", window.location.href)
	}, [window.location.href])

	const ModalView = ModalViews.get(currentModalView) ?? null
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
					<ModalView />
				</Modal>
			</>
		</>
	)
}

export default Professions
