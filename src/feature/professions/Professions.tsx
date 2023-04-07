import { IDragonFlightProfessions } from "../../interfaces/IProfessions"
import React, { FunctionComponent, useEffect, useRef, useState } from "react"
import Modal from "@component/react/components/modal"
import { Modal as FlowModal } from "flowbite"
import { IItem } from "../../interfaces/IItem"
import style from "./styles.module.css"
import ExpectedItemQuality from "./createListing/quality"
import ListProfessions from "./listProfessions"
import ListProfessionCrafts from "./listProfessionCrafts"
import ItemDifficulty from "./createListing/difficulty"
import QualityProcChance from "./createListing/qualityProcChance"
import ListingDuration from "./createListing/listingDuration"
import Commission from "./createListing/commission"
import Multicraft from "./createListing/multicraft"
interface IProfessions {
	professionToCharacter: IDragonFlightProfessions[]
	qualifiedCharacterName: string
}
enum SupportedViews {
	quality = "quality",
	difficulty = "difficulty"
}

// todo > wizard
const ModalViews = new Map<SupportedViews, FunctionComponent>([
	[SupportedViews.quality, ExpectedItemQuality],
	[SupportedViews.difficulty, ItemDifficulty]
])

const Professions = ({
	professionToCharacter,
	qualifiedCharacterName
}: IProfessions) => {
	const modalRef = useRef<HTMLDivElement | null>(null)
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
		// http://localhost:3005/authenticated/characters/professions/eu/Thrall/Reco%C3%ADl?quality=d&difficulty=3&gold=234&silver=33&qualityProcChance=34&duration=12
		modal.toggle()
		const url = new URL(window.location.href)
		console.log(url.searchParams.keys())
	}
	const createListing = () => {
		const url = new URL(window.location.href)
		url.searchParams.set("qualifiedCharacterName", qualifiedCharacterName)
		url.searchParams.set("id_crafted_item", String(selectedItem.itemId))
		url.searchParams.set("profession", selectedProfession)
		url.searchParams.set("item_name", selectedItem.name)
		window.location.href = `/authenticated/orders/create${url.search}`
	}

	return (
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
			<Modal
				onClose={onClose}
				onAccept={createListing}
				ref={modalRef}
				item={selectedItem}
			>
				<div className={style.modalContainer}>
					<div className={style.modalItem}>
						<ExpectedItemQuality />
					</div>
					<div className={style.modalItem}>
						<ItemDifficulty />
					</div>
					<div className={style.modalItem}>
						<Commission />
					</div>
					<div className={style.modalItem}>
						<QualityProcChance />
					</div>
				</div>
				<div className={style.modalItem}>
					<Multicraft />
				</div>
				<div className={style.modalItem}>
					<ListingDuration />
				</div>
			</Modal>
		</>
	)
}

export default Professions
