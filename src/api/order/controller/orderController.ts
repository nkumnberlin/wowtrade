import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import { ExpectingListingData, OrderFetchRequest } from '../types';
import { createOrderMapper } from '../../helper/order/createOrderMapper';
import {
  deleteListingOfUser,
  findByCreatorAccountId,
  findByItemID,
  findLastFiveCreatedListings,
  saveListing,
} from '../ListingService';

export const orderController: FastifyPluginCallback = (app, opts, done) => {
  app.post(
    '/authenticated/order',
    async (
      req: FastifyRequest<{
        Body: ExpectingListingData;
      }>,
      res
    ) => {
      if (!req?.user?.id) {
        return res.status(500).send({
          status: 500,
          message: `UserId doesn't exist.`,
        });
      }
      try {
        const listingData = req.body;
        listingData.creatorAccountId = req?.user?.id;
        const orderDTO = createOrderMapper(listingData);
        console.log('0der', orderDTO);
        const createdOrder = await saveListing(orderDTO);
        return await res.send(createdOrder).status(201);
      } catch (e) {
        console.log('error while created', e);
        return res.status(500).send({
          status: 500,
          message: `Failed while creating order. ${e}`,
        });
      }
    }
  );

  app.delete('/authenticated/order', async (req: OrderFetchRequest, res) => {
    const { id_crafted_item: IdCraftedItem } = req.query;
    const creatorAccountId = req?.user?.id;
    if (!IdCraftedItem) {
      return res.status(500).send({
        status: 500,
        message: 'id does not exist',
      });
    }
    if (!creatorAccountId) {
      return res.status(500).send({
        status: 500,
        message: `UserId doesn't exist.`,
      });
    }
    const itemId = parseInt(IdCraftedItem, 10);
    console.log('in delete, ', IdCraftedItem);
    try {
      await deleteListingOfUser(itemId, creatorAccountId);
      return await res.status(201).send({
        status: 201,
        message: 'successfully deleted',
      });
    } catch (e) {
      return res.status(500).send({
        status: 500,
        message: `Failed while deleting order. ${e}`,
      });
    }
  });
  app.get('/viewLast5', async (req: FastifyRequest, res) => {
    console.log('ist in order');
    const lastFiveOrders = await findLastFiveCreatedListings();
    return res.send(lastFiveOrders).status(200);
  });
  app.get('/order', async (req: OrderFetchRequest, res) => {
    const { id_crafted_item: IdCraftedItem } = req.query;
    if (!IdCraftedItem) return res.send(500).send({ status: 500 });
    console.log('id: ', IdCraftedItem);
    const craftedItemId = parseInt(IdCraftedItem, 10);
    const allItems = await findByItemID(craftedItemId);
    console.log('aall items', allItems);
    return res
      .send({
        data: allItems,
        status: 200,
      })
      .status(200);
  });

  app.get('/authenticated/order', async (req: OrderFetchRequest, res) => {
    try {
      const accountId = req?.user?.id;
      console.log('req user', req.user);
      if (accountId) {
        const ordersByAccountCreatorId = await findByCreatorAccountId(accountId);
        return await res.send(ordersByAccountCreatorId).status(200);
      }
      return await res.status(500).send({ message: 'Failed while fetching Characters' });
    } catch (e) {
      return res.status(500).send({ message: 'Failed while fetching Characters' });
    }
  });
  done();
};
