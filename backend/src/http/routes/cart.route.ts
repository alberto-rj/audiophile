import { Router } from 'express';

import {
  addCartItemController,
  getCartItemController,
  removeCartItemController,
  removeCartItemsController,
  updateCartItemController,
} from '../controllers';
import { requireAuth } from '../middlewares';

export const cartRoute = Router();

cartRoute.use('/', requireAuth);

cartRoute.get('/', getCartItemController);

cartRoute.post('/', addCartItemController);

cartRoute.patch('/:itemId', updateCartItemController);

cartRoute.delete('/:itemId', removeCartItemController);

cartRoute.delete('/', removeCartItemsController);
