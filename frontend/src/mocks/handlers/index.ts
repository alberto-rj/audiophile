import { http, HttpResponse } from 'msw';

import { authHandlers } from './auth.handlers';
import { cartHandlers } from './cart.handlers';
import { categoryHandlers } from './category.handlers';
import { orderHandlers } from './order.handlers';
import { productHandlers } from './product.handlers';
import { userHandlers } from './user.handlers';
import { withInfiniteDelay } from '../middlewares/with-delay';

export const makeInfiniteHandler = (endpoint: string) => {
  return http.get(
    endpoint,
    withInfiniteDelay(async () => {
      return HttpResponse.json(undefined);
    }),
  );
};

export const makeGetInfiniteHandler = (endpoint: string) => {
  return http.get(
    endpoint,
    withInfiniteDelay(async () => {
      return HttpResponse.json(undefined);
    }),
  );
};

export const makeGetStatusHandler = (endpoint: string, status: number) => {
  return http.get(endpoint, async () => {
    return new HttpResponse(undefined, { status });
  });
};

export const makeNotFoundHandler = (endpoint: string) => {
  return http.get(endpoint, async () => {
    return new HttpResponse(undefined, { status: 404 });
  });
};

export {
  makeLoginHandler,
  makeLogoutHandler,
  makeRefreshHandler,
  makeRegisterHandler,
} from './auth.handlers';

export { makeGetCartHandler } from './cart.handlers';

export {
  getCategoryProducts,
  getCategories,
  makeGetCategoriesHandler,
  makeGetCategoryProductsHandler,
} from './category.handlers';

export {
  makeCreateOrderHandler,
  makeGetOrdersHandler,
  makeGetOrderHandler,
} from './order.handlers';

export { getProductBySlug, getProducts } from './product.handlers';

export const handlers = [
  ...authHandlers,
  ...cartHandlers,
  ...categoryHandlers,
  ...orderHandlers,
  ...productHandlers,
  ...userHandlers,
];
