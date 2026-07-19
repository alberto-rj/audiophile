import { eq } from 'drizzle-orm';

import { getCartSummary } from '@/helpers';
import type {
  CartAddItemParams,
  CartUpdateItemParams,
  CartRemoveItemParams,
  CartRemoveAllParams,
  CartFindParams,
  CartDetailed,
  CartId,
  UserId,
  ProductId,
  CartItemId,
  ProductPrice,
  ProductSlug,
  ProductName,
  CartItemQuantity,
  CartItemDetailed,
  ProductImage,
} from '@/schemas';
import { cartItems, carts, db } from '@/db/drizzle';

import type { CartRepository } from '../types/cart-repository.types';

type DrizzleCartItemDetailed = {
  id: CartItemId;
  quantity: CartItemQuantity;
  product: {
    id: ProductId;
    name: ProductName;
    slug: ProductSlug;
    image: ProductImage;
    price: ProductPrice;
  };
};

type DrizzleCartDetailed = {
  id: CartId;
  userId: UserId;
  items: DrizzleCartItemDetailed[];
};

function toCartItemDetailed(
  rawItem: DrizzleCartItemDetailed,
): CartItemDetailed {
  const {
    id,
    product: { id: productId, name, price, slug, image },
    quantity,
  } = rawItem;

  return {
    id,
    name,
    price,
    slug,
    image,
    quantity,
    productId,
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
  async add(params: CartAddItemParams): Promise<CartDetailed | null> {
    await db.insert(cartItems).values(params);

    return this.find({ cartId: params.cartId });
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

    return this.find({ cartId: updatedItem.cartId });
  }

  async remove({ itemId }: CartRemoveItemParams): Promise<CartDetailed | null> {
    const [deletedItem] = await db
      .delete(cartItems)
      .where(eq(cartItems.id, itemId))
      .returning();

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

  async fill(params: CartAddItemParams[]): Promise<CartDetailed | null> {
    if (params.length === 0) {
      return null;
    }

    await db.insert(cartItems).values(params).returning();

    const cartId = params[0]!.cartId;

    return this.find({ cartId });
  }

  async clear(): Promise<void> {
    await db.delete(carts);
  }
}
