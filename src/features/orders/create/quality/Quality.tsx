import React, { useState } from "react"
import { Dropdown } from "@component/react/components/dropdown"
import style from "./styles.module.css"
import Label from "@component/react/components/label"

type TExpectedItemQuality = "a" | "b" | "c" | "d" | "e"

const Quality = () => {
	const [toggleDropdown, setToggleDropdown] = useState(false)
	const [selection, setSelection] = useState<TExpectedItemQuality | null>(null)
	const items: TExpectedItemQuality[] = ["a", "b", "c", "d", "e"]
	if (selection) {
		// const url = new URL(window.location.href)
		// url.searchParams.set("quality", selection)
		// window.history.replaceState(null, "", url)
	}
	const handleSelection = (val) => {
		setSelection(val.target.outerText)
		setToggleDropdown(!toggleDropdown)
	}

	return (
		<>
			<Label>Select a Quality</Label>
			<Dropdown
				toggleDropdown={() => setToggleDropdown(!toggleDropdown)}
				hideDropdown={toggleDropdown}
				items={items}
				description={"Quality"}
				setSelection={handleSelection}
			/>
			{selection && (
				<p className={style.selectedItem}>Selected Quality: {selection}</p>
			)}
		</>
	)
}

export default Quality
