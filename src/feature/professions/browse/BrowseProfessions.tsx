import React, { useEffect, useState } from "react"
import Styles from "./styles.module.css"
import {
	Category,
	ProfessionSkillTree,
	KnownRecipe
} from "../../../interfaces/IProfessionList"

interface IBrowseProfessions {
	professions: ProfessionSkillTree[]
}
const BrowseProfessions = ({ professions }: IBrowseProfessions) => {
	const [professionHandler, setProfessionHandler] = useState<{
		profession: ProfessionSkillTree | null
		category: Category | null
		recipe: KnownRecipe | null
	}>({
		profession: null,
		category: null,
		recipe: null
	})

	useEffect(() => {
		const { profession, category } = professionHandler
		if (profession) {
			const url = new URL(window.location.href)
			url.searchParams.set("profession", profession.name)
			window.history.replaceState(null, "", url)
		}
		if (category) {
			const url = new URL(window.location.href)
			url.searchParams.set("category", category.name)
			window.history.replaceState(null, "", url)
		}
	}, [professionHandler])

	useEffect(() => {
		const url = new URL(window.location.href)
		const prevProfession = url.searchParams.get("profession")
		const prevCategory = url.searchParams.get("category")
		const prevItemID = url.searchParams.get("itemID")

		if (prevCategory && prevProfession && prevItemID) {
			const selectedProfession = professions.find(
				(profession) => profession.name === prevProfession
			)
			const selectedCategory = selectedProfession.categories.find(
				(category) => category.name === prevCategory
			)
			const selectedRecipe = selectedCategory.recipes.find(
				(recipe) => recipe.id_crafted_item === parseInt(prevItemID, 10)
			)
			return setProfessionHandler({
				...professionHandler,
				profession: selectedProfession,
				category: selectedCategory,
				recipe: selectedRecipe
			})
		}
		if (prevCategory && prevProfession) {
			const selectedProfession = professions.find(
				(profession) => profession.name === prevProfession
			)
			const selectedCategory = selectedProfession.categories.find(
				(category) => category.name === prevCategory
			)
			return setProfessionHandler({
				...professionHandler,
				profession: selectedProfession,
				category: selectedCategory
			})
		}

		if (prevProfession) {
			const selectedProfession = professions.find(
				(profession) => profession.name === prevProfession
			)
			return setProfessionHandler({
				...professionHandler,
				profession: selectedProfession
			})
		}
	}, [])

	const selectRecipe = (recipe: KnownRecipe) => {
		const url = new URL(window.location.href)
		url.searchParams.set("itemID", String(recipe.id_crafted_item))
		// window.history.replaceState(null, "", url)
		window.location.href = url.href
	}

	return (
		<div className="flex flex-row">
			<div className="basis-1/3">
				{professions.map((profession) => (
					<p
						className={"cursor-pointer"}
						key={profession.id}
						onClick={() =>
							setProfessionHandler({
								...professionHandler,
								profession
							})
						}
					>
						{profession.name.replace("Dragon Isles ", "")}
					</p>
				))}
			</div>
			<div className="basis-1/3">
				{professionHandler.profession &&
					professionHandler.profession.categories.map((category) => (
						<p
							key={category.name}
							className={"cursor-pointer"}
							onClick={() =>
								setProfessionHandler({
									...professionHandler,
									category
								})
							}
						>
							{category.name}
						</p>
					))}
			</div>
			<div className="basis-1/3">
				{professionHandler.category &&
					professionHandler.category.recipes.map((recipe) => (
						<p
							key={recipe.name}
							className={"cursor-pointer"}
							onClick={() => selectRecipe(recipe)}
						>
							{recipe.name}
						</p>
					))}
			</div>
		</div>
	)
}

export default BrowseProfessions
