import type { z } from '@/config';

import {
  CartAddItemInputSchema,
  CartFindManyItemsInputSchema,
  CartFindOrCreateByUserIdInputSchema,
  CartFindInputSchema,
  CartRemoveAllInputSchema,
  CartRemoveItemInputSchema,
  CartUpdateItemInputSchema,
  CartGetInputSchema,
} from './cart.input.schema';

export type CartAddItemInput = z.infer<typeof CartAddItemInputSchema>;

export type CartUpdateItemInput = z.infer<typeof CartUpdateItemInputSchema>;

export type CartRemoveItemInput = z.infer<typeof CartRemoveItemInputSchema>;

export type CartRemoveAllInput = z.infer<typeof CartRemoveAllInputSchema>;

export type CartGetInput = z.infer<typeof CartGetInputSchema>;

export type CartFindInput = z.infer<typeof CartFindInputSchema>;

export type CartFindOrCreateByUserIdInput = z.infer<
  typeof CartFindOrCreateByUserIdInputSchema
>;

export type CartFindManyItemsInput = z.infer<
  typeof CartFindManyItemsInputSchema
>;
