import type { ResponsiveImageType } from '@/libs/types';

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  name: string;
  price: number;
  slug: string;
  image: ResponsiveImageType;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
}

export interface CartResponse {
  cart: Cart;
}

export interface AddCartItemPayload {
  productId: number;
  quantity: number;
}

export interface UpdateCartItemQuantityPayload {
  productId: number;
  quantity: number;
}

export interface RemoveCartItemPayload {
  productId: number;
}
