import type { Cart, CartItem } from '@/libs/types';

import { cartItems } from './cart-items';
import { user } from './user';

export const getSubtotal = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const getShipping = () => {
  return 50;
};

export const getVAT = (items: CartItem[]) => {
  return Math.round(getSubtotal(items) * 0.2);
};

export const getGrandTotal = (items: CartItem[]) => {
  return getSubtotal(items) + getShipping() + getVAT(items);
};

export const cart: Cart = {
  id: 1,
  userId: user.id,
  subtotal: getSubtotal(cartItems),
  vat: getVAT(cartItems),
  shipping: getShipping(),
  grandTotal: getGrandTotal(cartItems),
  items: cartItems,
};
