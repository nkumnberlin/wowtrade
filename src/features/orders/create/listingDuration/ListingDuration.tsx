import React, { useState } from "react"
import { Dropdown } from "@component/react/components/dropdown"
import style from "./styles.module.css"
import Label from "@component/react/components/label"

type TListingDuration = "6" | "12" | "24"

const ListingDuration = () => {
	const [toggleDropdown, setToggleDropdown] = useState(false)
	const [selection, setSelection] = useState<TListingDuration | null>(null)
	const items = ["6", "12", "24"]
	if (selection) {
		// const url = new URL(window.location.href)
		// url.searchParams.set("duration", selection)
		// window.history.replaceState(null, "", url)
	}
	const handleSelection = (val) => {
		setSelection(val.target.outerText)
		setToggleDropdown(!toggleDropdown)
	}

	return (
		<>
			<Label>Select a Listing Duration of your Order</Label>
			<Dropdown
				toggleDropdown={() => setToggleDropdown(!toggleDropdown)}
				hideDropdown={toggleDropdown}
				items={items}
				description={"Duration"}
				setSelection={handleSelection}
			/>
			{selection && (
				<p className={style.selectedItem}>
					Selected Duration: {selection} hours
				</p>
			)}
		</>
	)
}

export default ListingDuration
