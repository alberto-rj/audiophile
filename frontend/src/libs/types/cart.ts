import type { ApiCartItem, ApiProduct } from '@audiophile/shared';

export interface AddCartItemPayload {
  productId: ApiProduct['id'];
  quantity: number;
}

export interface UpdateCartItemQuantityPayload {
  itemId: ApiCartItem['id'];
  quantity: number;
}

export interface RemoveCartItemPayload {
  itemId: ApiCartItem['id'];
}
