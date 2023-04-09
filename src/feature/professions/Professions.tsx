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
import { postCreateListing } from "../../api"
interface IProfessions {
	professionToCharacter: IDragonFlightProfessions[]
	qualifiedCharacterName: string
}

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

	useEffect(() => {
		const url = new URL(window.location.href)
		const existingProfession = url.searchParams.get("profession")
		if (existingProfession) {
			setProfession(existingProfession)
		}
	}, [])

	const onClose = () => {
		setSelectedItem(null)
		modal.toggle()
		const url = new URL(window.location.href)
		url.searchParams.delete("quality")
		url.searchParams.delete("difficulty")
		url.searchParams.delete("gold")
		url.searchParams.delete("silver")
		url.searchParams.delete("qualityProcChance")
		url.searchParams.delete("multicraftPercentage")
		url.searchParams.delete("duration")
		window.history.replaceState(null, "", url)
	}

	const createListing = async () => {
		const url = new URL(window.location.href)
		url.searchParams.set("qualifiedCharacterName", qualifiedCharacterName)
		url.searchParams.set("id_crafted_item", String(selectedItem.itemId))
		url.searchParams.set("item_name", selectedItem.name)
		url.searchParams.set(
			"currentSkill",
			String(professionData.tiers.skill_points)
		)
		window.location.href = `/authenticated/orders/create${url.search}`
	}

	const selectProfession = (profession: string) => {
		setProfession(profession)
		const url = new URL(window.location.href)
		url.searchParams.set("profession", profession)
		window.history.replaceState(null, "", url)
	}

	return (
		<>
			<ListProfessions
				professionToCharacter={professionToCharacter}
				setProfession={selectProfession}
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
