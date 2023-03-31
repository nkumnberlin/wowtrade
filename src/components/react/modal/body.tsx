import React from "react"

const Body = () => {
	return (
		<div className="space-y-6 p-6">
			<div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
				Angaben zu:
				<ul>
					<li>Expected Quality for Client</li>
					<li>Expected Outcome</li>
					<li>Chance for Failure</li>
					<li>prefilled character name</li>
				</ul>
			</div>
			<div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
				Detailangaben
				<ul>
					<li>Fee</li>
					<li>type: crafting hours(vormittag, mittag, abends)</li>
					<li>time of listing</li>
				</ul>
			</div>
		</div>
	)
}

export default Body
