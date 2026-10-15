import type { ApiProduct } from '@audiophile/shared';

export interface AddCartItemPayload {
  productId: ApiProduct['id'];
  quantity: number;
}

export interface UpdateCartItemQuantityPayload {
  productId: ApiProduct['id'];
  quantity: number;
}

export interface RemoveCartItemPayload {
  productId: ApiProduct['id'];
}
