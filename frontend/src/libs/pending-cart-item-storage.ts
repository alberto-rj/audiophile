import type { AddCartItemPayload } from '@/libs/types';

const PENDING_CART_ITEM_KEY = 'pending_cart_item';

export function setPendingCartItem(payload: AddCartItemPayload) {
  sessionStorage.setItem(PENDING_CART_ITEM_KEY, JSON.stringify(payload));
}

export function getPendingCartItem(): AddCartItemPayload | null {
  const raw = sessionStorage.getItem(PENDING_CART_ITEM_KEY);

  if (!raw) {
    return null;
  }

  try {
    const payload = JSON.parse(raw) as AddCartItemPayload;
    return payload;
  } catch {
    return null;
  }
}

export function removePendingCartItem(): void {
  sessionStorage.removeItem(PENDING_CART_ITEM_KEY);
}
