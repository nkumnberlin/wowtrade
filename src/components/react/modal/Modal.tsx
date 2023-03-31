import React, { forwardRef } from "react"
import { IItem } from "../../../interfaces/IItem"
import WoWHeadLink from "@component/react/wowHeadLink"
import Styles from "@component/react/professions/styles.module.css"
import Header from "@component/react/modal/header"
import Body from "@component/react/modal/body"
import Footer from "@component/react/modal/footer"

interface IModal {
	onClose: () => void
	item: IItem
}
//{ onOpen, onClose, modalId }: IModal)
const Modal = forwardRef(({ onClose, item }: IModal, ref) => {
	return (
		<div
			tabIndex={-1}
			aria-hidden="true"
			// @ts-ignore
			ref={ref}
			className="fixed top-0 left-0 right-0 z-50 hidden h-[calc(100%-1rem)] w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full"
		>
			<div className="relative h-full w-full max-w-2xl md:h-auto">
				<div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
					<Header {...item} />
					<Body />
					<Footer onClose={onClose} />
				</div>
			</div>
		</div>
	)
})
export default Modal
