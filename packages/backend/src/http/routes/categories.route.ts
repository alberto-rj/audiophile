import { Router } from 'express';

import {
  getCategoriesController,
  getCategoryBySlugController,
} from '../controllers';

export const categoriesRoute = Router();

categoriesRoute.get('/', getCategoriesController);

categoriesRoute.get('/:slug', getCategoryBySlugController);
