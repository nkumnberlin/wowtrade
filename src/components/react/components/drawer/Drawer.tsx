import React, { ForwardedRef, forwardRef, useState } from "react"
import Item from "@component/react/components/drawer/item"
import { IDrawer } from "@component/react/components/drawer/interfaces"

const Drawer = forwardRef(
	(
		{
			items,
			toggleDrawer,
			buttonLabel,
			secondRowData,
			secondLayerHandler,
			firstLayerHandler,
			secondRowHandler
		}: IDrawer,
		drawerRef: ForwardedRef<HTMLDivElement>
	) => {
		const label = "Select a Profession"
		const close = "Close"

		const DrawerButton = () => (
			<div className="text-center">
				<button
					className="mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					type="button"
					data-drawer-target="drawer-disabled-backdrop"
					data-drawer-show="drawer-disabled-backdrop"
					data-drawer-backdrop="false"
					aria-controls="drawer-disabled-backdrop"
					onClick={toggleDrawer}
				>
					{buttonLabel}
				</button>
			</div>
		)

		const standardItem = "overflow-y-auto py-4"

		return (
			<>
				{DrawerButton()}
				<div
					ref={drawerRef}
					id="drawer-navigation"
					data-drawer-backdrop="false"
					className={`fixed top-0 left-0 z-40 h-screen dark:bg-gray-800 w-${200} -translate-x-full overflow-y-auto bg-white p-4 transition-transform`}
					tabIndex={-1}
					aria-labelledby="drawer-navigation-label"
				>
					<h5
						id="drawer-navigation-label"
						className="text-base font-semibold uppercase text-gray-500 dark:text-gray-400"
					>
						{label}
					</h5>
					<button
						type="button"
						data-drawer-hide="drawer-navigation"
						aria-controls="drawer-navigation"
						className="absolute top-2.5 right-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
					>
						<svg
							aria-hidden="false"
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
						<span className="sr-only">{close}</span>
					</button>
					<div className={"flex flex-row"}>
						<div className={"overflow-y-auto py-4"}>
							<ul className="space-y-2 font-medium">
								{items &&
									items.map(({ description, subItems }) => (
										<Item
											key={description}
											subItems={subItems}
											icon={"proficon"}
											description={description}
											firstLayerHandler={firstLayerHandler}
											secondLayerHandler={secondLayerHandler}
										/>
									))}
							</ul>
						</div>
						<div className="overflow-y-auto py-4 ">
							{secondRowData &&
								secondRowData.map((item) => (
									<p
										key={item.id}
										onClick={() => secondRowHandler(item)}
										className="cursor-pointer space-y-2 py-2 pl-5"
									>
										{item.label}
									</p>
								))}
						</div>
					</div>
				</div>
			</>
		)
	}
)

export default Drawer
