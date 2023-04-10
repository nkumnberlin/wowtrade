import React from "react"
import { Listing } from "../../../../interfaces/IViewListings"
import Styles from "../../../characters/styles.module.css"

const OrdersToAccount = ({ orders }: { orders: Listing[] }) => {
	return (
		<table>
			<tbody>
				<tr className={Styles.tableHeading}>
					<th>Item Name:</th>
					<th>Quality:</th>
					<th>Difficulty:</th>
					<th>Listing Time:</th>
					<th>Commission:</th>
					<th></th>
					<th>Character Name:</th>
					<th>Delete order</th>
				</tr>
				{orders.map((order) => (
					<tr key={order._id}>
						<td>{order.item.item_name}</td>
						<td>{order.quality}</td>
						<td>{order.difficulty}</td>
						<td>{order.listingDuration}</td>
						<td>{order.commission.gold}g</td>
						<td>{order.commission.silver}s</td>
						<td>{order.qualifiedCharacterName}</td>
						<td>
							<button
								className={Styles.selectButton}
								type="button"
								id={order._id}
								onClick={() => console.log("delete!")}
							>
								Select
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default OrdersToAccount
