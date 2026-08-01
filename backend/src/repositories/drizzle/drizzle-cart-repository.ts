import { eq, sql } from 'drizzle-orm';

import { getCartSummary } from '@/helpers';
import type {
  CartAddItemParams,
  CartUpdateItemParams,
  CartRemoveItemParams,
  CartRemoveAllParams,
  CartFindParams,
  CartDetailed,
  CartItemDetailed,
  CartFindOrCreateByUserIdParams,
  Product,
} from '@/schemas';
import { cartItems, carts, db } from '@/db/drizzle';

import type { CartRepository } from '../types/cart-repository.types';

type DrizzleCartItemDetailed = Pick<
  CartItemDetailed,
  'id' | 'cartId' | 'quantity'
> & {
  product: Pick<Product, 'id' | 'name' | 'slug' | 'image' | 'price'>;
};

type DrizzleCartDetailed = Pick<CartDetailed, 'id' | 'userId'> & {
  items: DrizzleCartItemDetailed[];
};

function toCartItemDetailed(
  rawItem: DrizzleCartItemDetailed,
): CartItemDetailed {
  const {
    id,
    cartId,
    quantity,
    product: { id: productId, name, price, slug, image },
  } = rawItem;

  return {
    id,
    cartId,
    productId,
    name,
    price,
    slug,
    image,
    quantity,
  };
}

function toCartDetailed(rawCart: DrizzleCartDetailed): CartDetailed {
  const { id, items, userId } = rawCart;
  const detailedItems = items.map(toCartItemDetailed);

  return {
    id,
    userId,
    items: detailedItems,
    ...getCartSummary(detailedItems),
  };
}

export class DrizzleCartRepository implements CartRepository {
  async add({
    cartId,
    productId,
    quantity,
  }: CartAddItemParams): Promise<CartDetailed | null> {
    await db
      .insert(cartItems)
      .values({ cartId, productId, quantity })
      .onConflictDoUpdate({
        target: [cartItems.cartId, cartItems.productId],
        set: {
          quantity: sql`${cartItems.quantity} + excluded.quantity`,
        },
      });

    return this.find({ cartId });
  }

  async find({ cartId }: CartFindParams): Promise<CartDetailed | null> {
    const foundCart = await db.query.carts.findFirst({
      where: eq(carts.id, cartId),
      columns: {
        id: true,
        userId: true,
      },
      with: {
        items: {
          columns: {
            id: true,
            cartId: true,
            quantity: true,
          },
          with: {
            product: {
              columns: {
                id: true,
                name: true,
                price: true,
                slug: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!foundCart) {
      return null;
    }

    return toCartDetailed(foundCart);
  }

  async findOrCreateByUserId({
    userId,
  }: CartFindOrCreateByUserIdParams): Promise<CartDetailed> {
    const [foundBaseCart] = await db
      .select({ id: carts.id })
      .from(carts)
      .where(eq(carts.userId, userId));

    if (foundBaseCart) {
      const foundCart = await this.find({ cartId: foundBaseCart.id });
      return foundCart!;
    }

    const [createdCart] = await db
      .insert(carts)
      .values({ userId })
      .onConflictDoUpdate({
        target: carts.userId,
        set: { userId: sql`excluded.user_id` },
      })
      .returning({ id: carts.id, userId: carts.userId });

    const foundCart = await this.find({ cartId: createdCart!.id });

    return foundCart!;
  }

  async update({
    itemId,
    ...changes
  }: CartUpdateItemParams): Promise<CartDetailed | null> {
    const [updatedItem] = await db
      .update(cartItems)
      .set(changes)
      .where(eq(cartItems.id, itemId))
      .returning({ cartId: cartItems.cartId });

    if (!updatedItem) {
      return null;
    }

    return this.find({ cartId: updatedItem.cartId });
  }

  async remove({ itemId }: CartRemoveItemParams): Promise<CartDetailed | null> {
    const [deletedItem] = await db
      .delete(cartItems)
      .where(eq(cartItems.id, itemId))
      .returning({ cartId: cartItems.cartId });

    if (!deletedItem) {
      return null;
    }

    return this.find({ cartId: deletedItem.cartId });
  }

  async removeAll({
    cartId,
  }: CartRemoveAllParams): Promise<CartDetailed | null> {
    await db.delete(cartItems).where(eq(cartItems.cartId, cartId));

    return this.find({ cartId });
  }

  async clear(): Promise<void> {
    await db.delete(cartItems);
    await db.delete(carts);
  }
}
