import { getCartSummary, makeCart, makeCartItem } from '@/helpers';
import type {
  CartAddItemParams,
  CartUpdateItemParams,
  CartRemoveItemParams,
  CartRemoveAllParams,
  CartFindParams,
  CartDetailed,
  Cart,
  CartItemDetailed,
} from '@/schemas';
import { db } from '@/db/in-memory';

import type { CartRepository } from '../types/cart-repository.types';

function toCartDetailed(cart: Cart): CartDetailed {
  const { id, userId } = cart;
  const detailedItems = [...db.cartItems.values()];

  return {
    id,
    userId,
    items: detailedItems,
    ...getCartSummary(detailedItems),
  };
}

function createCartItem(params: CartAddItemParams): CartItemDetailed {
  const { cartId, productId, quantity } = params;
  const { id } = makeCartItem(params);

  const foundProduct = db.products.get(productId);

  if (!foundProduct) {
    throw new Error('Cannot add item without a product');
  }

  const { name, price, slug, image } = foundProduct;

  return {
    id,
    quantity,
    cartId,
    productId,
    name,
    price,
    slug,
    image,
  };
}

export class InMemoryCartRepository implements CartRepository {
  async add(params: CartAddItemParams): Promise<CartDetailed | null> {
    const createdCart = makeCart(params);
    const createdCartItem = createCartItem(params);

    db.carts.set(createdCart.id, createdCart);
    db.cartItems.set(createdCart.id, createdCartItem);

    return this.find({ cartId: params.cartId });
  }

  async find({ cartId }: CartFindParams): Promise<CartDetailed | null> {
    const foundCart = db.carts.get(cartId);

    if (!foundCart) {
      return null;
    }

    return toCartDetailed(foundCart);
  }

  async update({
    itemId,
    ...changes
  }: CartUpdateItemParams): Promise<CartDetailed | null> {
    const cartItems = Array.from(db.cartItems.values());
    const foundCartItem = cartItems.find((item) => item.id === itemId);

    if (!foundCartItem) {
      return null;
    }

    const updatedItem = {
      ...foundCartItem,
      ...changes,
    };

    db.cartItems.set(itemId, updatedItem);

    return this.find({ cartId: updatedItem.cartId });
  }

  async remove({ itemId }: CartRemoveItemParams): Promise<CartDetailed | null> {
    const cartItems = Array.from(db.cartItems.values());
    const foundCartItem = cartItems.find((item) => item.id === itemId);

    if (!foundCartItem) {
      return null;
    }

    db.cartItems.delete(foundCartItem.id);

    return this.find({ cartId: foundCartItem.cartId });
  }

  async removeAll({
    cartId,
  }: CartRemoveAllParams): Promise<CartDetailed | null> {
    const cartItems = Array.from(db.cartItems.values());

    cartItems.forEach((item) => db.cartItems.delete(item.id));

    return this.find({ cartId });
  }

  async fill(params: CartAddItemParams[]): Promise<CartDetailed | null> {
    if (params.length === 0) {
      return null;
    }

    const cartParams = params[0]!;
    const createdCart = makeCart(cartParams);
    const createdCartItems = params.map((args) => createCartItem(args));

    db.carts.set(createdCart.id, createdCart);

    for (const createdCartItem of createdCartItems) {
      db.cartItems.set(createdCart.id, createdCartItem);
    }

    return this.find({ cartId: cartParams.cartId });
  }

  async clear(): Promise<void> {
    db.cartItems.clear();
    db.carts.clear();
  }
}
