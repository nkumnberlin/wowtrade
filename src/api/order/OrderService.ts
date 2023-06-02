import { getListingsCollection } from '../services/database';

import { Order, OrderData } from './types';
import {exclude, prisma} from "../utils/db";
import {PrismaPromise} from "@prisma/client";

const MILLISECONDS_MULTiPLIER = 1000;

const excludeAccountId = (order: Order) => exclude<Order, 'creatorAccountId'>(order, ['creatorAccountId'])

export const saveListing = async (order: OrderData) => {
  if (
    !order.item.id_crafted_item ||
    !order.qualifiedCharacterName ||
    !order.creatorAccountId
  ) {
    throw new Error('item / user not found');
  }
  if (!order.difficulty || !order.quality) {
    throw new Error('Difficulty / Quality not determined');
  }
  const collection = await getListingsCollection();
  const hasMoreThanFiveListings = await findByCreatorAccountId(order.creatorAccountId);
  // should be 5
  if (hasMoreThanFiveListings.length >= 20) {
    throw new Error('has too many listings, limit is 20');
  }
  const expiredAtDate = new Date();
  expiredAtDate.setTime(
    expiredAtDate.getTime() + order.listingDuration.valueOf() * MILLISECONDS_MULTiPLIER
  );
  order.expiredAt = expiredAtDate;
  order.createdAt = new Date();
  console.log('debugg ', order);
  const hasEntries = await checkIfUserHasIdenticalListing(
    order.item.id_crafted_item,
    order.creatorAccountId
  );
  if (hasEntries.length) {
    throw new Error('item to this user exist and cannot be inserted');
  }
  console.log('render insert 1');
  return await collection.insertOne(order);
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
export const findByItemID = async (itemID: number) => prisma.order.findMany({
	where: {
		item: {
			id_crafted_item: itemID
		}
	},
	select: {
		creatorAccountId: false,
		item: {
			select: {
				id_crafted_item: false
			}
		}
	}
}) as PrismaPromise<Array<Order>>;

export const findByCreatorAccountId = async (creatorAccountId: number) => {
	const orders = await prisma.order.findMany({
		where: {
			creatorAccountId
		},
		select: {
			creatorAccountId: false,
		}
	}) as Array<Order>;
	return orders.map(excludeAccountId);
}

export const findLastFiveCreatedListings = async () => {
	const lastFiveOrders = await prisma.order.findMany({
		orderBy: {
			createdAt: 'asc',
		},
		take: 5,
	}) as Array<Order>;
	return lastFiveOrders.map(excludeAccountId);
}

const checkIfUserHasIdenticalListing = async (id_crafted_item: number, creatorAccountId: number) => {
	const order = await prisma.order.findFirst({
		where: {
			creatorAccountId,
			item: {
				id_crafted_item
			}
		},
		select: {
			creatorAccountId: false,
		}
	}) as Order;
	if(!order?.createdAt){
		return;
	}
	return excludeAccountId(order);
}

// TODO: this now deletes via order id
const deleteListingOfUser = (orderId: number) => prisma.order.delete({
	where: {
		id: orderId
	},
})
