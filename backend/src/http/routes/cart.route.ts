import { Router } from 'express';

import {
  getCartController,
  addCartItemController,
  removeCartItemController,
  removeCartItemsController,
  updateCartItemController,
} from '../controllers';
import { requireAuth } from '../middlewares';

export const cartRoute = Router();

cartRoute.get('/', requireAuth, getCartController);

cartRoute.post('/', requireAuth, addCartItemController);

cartRoute.patch('/:itemId', requireAuth, updateCartItemController);

cartRoute.delete('/:itemId', requireAuth, removeCartItemController);

cartRoute.delete('/', requireAuth, removeCartItemsController);
