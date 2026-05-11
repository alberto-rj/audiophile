import type { Cart } from '@/libs/types';

import { cartItems } from './cart-items';
import { user } from './user';

export const cart: Cart = {
  id: 1,
  userId: user.id,
  items: cartItems,
};
