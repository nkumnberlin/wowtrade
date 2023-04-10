import React, { useState } from "react"
import { Dropdown } from "@component/react/components/dropdown"
import style from "./styles.module.css"
import Label from "@component/react/components/label"

type TItemDifficulty = "1" | "2" | "3"

const Difficulty = () => {
	const [toggleDropdown, setToggleDropdown] = useState(false)
	const [selection, setSelection] = useState<TItemDifficulty | null>(null)
	const items = ["1", "2", "3"]
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
			<Label>Select a Difficulty</Label>
			<Dropdown
				toggleDropdown={() => setToggleDropdown(!toggleDropdown)}
				hideDropdown={toggleDropdown}
				items={items}
				description={"Difficulty"}
				setSelection={handleSelection}
			/>
			{selection && (
				<p className={style.selectedItem}>Selected Difficulty: {selection}</p>
			)}
		</>
	)
}

export default Difficulty
