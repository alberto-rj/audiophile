import { Router } from 'express';

import {
  createOrderController,
  getOrderController,
  getOrdersController,
} from '../controllers';
import { requireAuth } from '../middlewares';

export const ordersRoute = Router();

ordersRoute.use('/', requireAuth);

ordersRoute.post('/', createOrderController);

ordersRoute.get('/', getOrdersController);

ordersRoute.get('/:id', getOrderController);
