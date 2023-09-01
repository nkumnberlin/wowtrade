import {removeAllCraftedItemsWithEmptyId, updateCraftedItemsWithRecipeId} from "../profession/CraftedItemsService";
import {getAllProfessionSkillTrees, saveAllProfessionsIfNotExist} from "@/profession";

export const migrateSources = async () => {
	await saveAllProfessionsIfNotExist();
	const allProfessionSkillTrees = await getAllProfessionSkillTrees();
	await updateCraftedItemsWithRecipeId(allProfessionSkillTrees);
	await removeAllCraftedItemsWithEmptyId();
}
