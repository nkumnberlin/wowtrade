// @ts-ignore
const handleClick = (ev) => {
	const realm = ev.target.dataset.realm
	const name = ev.target.dataset.name
	// @ts-ignore
	window.location.href = `/authenticated/characters/professions/eu/${realm}/${name}`
}

//id*='someId'
const dataButtons = window?.document?.querySelectorAll("[data-realm]")
dataButtons.forEach((button) => button.addEventListener("click", handleClick))
