import { authHandlers } from './auth.handlers';
import { cartHandlers } from './cart.handlers';
import { categoryHandlers } from './category.handlers';
import { orderHandlers } from './order.handlers';
import { productHandlers } from './product.handlers';
import { userHandlers } from './user.handlers';

export const handlers = [
  ...authHandlers,
  ...cartHandlers,
  ...categoryHandlers,
  ...orderHandlers,
  ...productHandlers,
  ...userHandlers,
];
