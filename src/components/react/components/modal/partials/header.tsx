import React from "react"
import WoWHeadLink from "@component/react/components/wowHeadLink"
import { IItem } from "../../../../../interfaces/IItem"

const Header = (item: IItem) => {
	return (
		<div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
			<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
				Create a Listing for{" "}
				<WoWHeadLink itemId={item?.itemId}>{item?.name}</WoWHeadLink>
			</h3>
			<button
				type="button"
				className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
				data-modal-hide="defaultModal"
			>
				<svg
					aria-hidden="true"
					className="h-5 w-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clipRule="evenodd"
					></path>
				</svg>
				<span className="sr-only">Close Window</span>
			</button>
		</div>
	)
}

export default Header
