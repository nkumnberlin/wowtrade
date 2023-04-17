import React, { useState } from "react"
import Input from "@component/react/components/input"
const Commission = () => {
	const [gold, setGold] = useState<number | string>("")
	if (gold) {
		// const url = new URL(window.location.href)
		// url.searchParams.set("gold", String(gold))
		// window.history.replaceState(null, "", url)
	}

	const [silver, setSilver] = useState<number | string>("")
	if (silver) {
		// const url = new URL(window.location.href)
		// url.searchParams.set("silver", String(silver))
		// window.history.replaceState(null, "", url)
	}

	return (
		<div className="flex">
			<div className={"w-64 flex-auto"}>
				<Input
					label={"Gold"}
					inputId={"gold"}
					value={gold}
					inputType={"number"}
					placeholder={"Commission in gold"}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setGold(parseInt(e.target.value, 10))
					}
				/>
			</div>
			<div className={"w-32 flex-auto"}>
				<Input
					label={"Silver"}
					inputId={"silver"}
					value={silver}
					inputType={"number"}
					placeholder={"Commission in silver"}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setSilver(parseInt(e.target.value, 10))
					}
				/>
			</div>
		</div>
	)
}

export default Commission
