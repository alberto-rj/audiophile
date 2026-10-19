import { UserIdSchema } from '../user/user.base.schema';
import {
  CartAddItemParamsSchema,
  CartCreateParamsSchema,
  CartFindManyItemsParamsSchema,
  CartIdParamsSchema,
  CartRemoveAllParamsSchema,
  CartRemoveItemParamsSchema,
  CartUpdateItemParamsSchema,
  CartUserIdParamsSchema,
} from './cart.params.schema';

export const CartCreateInputSchema = CartCreateParamsSchema.extend({});

export const CartAddItemInputSchema = CartAddItemParamsSchema.omit({
  cartId: true,
}).extend({
  userId: UserIdSchema,
});

export const CartIdInputSchema = CartIdParamsSchema.extend({});

export const CartUserIdInputSchema = CartUserIdParamsSchema.extend({});

export const CartUpdateItemInputSchema = CartUpdateItemParamsSchema.omit({
  cartId: true,
}).extend({
  userId: UserIdSchema,
});

export const CartRemoveItemInputSchema = CartRemoveItemParamsSchema.omit({
  cartId: true,
}).extend({
  userId: UserIdSchema,
});

export const CartRemoveAllInputSchema = CartRemoveAllParamsSchema.omit({
  cartId: true,
}).extend({
  userId: UserIdSchema,
});

export const CartFindManyItemsInputSchema = CartFindManyItemsParamsSchema.omit({
  cartId: true,
}).extend({
  userId: UserIdSchema,
});
