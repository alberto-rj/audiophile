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
  CartFindOrCreateByUserIdParams,
} from '@/schemas';
import { db } from '@/db/in-memory';

import type { CartRepository } from '../types/cart-repository.types';

function toCartDetailed(cart: Cart): CartDetailed {
  const { id, userId } = cart;

  const detailedItems = Array.from(db.cartItems.values()).filter(
    (item) => item.cartId === id,
  );

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
    throw new Error('Cannot create cart item without a product');
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
    const cart = db.carts.get(params.cartId);

    if (!cart) {
      return null;
    }

    const allItems = Array.from(db.cartItems.values());
    const existingItem = allItems.find(
      (i) => i.cartId === params.cartId && i.productId === params.productId,
    );

    if (existingItem) {
      const updated = {
        ...existingItem,
        quantity: existingItem.quantity + params.quantity,
      };
      db.cartItems.set(existingItem.id, updated);
    } else {
      const newItem = createCartItem(params);
      db.cartItems.set(newItem.id, newItem);
    }

    return this.find({ cartId: params.cartId });
  }

  async find({ cartId }: CartFindParams): Promise<CartDetailed | null> {
    const foundCart = db.carts.get(cartId);

    if (!foundCart) {
      return null;
    }

    return toCartDetailed(foundCart);
  }

  async findOrCreateByUserId({
    userId,
  }: CartFindOrCreateByUserIdParams): Promise<CartDetailed> {
    const foundCart = Array.from(db.carts.values()).find(
      (c) => c.userId === userId,
    );

    if (foundCart) {
      return toCartDetailed(foundCart);
    }

    const foundProduct = Array.from(db.products.values()).find(
      (_, index) => index === 0,
    );

    if (!foundProduct) {
      throw new Error('Cannot create cart without a product');
    }

    const newCart = makeCart({
      userId,
    });
    db.carts.set(newCart.id, newCart);

    return toCartDetailed(newCart);
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

  async clear(): Promise<void> {
    db.cartItems.clear();
    db.carts.clear();
  }
}
