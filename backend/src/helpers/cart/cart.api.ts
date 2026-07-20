import type {
  ApiCart,
  ApiCartItem,
  CartDetailed,
  CartItemDetailed,
} from '@/schemas';

import { buildResponseImage } from '../cloudinary/cloudinary';

function toApiCartItem(cartItem: CartItemDetailed): ApiCartItem {
  const { id, name, price, image, slug, quantity, productId } = cartItem;

  return {
    id,
    productId,
    quantity,
    price,
    name,
    slug,
    image: buildResponseImage(image, 'cartItem'),
  };
}

export function toApiCart(cart: CartDetailed): ApiCart {
  const { grandTotal, id, items, shipping, subtotal, vat } = cart;

  return {
    grandTotal,
    id,
    shipping,
    subtotal,
    vat,
    items: items.map(toApiCartItem),
  };
}
