import { Router } from 'express';

import {
  getProductBySlugController,
  getProductsController,
} from '../controllers';

export const productsRoute = Router();

productsRoute.get('/', getProductsController);

productsRoute.get('/:slug', getProductBySlugController);
