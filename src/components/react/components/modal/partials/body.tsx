import React from "react"

interface IBody {
	children: React.ReactNode
}
const Body = ({ children }: IBody) => {
	return (
		<div className="space-y-6 p-6">
			<div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
				{children}
			</div>
		</div>
	)
}

export default Body
