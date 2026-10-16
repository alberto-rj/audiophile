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

export const CartAddItemInputSchema = CartAddItemParamsSchema.extend({
  userId: UserIdSchema,
});

export const CartIdInputSchema = CartIdParamsSchema.extend({});

export const CartUserIdInputSchema = CartUserIdParamsSchema.extend({});

export const CartUpdateItemInputSchema = CartUpdateItemParamsSchema.extend({
  userId: UserIdSchema,
});

export const CartFindManyItemsInputSchema =
  CartFindManyItemsParamsSchema.extend({});

export const CartRemoveItemInputSchema = CartRemoveItemParamsSchema.extend({});

export const CartRemoveAllInputSchema = CartRemoveAllParamsSchema.extend({
  userId: UserIdSchema,
});
