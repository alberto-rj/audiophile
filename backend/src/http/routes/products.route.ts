import { Router } from 'express';

import { getProductBySlugController } from '../controllers';

export const productsRoute = Router();

productsRoute.get('/:slug', getProductBySlugController);
