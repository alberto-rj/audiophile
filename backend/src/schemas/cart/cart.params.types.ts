import type { z } from '@/config';

import {
  CartAddItemParamsSchema,
  CartFindManyItemsParamsSchema,
  CartFindParamsSchema,
  CartRemoveAllParamsSchema,
  CartRemoveItemParamsSchema,
  CartUpdateItemParamsSchema,
} from './cart.params.schema';

export type CartAddItemParams = z.infer<typeof CartAddItemParamsSchema>;

export type CartUpdateItemParams = z.infer<typeof CartUpdateItemParamsSchema>;

export type CartRemoveItemParams = z.infer<typeof CartRemoveItemParamsSchema>;

export type CartRemoveAllParams = z.infer<typeof CartRemoveAllParamsSchema>;

export type CartFindParams = z.infer<typeof CartFindParamsSchema>;

export type CartFindManyItemsParams = z.infer<
  typeof CartFindManyItemsParamsSchema
>;
