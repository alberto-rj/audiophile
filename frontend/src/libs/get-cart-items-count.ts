import type { CartItem } from '@/libs/types';

export const getCartItemsCount = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};
