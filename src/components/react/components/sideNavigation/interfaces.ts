import React, { Dispatch } from "react"

export interface ISubItem
	extends Omit<Handler, "firstLayerHandler" | "secondRowHandler"> {
	href?: string
	description: string
}

// unkown how to handle icons. need to crop
export interface IItem extends Omit<Handler, "secondRowHandler"> {
	subItems: ISubItem[]
	icon: string
	description: string
	showSubItems: boolean
	setShowSubItems: Dispatch<React.SetStateAction<string>>
}
export interface ISecondRowData {
	id: number
	label: string
}

export interface ISideNavigation extends Handler {
	items: IItem[]
	buttonLabel: string
	secondRowData?: ISecondRowData[]
}

interface Handler {
	firstLayerHandler: (val: string) => void
	secondLayerHandler: (val: string) => void
	secondRowHandler: (val: ISecondRowData) => void
}
