import React from "react"

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
}
interface ISecondRowData {
	id: number
	label: string
}

export interface IDrawer extends Handler {
	items: IItem[]
	toggleDrawer: () => void
	buttonLabel: string
	secondRowData?: ISecondRowData[]
}

interface Handler {
	firstLayerHandler: (val: string) => void
	secondLayerHandler: (val: string) => void
	secondRowHandler: (val: ISecondRowData) => void
}
