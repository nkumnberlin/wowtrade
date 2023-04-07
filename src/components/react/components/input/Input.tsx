import * as React from "react"

type TInputType = "number" | "string"
interface IInput {
	label: string
	value: number | string
	placeholder: string
	inputId: string
	inputType: TInputType
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
	label,
	value,
	placeholder,
	inputId,
	inputType,
	onChange
}: IInput) => {
	return (
		<>
			<label
				htmlFor={inputId}
				className="mb-2  block text-sm font-medium text-gray-900 dark:text-white"
			>
				{label}
			</label>
			<div>
				<input
					style={{ width: "90%" }}
					type={inputType}
					id={inputId}
					className="block rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
			</div>
		</>
	)
}

export default Input
