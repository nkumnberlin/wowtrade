// @flow
import React from "react"
import Styles from "./styles.module.css"

type Props = {
	children: React.ReactNode
	itemId: number
}
const WoWHeadLink = ({ itemId, children }: Props) => {
	return (
		<a
			href={`https://wowhead.com/item=${itemId}`}
			className={Styles.wowHeadItem}
		>
			{children}
		</a>
	)
}

export default WoWHeadLink
