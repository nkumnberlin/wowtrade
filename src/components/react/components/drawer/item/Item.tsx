import React, { useState } from "react"
import { IItem } from "@component/react/components/drawer/interfaces"
import SubItem from "@component/react/components/drawer/subItem"

const Item = ({
	subItems,
	icon,
	description,
	firstLayerHandler,
	secondLayerHandler
}: IItem) => {
	const [showSubItems, setShowSubItems] = useState<boolean>(false)

	return (
		<li>
			<button
				onClick={() => {
					setShowSubItems(!showSubItems)
					firstLayerHandler(description)
				}}
				type="button"
				className={`${
					showSubItems ? "active" : ""
				} group flex w-full items-center rounded-lg p-2 text-base text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
				aria-controls="dropdown-example"
				data-collapse-toggle="dropdown-example"
			>
				{icon}
				<span className="ml-3 flex-1 whitespace-nowrap text-left">
					{description}
				</span>
				<svg
					className={
						showSubItems
							? "h-6 w-6 animate-rotateDown "
							: "h-6 w-6 rotate-180 animate-rotateUp"
					}
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clipRule="evenodd"
					></path>
				</svg>
			</button>
			<ul
				id="dropdown-example"
				className={showSubItems ? "space-y-2 py-2" : " hidden space-y-2 py-2"}
			>
				{subItems.map(({ description }) => (
					<SubItem
						key={description}
						description={description}
						secondLayerHandler={secondLayerHandler}
					/>
				))}
			</ul>
		</li>
	)
}

export default Item
