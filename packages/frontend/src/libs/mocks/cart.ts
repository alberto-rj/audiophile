import type { ApiCart, ApiCartItem } from '@audiophile/shared';

import { cartItems } from './cart-items';

export const getSubtotal = (items: ApiCartItem[]) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const getShipping = () => {
  return 50;
};

export const getVAT = (items: ApiCartItem[]) => {
  return Math.round(getSubtotal(items) * 0.2);
};

export const getGrandTotal = (items: ApiCartItem[]) => {
  return getSubtotal(items) + getShipping() + getVAT(items);
};

export const cart: ApiCart = {
  id: 1,
  subtotal: getSubtotal(cartItems),
  vat: getVAT(cartItems),
  shipping: getShipping(),
  grandTotal: getGrandTotal(cartItems),
  items: cartItems,
};
