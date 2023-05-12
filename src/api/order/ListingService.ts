import { getListingsCollection } from '../services/database';

import { ListingData } from './types';

const MILLISECONDS_MULTiPLIER = 1000;
export const saveListing = async (listing: ListingData) => {
  if (
    !listing.item.id_crafted_item ||
    !listing.qualifiedCharacterName ||
    !listing.creatorAccountId
  ) {
    throw new Error('item / user not found');
  }
  if (!listing.difficulty || !listing.quality) {
    throw new Error('Difficulty / Quality not determined');
  }
  const collection = await getListingsCollection();
  const hasMoreThanFiveListings = await findByCreatorAccountId(listing.creatorAccountId);
  // should be 5
  if (hasMoreThanFiveListings.length >= 20) {
    throw new Error('has too many listings, limit is 20');
  }
  const expiredAtDate = new Date();
  expiredAtDate.setTime(
    expiredAtDate.getTime() + listing.listingDuration.valueOf() * MILLISECONDS_MULTiPLIER
  );
  listing.expiredAt = expiredAtDate;
  listing.createdAt = new Date();
  console.log('debugg ', listing);
  const hasEntries = await checkIfUserHasIdenticalListing(
    listing.item.id_crafted_item,
    listing.creatorAccountId
  );
  if (hasEntries.length) {
    throw new Error('item to this user exist and cannot be inserted');
  }
  console.log('render insert 1');
  return await collection.insertOne(listing);
};
export const findByItemName = async (itemName: string) => {
  const collection = await getListingsCollection();
  return collection
    .find(
      {
        item: {
          item_name: itemName,
        },
      },
      {
        projection: {
          item_name: '',
        },
      }
    )
    .toArray();
};
export const findByItemID = async (itemID: number) => {
  const collection = await getListingsCollection();
  return collection
    .find(
      {
        'item.id_crafted_item': itemID,
      },
      {
        projection: {
          'item.id_crafted_item': 0,
        },
      }
    )
    .toArray();
};

export const findByCreatorAccountId = async (accountId: number) => {
  const collection = await getListingsCollection();
  return collection
    .find(
      { creatorAccountId: accountId },
      {
        projection: {
          creatorAccountId: 0,
        },
      }
    )
    .toArray();
};

export const findLastFiveCreatedListings = async () => {
  const collection = await getListingsCollection();
  return await collection
    .find(
      {},
      {
        projection: {
          creatorAccountId: 0,
        },
      }
    )
    .sort({ createdAt: -1 })
    .limit(5)
    .toArray();
};

async function checkIfUserHasIdenticalListing(id_crafted_item: number, creatorAccountId: number) {
  const collection = await getListingsCollection();
  return collection
    .find(
      {
        creatorAccountId: creatorAccountId,
        'item.id_crafted_item': id_crafted_item,
      },
      {
        projection: {
          creatorAccountId: 0,
          'item.id_crafted_item': 0,
        },
      }
    )
    .toArray();
}

export async function deleteListingOfUser(id_crafted_item: number, creatorAccountId: number) {
  const deleteListing = {
    creatorAccountId: creatorAccountId,
    'item.id_crafted_item': id_crafted_item,
  };
  const collection = await getListingsCollection();
  return collection.deleteOne(deleteListing);
}
