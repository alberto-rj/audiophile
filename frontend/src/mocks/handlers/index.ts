import { authHandlers } from './auth.handlers';
import { userHandlers } from './user.handlers';
import { productHandlers } from './product.handlers';
import { orderHandlers } from './order.handlers';
import { categoryHandlers } from './category.handlers';

export const handlers = [
  ...categoryHandlers,
  ...productHandlers,
  ...orderHandlers,
  ...authHandlers,
  ...userHandlers,
];
