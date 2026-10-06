import { z } from '@/config';

import { UserIdSchema } from '../user/user.base.schema';
import {
  CartAddItemParamsSchema,
  CartFindManyItemsParamsSchema,
  CartFindOrCreateByUserIdParamsSchema,
  CartFindParamsSchema,
  CartRemoveAllParamsSchema,
  CartRemoveItemParamsSchema,
  CartUpdateItemParamsSchema,
} from './cart.params.schema';

export const CartFindManyItemsInputSchema =
  CartFindManyItemsParamsSchema.extend({});

export const CartAddItemInputSchema = CartAddItemParamsSchema.extend({
  userId: UserIdSchema,
});

export const CartFindInputSchema = CartFindParamsSchema.extend({});

export const CartFindOrCreateByUserIdInputSchema =
  CartFindOrCreateByUserIdParamsSchema.extend({});

export const CartUpdateItemInputSchema = CartUpdateItemParamsSchema.extend({
  userId: UserIdSchema,
});

export const CartRemoveItemInputSchema = CartRemoveItemParamsSchema.extend({});

export const CartRemoveAllInputSchema = CartRemoveAllParamsSchema.extend({
  userId: UserIdSchema,
});

export const CartGetInputSchema = z.object({
  userId: UserIdSchema,
});
