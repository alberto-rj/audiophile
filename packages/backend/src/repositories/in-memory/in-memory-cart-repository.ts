import type {
  CartAddItemParams,
  CartUpdateItemParams,
  CartRemoveItemParams,
  CartRemoveAllParams,
  CartIdParams,
  CartDetailed,
  Cart,
  CartItemDetailed,
  CartUserIdParams,
  CartCreateParams,
} from '@audiophile/shared';

import { makeCart, makeCartItem } from '@/helpers/cart';
import { getProductItemSummary } from '@/helpers/product';
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
    ...getProductItemSummary(detailedItems),
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
  async create({ userId }: CartCreateParams): Promise<CartDetailed> {
    const createdCart = makeCart({ userId });

    db.carts.set(createdCart.id, createdCart);

    return toCartDetailed(createdCart);
  }

  async createMany(paramsList: CartCreateParams[]): Promise<CartDetailed[]> {
    const createdCarts = paramsList.map(makeCart);

    createdCarts.forEach((cart) => db.carts.set(cart.id, cart));

    return createdCarts.map(toCartDetailed);
  }

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

  async find({ cartId }: CartIdParams): Promise<CartDetailed | null> {
    const foundCart = db.carts.get(cartId);

    if (!foundCart) {
      return null;
    }

    return toCartDetailed(foundCart);
  }

  async findByUserId({
    userId,
  }: CartUserIdParams): Promise<CartDetailed | null> {
    const foundCart = Array.from(db.carts.values()).find(
      (cart) => cart.userId === userId,
    );

    if (!foundCart) {
      return null;
    }

    return toCartDetailed(foundCart);
  }

  async update({
    itemId,
    cartId,
    ...changes
  }: CartUpdateItemParams): Promise<CartDetailed | null> {
    const cartItems = Array.from(db.cartItems.values());
    const foundCartItem = cartItems.find(
      (item) => item.id === itemId && item.cartId == cartId,
    );

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

  async remove({
    itemId,
    cartId,
  }: CartRemoveItemParams): Promise<CartDetailed | null> {
    const cartItems = Array.from(db.cartItems.values());
    const foundCartItem = cartItems.find(
      (item) => item.id === itemId && item.cartId == cartId,
    );

    if (!foundCartItem) {
      return null;
    }

    db.cartItems.delete(foundCartItem.id);

    return this.find({ cartId: foundCartItem.cartId });
  }

  async removeAll({
    cartId,
  }: CartRemoveAllParams): Promise<CartDetailed | null> {
    const cartItemsToDelete = Array.from(db.cartItems.values()).filter(
      (item) => item.cartId == cartId,
    );

    cartItemsToDelete.forEach((item) => db.cartItems.delete(item.id));

    return this.find({ cartId });
  }

  async clear(): Promise<void> {
    db.cartItems.clear();
    db.carts.clear();
  }
}
