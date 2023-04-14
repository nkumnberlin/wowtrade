import React from "react"
import { Listing } from "../../../../interfaces/IViewListings"

const Orders = ({ orders }: { orders: Listing[] }) => {
	if (!orders) return

	return (
		<div className="m-4 flex flex-row">
			{orders.map((order) => (
				<div className="h-48 w-48 basis-1/4 rounded bg-white p-2 drop-shadow-lg">
					{order.item.item_name}
				</div>
			))}
		</div>
	)
}

export default Orders
