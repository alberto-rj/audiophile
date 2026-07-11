import { eq } from 'drizzle-orm';

import type {
  CartAddItemParams,
  Cart,
  CartUpdateItemParams,
  CartRemoveItemParams,
  CartRemoveAllParams,
  CartFindParams,
  CartDetailed,
} from '@/schemas';
import {
  cartItems,
  carts,
  db,
  products,
  type Cart as RawCart,
} from '@/db/drizzle';

import type { CartRepository } from '../types/cart-repository.types';

function parseItem(rawItem: RawCart): Cart {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, ...itemWithoutTimestamp } = rawItem;

  return itemWithoutTimestamp;
}

export class DrizzleCartRepository implements CartRepository {
  async add(params: CartAddItemParams): Promise<CartDetailed | null> {
    await db.insert(cartItems).values(params);

    const [foundCart] = await db
      .select()
      .from(carts)
      .where(eq(carts.id, params.cartId))
      .limit(1);

    if (!foundCart) {
      return null;
    }

    return parseItem(foundCart);
  }

  async find({ cartId }: CartFindParams): Promise<CartDetailed | null> {
    const foundItem = await db.query.carts.findFirst({
      where: eq(carts.id, cartId),
      with: {
        items: {
          with: {
            product: {
              columns: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
          columns: {
            id: true,
            quantity: true,
          },
        },
      },
      columns: {
        id: true,
        userId: true,
      },
    });

    const foundCart = await db
      .select({
        id: carts.id,
        userId: carts.userId,
        name: products.name,
        price: products.price,
        quantity: cartItems.quantity,
      })
      .from(cartItems)
      .innerJoin(cartItems, eq(cartItems.cartId, carts.id))
      .innerJoin(cartItems, eq(cartItems.productId, products.id));

    return { id: 20, userId: 10 };
  }

  async update({
    itemId,
    ...changes
  }: CartUpdateItemParams): Promise<CartDetailed | null> {
    const [updatedItem] = await db
      .update(cartItems)
      .set(changes)
      .where(eq(cartItems.id, itemId))
      .returning();

    if (!updatedItem) {
      return null;
    }

    const [foundCart] = await db
      .select()
      .from(carts)
      .where(eq(carts.id, updatedItem.cartId))
      .limit(1);

    if (!foundCart) {
      return null;
    }

    return parseItem(foundCart);
  }

  async remove({ itemId }: CartRemoveItemParams): Promise<CartDetailed | null> {
    const [deletedItem] = await db
      .delete(cartItems)
      .where(eq(cartItems.id, itemId))
      .returning();

    if (!deletedItem) {
      return null;
    }

    const [foundCart] = await db
      .select()
      .from(carts)
      .where(eq(carts.id, deletedItem.cartId))
      .limit(1);

    if (!foundCart) {
      return null;
    }

    return parseItem(foundCart);
  }

  async removeAll({
    cartId,
  }: CartRemoveAllParams): Promise<CartDetailed | null> {
    await db.delete(cartItems).where(eq(cartItems.cartId, cartId));

    const [foundCart] = await db
      .select()
      .from(carts)
      .where(eq(carts.id, cartId))
      .limit(1);

    if (!foundCart) {
      return null;
    }

    return parseItem(foundCart);
  }

  async fill(params: CartAddItemParams[]): Promise<CartDetailed | null> {
    if (params.length === 0) {
      return null;
    }

    await db.insert(cartItems).values(params).returning();

    const cartId = params[0]!.cartId;

    const [foundCart] = await db
      .select()
      .from(carts)
      .where(eq(carts.id, cartId))
      .limit(1);

    if (!foundCart) {
      return null;
    }

    return parseItem(foundCart);
  }

  async clear(): Promise<void> {
    await db.delete(carts);
  }
}
