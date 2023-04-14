import React, { useCallback, useEffect, useRef, useState } from "react"
import {
	Category,
	ProfessionSkillTree,
	KnownRecipe
} from "../../../interfaces/IProfessionList"
import Drawer from "@component/react/components/drawer"
import { IItem } from "@component/react/components/drawer/interfaces"
import { Drawer as FlowBiteDrawer, DrawerInterface } from "flowbite"

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
	const drawerRef = useRef<HTMLDivElement>(null)
	let drawer: DrawerInterface | null = null

	useEffect(() => {
		if (!drawerRef.current) return
		drawer = new FlowBiteDrawer(drawerRef.current)
	}, [drawerRef.current])

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
		const [prevProfession, prevCategory, prevItemID] = [
			url.searchParams.get("profession"),
			url.searchParams.get("category"),
			url.searchParams.get("itemID")
		]

		const selectedProfession = professions.find(
			(profession) => profession.name === prevProfession
		)
		const selectedCategory = selectedProfession?.categories.find(
			(category) => category.name === prevCategory
		)
		const selectedRecipe = selectedCategory?.recipes.find(
			(recipe) => recipe.id_crafted_item === parseInt(prevItemID, 10)
		)
		return setProfessionHandler({
			...professionHandler,
			profession: selectedProfession ?? professionHandler.profession,
			category: selectedCategory ?? professionHandler.category,
			recipe: selectedRecipe ?? professionHandler.recipe
		})
	}, [])

	const handleProfessionSelect = (selectedProfession: string) => {
		const profession = professions.find((_profession) =>
			_profession.name.includes(selectedProfession)
		)
		profession.name = profession.name.replace("Dragon Isles ", "")
		setProfessionHandler({
			...professionHandler,
			profession
		})
	}

	const handleCategorySelect = (selectedCategory: string) => {
		const category = professionHandler.profession.categories.find(
			(category) => selectedCategory === category.name
		)
		setProfessionHandler({
			...professionHandler,
			category
		})
	}
	const toggleDrawer = () => {
		if (!drawer) return
		drawer.toggle()
	}

	const selectRecipe = (selectedRecipe: string) => {
		// const selectRecipe = (recipe: KnownRecipe) => {
		// const url = new URL(window.location.href)
		// url.searchParams.set("itemID", String(recipe.id_crafted_item))
		// // window.history.replaceState(null, "", url)
		// window.location.href = url.href
	}

	const drawerItemsCallback = useCallback(() => {
		return professions
			?.map((profession) => {
				if (!profession.categories.length) return null
				const professionName = profession?.name?.replace("Dragon Isles ", "")
				return {
					icon: professionName,
					description: professionName,
					subItems: profession.categories.map((category) => ({
						description: category.name
					}))
				}
			})
			.filter((item) => item !== null)
			.sort((a, b) => (a.description > b.description ? 1 : -1)) as IItem[]
	}, [professions])

	return (
		<>
			<Drawer
				toggleDrawer={toggleDrawer}
				ref={drawerRef}
				buttonLabel={"Select a Profession"}
				items={drawerItemsCallback()}
				firstLayerHandler={handleProfessionSelect}
				secondLayerHandler={handleCategorySelect}
				secondRowData={professionHandler?.category?.recipes
					.map((recipe) => ({
						label: recipe.name,
						id: recipe.id_crafted_item
					}))
					.sort((a, b) => (a.label > b.label ? 1 : -1))}
				secondRowHandler={(val) => console.log("val ", val)}
			/>
		</>
	)
}

export default BrowseProfessions
