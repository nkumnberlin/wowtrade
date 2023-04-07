import React, { useState } from "react"
import Input from "@component/react/components/input"
import style from "./styles.module.css"
const Multicraft = () => {
	const [multicraft, setMulticraft] = useState<number>(undefined)
	if (multicraft) {
		const url = new URL(window.location.href)
		url.searchParams.set("multicraft", String(multicraft))
		window.history.replaceState(null, "", url)
	}

	return (
		<div className="flex">
			<div className={"w-64 flex-auto"}>
				<Input
					label={"Type in your Chance to Multicraft in %"}
					inputId={"gold"}
					value={multicraft}
					inputType={"number"}
					placeholder={"QualityProcChance %"}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setMulticraft(parseInt(e.target.value, 10))
					}
				/>
			</div>
		</div>
	)
}

export default Multicraft
