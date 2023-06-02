import React, { ForwardedRef, forwardRef } from "react"
import { IItem } from "../../../../interfaces/IItem"
import Header from "@component/react/components/modal/partials/header"
import Body from "@component/react/components/modal/partials/body"
import Footer from "@component/react/components/modal/partials/footer"

interface IModal {
	onClose: () => void
	item: IItem
	children: React.ReactNode
	onAccept: () => void
}
const Modal = forwardRef(
	(
		{ onClose, onAccept, item, children }: IModal,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		return (
			<div
				tabIndex={-1}
				aria-hidden="true"
				ref={ref}
				className="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full"
			>
				<div className="relative h-full w-full max-w-2xl md:h-auto">
					<div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
						<Header {...item} />
						<Body>{children}</Body>
						<Footer onClose={onClose} onAccept={onAccept} />
					</div>
				</div>
			</div>
		)
	}
)
export default Modal
