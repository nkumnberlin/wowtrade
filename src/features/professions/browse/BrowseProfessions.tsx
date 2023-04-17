import React, { useCallback, useEffect, useRef, useState } from "react"
import {
	Category,
	ProfessionSkillTree,
	KnownRecipe
} from "../../../interfaces/IProfessionList"
import SideNavigation from "src/components/react/components/sideNavigation"
import {
	IItem,
	ISecondRowData
} from "@component/react/components/sideNavigation/interfaces"
import { ordersToItem } from "../../../api/services/Order"
import { Orders } from "../../orders/view/public"
import { Listing } from "../../../interfaces/IViewListings"

interface IBrowseProfessions {
	professions: ProfessionSkillTree[]
}

function fetchItemsToSelection(id: number) {
	if (!id) return
	return ordersToItem(String(id))
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
	const [orders, setOrders] = useState<Listing[] | null>(null)

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

	useEffect(() => {
		if (!professionHandler.recipe) return
		fetchItemsToSelection(professionHandler.recipe.id_crafted_item).then(
			(res) => setOrders(res.data)
		)
	}, [professionHandler.recipe])

	useEffect(() => {
		// const url = new URL(window.location.href)
		// const [prevProfession, prevCategory, prevItemID] = [
		// 	url.searchParams.get("profession"),
		// 	url.searchParams.get("category"),
		// 	url.searchParams.get("itemID")
		// ]
		//
		// const selectedProfession = professions.find((profession) =>
		// 	profession.name.includes(prevProfession)
		// )
		// const selectedCategory = selectedProfession?.categories.find(
		// 	(category) => category.name === prevCategory
		// )
		// const selectedRecipe = selectedCategory?.recipes.find(
		// 	(recipe) => recipe.id_crafted_item === parseInt(prevItemID, 10)
		// )
		// return setProfessionHandler({
		// 	...professionHandler,
		// 	profession: selectedProfession ?? professionHandler.profession,
		// 	category: selectedCategory ?? professionHandler.category,
		// 	recipe: selectedRecipe ?? professionHandler.recipe
		// })
	}, [])

	const handleProfessionSelect = (selectedProfession: string) => {
		const profession = professions.find((_profession) =>
			_profession.name.includes(selectedProfession)
		)
		// profession.name = profession.name.replace("Dragon Isles ", "")
		// const url = new URL(window.location.href)
		// url.searchParams.set("profession", profession.name)
		// window.history.replaceState(null, "", url)
		// setProfessionHandler({
		// 	...professionHandler,
		// 	profession
		// })
	}

	const handleCategorySelect = (selectedCategory: string) => {
		const category = professionHandler.profession.categories.find(
			(category) => selectedCategory === category.name
		)
		// const url = new URL(window.location.href)
		// url.searchParams.set("category", category.name)
		// window.history.replaceState(null, "", url)
		// setProfessionHandler({
		// 	...professionHandler,
		// 	category
		// })
	}

	const selectRecipe = (selectedRecipe: ISecondRowData) => {
		const recipe = professionHandler.category.recipes.find(
			(recipe) => selectedRecipe.label === recipe.name
		)
		// const url = new URL(window.location.href)
		// url.searchParams.set("itemID", String(recipe.id_crafted_item))
		// window.history.replaceState(null, "", url)
		// setProfessionHandler({
		// 	...professionHandler,
		// 	recipe
		// })
	}

	return (
		<div className="flex h-full flex-row">
			<div>
				<SideNavigation
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
					secondRowHandler={selectRecipe}
				/>
			</div>
			<div className="w-screen bg-gray-200">
				<Orders orders={orders} />
			</div>
		</div>
	)
}

export default BrowseProfessions
