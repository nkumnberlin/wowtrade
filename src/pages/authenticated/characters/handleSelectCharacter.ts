// @ts-ignore
const handleClick = (ev) => {
	const realm = ev.target.dataset.realm
	const name = ev.target.dataset.name
	window.location.href = `/authenticated/characters/professions/eu/${realm}/${name}`
}

//id*='someId'
const buttons = document.querySelectorAll("[data-realm]")
buttons.forEach((button) => button.addEventListener("click", handleClick))
