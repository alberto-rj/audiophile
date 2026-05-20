import { http, HttpResponse } from 'msw';
import { authHandlers } from './auth.handlers';
import { cartHandlers } from './cart.handlers';
import { categoryHandlers } from './category.handlers';
import { orderHandlers } from './order.handlers';
import { productHandlers } from './product.handlers';
import { userHandlers } from './user.handlers';
import { withInfiniteDelay } from '../middlewares/with-delay';

export const handlers = [
  ...authHandlers,
  ...cartHandlers,
  ...categoryHandlers,
  ...orderHandlers,
  ...productHandlers,
  ...userHandlers,
];

export const makeInfiniteHandler = (endpoint: string) => {
  return http.get(
    endpoint,
    withInfiniteDelay(async () => {
      return HttpResponse.json(undefined);
    }),
  );
};

export const makeNotFoundHandler = (endpoint: string) => {
  return http.get(endpoint, async () => {
    return new HttpResponse(undefined, { status: 404 });
  });
};

export { getCategoryProducts, getCategories } from './category.handlers';
export { getProductBySlug, getProducts } from './product.handlers';
