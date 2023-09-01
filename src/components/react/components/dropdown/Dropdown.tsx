import React from "react"

interface IDropdown {
	toggleDropdown: () => void
	items: string[]
	description: string
	hideDropdown: boolean
	setSelection: (val) => void
}
const Dropdown = ({
	toggleDropdown,
	description,
	items,
	hideDropdown,
	setSelection
}: IDropdown) => {
	return (
		<>
			<div className="dropdown">
				<button
					className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
					onClick={toggleDropdown}
				>
					{description}
					<svg
						className="ml-2 h-4 w-4"
						aria-hidden="true"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</button>

				<div
					id="dropdown"
					className={`z-10 w-44 divide-y divide-gray-100 rounded bg-white shadow ${
						hideDropdown ? "block" : "hidden"
					}`}
				>
					<ul className=" z-10 w-44 divide-y divide-gray-100 rounded bg-white shadow ">
						{items.map((item) => (
							<li
								key={item}
								onClick={setSelection}
								className="block px-4 py-2 hover:bg-gray-100"
							>
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	)
}

export default Dropdown
