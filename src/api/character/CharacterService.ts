import { REGIONS } from './types';
import { fetchProfessionsForRecipes, transformRecipeNameLower } from '../profession/RecipeService';
import {
  DragonFlightProfessions,
  IProfession,
  KnownRecipe,
  KnownRecipeWithItemId,
  ICraftingData,
} from '../profession/types';

const rp = require('request-promise');

class CharacterService {
  async getUsersCharactersList(usersAccessToken: string) {
    console.log('RETCH', usersAccessToken);
    const response = await rp.get({
      uri: `https://eu.api.blizzard.com/profile/user/wow?namespace=profile-eu`,
      json: true,
      headers: {
        Authorization: `Bearer ${usersAccessToken}`,
      },
    });
    const { wow_accounts } = response;
    console.log('hier brickt doch was!');
    const x = wow_accounts
      .map((account: any) => this._mapWowAccount(account))
      .flat()
      .filter((character: { level: number }) => character.level > 60);
    // todo
    console.log('____ ', x);
    return x;
  }

  mapKnownRecipesWithItemId(craftingData: ICraftingData[], knownRecipes: KnownRecipe[]) {
    const keyedCraftingData = craftingData.reduce(
      (acc, current) => ({
        ...acc,
        [current.item_name]: current,
      }),
      {} as { [name: string]: ICraftingData }
    );
    return knownRecipes
      .map<KnownRecipeWithItemId | null>((knownRecipe) => {
        if (!keyedCraftingData[transformRecipeNameLower(knownRecipe)]) {
          return null;
        }
        return {
          ...knownRecipe,
          itemId: keyedCraftingData[transformRecipeNameLower(knownRecipe)].id_crafted_item,
        };
      })
      .filter((recipe) => recipe) as KnownRecipeWithItemId[];
  }

  async getUserProfessionsToCharacter(
    usersAccessToken: string,
    characterName: string,
    realmSlug: string
  ) {
    const decodedCharacterName = decodeURIComponent(characterName);
    const region: REGIONS = 'eu';
    try {
      // https://eu.api.blizzard.com/profile/wow/character/tichondrius/charactername/professions?namespace=profile-us&locale=en_US&access_token=EUUOWPuWDHb7toaa0972sLtvjzxwvwfMCT
      // if there are primaries, there are also secondaries. need to keep that in mind
      const { primaries } = await rp.get({
        uri: `https://eu.api.blizzard.com/profile/wow/character/${realmSlug}/${decodedCharacterName}/professions?namespace=profile-${region}&locale=en_US`,
        json: true,
        headers: {
          Authorization: `Bearer ${usersAccessToken}`,
        },
      });
      const dragonFlightProfessions: DragonFlightProfessions[] = primaries.reduce(
        (prev: DragonFlightProfessions[], curr: IProfession) => {
          const tiers = curr.tiers.find(({ tier }) => tier.name.toLowerCase().includes('dragon'));
          if (!tiers) return prev;
          // todo: felix nico mal wieder zu dumm dumm
          if (!Object.keys(prev).length) {
            return [
              {
                profession: curr.profession,
                tiers,
              },
            ];
          }
          return [
            {
              profession: curr.profession,
              tiers,
            },
            ...(prev || [{}]),
          ];
        },
        {} as DragonFlightProfessions[]
      );
      // hier will ich mongo db results alle? und dann mappen auf die professions vom nutzer.
      // query: mongodb.item.name === dragonFlightProfessions.tiers.known_recipes[].name
      // result:
      // interface kommt
      const professionsForRecipes = await fetchProfessionsForRecipes(
        dragonFlightProfessions
          .map(
            (dragonflightProfession) => dragonflightProfession.tiers.known_recipes as KnownRecipe[]
          )
          .reduce((acc, current) => [...acc, ...current])
      );
      const mappedDragonflightProfessions = dragonFlightProfessions.map(
        (dragonFlightProfession) => ({
          ...dragonFlightProfession,
          tiers: {
            ...dragonFlightProfession.tiers,
            known_recipes: this.mapKnownRecipesWithItemId(
              professionsForRecipes,
              dragonFlightProfession.tiers.known_recipes
            ),
          },
        })
      );
      console.log(mappedDragonflightProfessions);
      return mappedDragonflightProfessions;
    } catch (e) {
      console.log('while profession', e);
    }
  }

  // todo
  _mapWowAccount(account: any) {
    const { characters } = account;
    return characters.map((character: any) => this._mapCharacter(account, character));
  }
  // todo

  _mapCharacter(account: any, character: any) {
    character.account_id = account.id;
    const characterName = character.name.toLowerCase();
    const realmSlug = character.realm.slug;
    character.armoryUrl = `https://worldofwarcraft.com/character/us/${realmSlug}/${characterName}`;
    return character;
  }
}

export default CharacterService;
