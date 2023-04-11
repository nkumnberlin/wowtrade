// @ts-ignore
const buttons = document.querySelectorAll("[data-copy]")
buttons.forEach((button) =>
	button.addEventListener("click", (ev) => {
		// @ts-ignore
		navigator.clipboard.writeText(ev.target.value)
	})
)
