import React from "react"

const Label = ({ children }: { children: React.ReactNode }) => {
	return (
		<label className="mb-2  block text-sm font-medium text-gray-900 dark:text-white">
			{children}
		</label>
	)
}

export default Label
