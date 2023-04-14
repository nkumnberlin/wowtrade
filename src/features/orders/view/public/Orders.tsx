import React from "react"
import { Listing } from "../../../../interfaces/IViewListings"

const Orders = ({ orders }: { orders: Listing[] }) => {
	if (!orders) return

	return (
		<div className="flex flex-row">
			{orders.map((order) => (
				<div className="h-96 w-96 basis-1/4 bg-gray-200 drop-shadow-lg">
					{order.item.item_name}
				</div>
			))}
		</div>
	)
}

export default Orders
