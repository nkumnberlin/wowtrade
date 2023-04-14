import React from "react"
import { ISubItem } from "@component/react/components/sideNavigation/interfaces"

const SubItem = ({ href, description, secondLayerHandler }: ISubItem) => {
	return (
		<li key={description}>
			<a
				onClick={() => secondLayerHandler(description)}
				href={href}
				className="group flex w-full cursor-pointer items-center rounded-lg p-2 pl-11 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
			>
				{description}
			</a>
		</li>
	)
}

export default SubItem
