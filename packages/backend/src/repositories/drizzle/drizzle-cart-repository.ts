import type {
  CartAddItemParams,
  CartUpdateItemParams,
  CartRemoveItemParams,
  CartRemoveAllParams,
  CartIdParams,
  CartDetailed,
  CartItemDetailed,
  Product,
  CartUserIdParams,
  CartCreateParams,
} from '@audiophile/shared';
import { and, eq, sql } from 'drizzle-orm';

import { cartItems, carts, db } from '@/db/drizzle';
import { getProductItemSummary } from '@/helpers/product';

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

type DrizzleCart = Pick<CartDetailed, 'id' | 'userId'>;

const CART_COLUMNS = {
  id: true,
  userId: true,
} as const;

const CART_WITH = {
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
} as const;

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
  const { subtotal, shipping, vat, grandTotal } =
    getProductItemSummary(detailedItems);

  return {
    id,
    userId,
    subtotal,
    shipping,
    vat,
    grandTotal,
    items: detailedItems,
  };
}

function parseDrizzleCart({ id, userId }: DrizzleCart): CartDetailed {
  return toCartDetailed({ id, userId, items: [] });
}

export class DrizzleCartRepository implements CartRepository {
  async create({ userId }: CartCreateParams): Promise<CartDetailed> {
    const [createdCart] = await db.insert(carts).values({ userId }).returning();

    const { id } = createdCart!;

    return parseDrizzleCart({ id, userId });
  }

  async createMany(paramsList: CartCreateParams[]): Promise<CartDetailed[]> {
    const createdCarts = await db.insert(carts).values(paramsList).returning();

    const detailedCarts = createdCarts.map(({ id, userId }) =>
      parseDrizzleCart({ id, userId }),
    );

    return detailedCarts;
  }

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

  async find({ cartId }: CartIdParams): Promise<CartDetailed | null> {
    const foundCart = await db.query.carts.findFirst({
      where: eq(carts.id, cartId),
      columns: CART_COLUMNS,
      with: CART_WITH,
    });

    if (!foundCart) {
      return null;
    }

    return toCartDetailed(foundCart);
  }

  async findByUserId({
    userId,
  }: CartUserIdParams): Promise<CartDetailed | null> {
    const foundCart = await db.query.carts.findFirst({
      where: eq(carts.userId, userId),
      columns: CART_COLUMNS,
      with: CART_WITH,
    });

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
    const [updatedItem] = await db
      .update(cartItems)
      .set(changes)
      .where(and(eq(cartItems.id, itemId), eq(cartItems.cartId, cartId)))
      .returning({ cartId: cartItems.cartId });

    if (!updatedItem) {
      return null;
    }

    return this.find({ cartId: updatedItem.cartId });
  }

  async remove({
    itemId,
    cartId,
  }: CartRemoveItemParams): Promise<CartDetailed | null> {
    const [deletedItem] = await db
      .delete(cartItems)
      .where(and(eq(cartItems.id, itemId), eq(cartItems.cartId, cartId)))
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
    await db.transaction(async (tx) => {
      await tx.delete(cartItems);
      await tx.delete(carts);
    });
  }
}
