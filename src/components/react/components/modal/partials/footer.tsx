import React from "react"

interface IFooter {
	onClose: () => void
	onAccept: () => void
}
const Footer = ({ onClose, onAccept }: IFooter) => {
	return (
		<div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
			<button
				type="button"
				className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				onClick={onAccept}
			>
				Create Listing
			</button>
			<button
				type="button"
				onClick={onClose}
				className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
			>
				Abort
			</button>
		</div>
	)
}

export default Footer
