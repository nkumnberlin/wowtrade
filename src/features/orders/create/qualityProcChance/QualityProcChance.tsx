import React, { useState } from "react"
import Input from "@component/react/components/input"
const QualityProcChance = () => {
	const [qualityProcChance, setQualityProcChance] = useState<number | string>(
		""
	)
	if (qualityProcChance) {
		// const url = new URL(window.location.href)
		// url.searchParams.set("qualityProcChance", String(qualityProcChance))
		// window.history.replaceState(null, "", url)
	}

	return (
		<div className="flex">
			<div className={"w-32 flex-auto"}>
				<Input
					label={"Type in your Chance to increase the Quality +1 in %"}
					inputId={"gold"}
					value={qualityProcChance}
					inputType={"number"}
					placeholder={"proc chance in %"}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setQualityProcChance(parseInt(e.target.value, 10))
					}
				/>
			</div>
		</div>
	)
}

export default QualityProcChance
