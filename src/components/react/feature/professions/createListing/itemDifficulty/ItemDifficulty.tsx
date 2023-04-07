import React, { useState } from "react"
import { Dropdown } from "@component/react/components/dropdown"
import style from "./styles.module.css"

type TItemDifficulty = "1" | "2" | "3"

const ItemDifficulty = () => {
	const [toggleDropdown, setToggleDropdown] = useState(false)
	const [selection, setSelection] = useState<TItemDifficulty | null>(null)
	const items: TItemDifficulty[] = ["1", "2", "3"]
	if (selection) {
		const url = new URL(window.location.href)
		url.searchParams.set("difficulty", selection)
		window.history.replaceState(null, "", url)
	}
	const handleSelection = (val) => {
		setSelection(val.target.outerText)
		setToggleDropdown(!toggleDropdown)
	}

	return (
		<>
			<Dropdown
				toggleDropdown={() => setToggleDropdown(!toggleDropdown)}
				hideDropdown={toggleDropdown}
				items={items}
				description={"Select a Difficulty"}
				setSelection={handleSelection}
			/>
			{selection && (
				<p className={style.selectedItem}>Selected Difficulty: {selection}</p>
			)}
		</>
	)
}

export default ItemDifficulty
