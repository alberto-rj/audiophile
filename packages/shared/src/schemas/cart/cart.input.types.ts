import type { z } from '@/config';

import {
  CartAddItemInputSchema,
  CartCreateInputSchema,
  CartFindManyItemsInputSchema,
  CartIdInputSchema,
  CartRemoveAllInputSchema,
  CartRemoveItemInputSchema,
  CartUpdateItemInputSchema,
  CartUserIdInputSchema,
} from './cart.input.schema';

export type CartCreateInput = z.infer<typeof CartCreateInputSchema>;

export type CartAddItemInput = z.infer<typeof CartAddItemInputSchema>;

export type CartUpdateItemInput = z.infer<typeof CartUpdateItemInputSchema>;

export type CartRemoveItemInput = z.infer<typeof CartRemoveItemInputSchema>;

export type CartRemoveAllInput = z.infer<typeof CartRemoveAllInputSchema>;

export type CartIdInput = z.infer<typeof CartIdInputSchema>;

export type CartUserIdInput = z.infer<typeof CartUserIdInputSchema>;

export type CartFindManyItemsInput = z.infer<
  typeof CartFindManyItemsInputSchema
>;
