import type { z } from '@/config';

import {
  CartAddItemParamsSchema,
  CartCreateParamsSchema,
  CartFindManyItemsParamsSchema,
  CartFindOrCreateByUserIdParamsSchema,
  CartIdParamsSchema,
  CartRemoveAllParamsSchema,
  CartRemoveItemParamsSchema,
  CartUpdateItemParamsSchema,
  CartUserIdParamsSchema,
} from './cart.params.schema';

export type CartCreateParams = z.infer<typeof CartCreateParamsSchema>;

export type CartAddItemParams = z.infer<typeof CartAddItemParamsSchema>;

export type CartUpdateItemParams = z.infer<typeof CartUpdateItemParamsSchema>;

export type CartRemoveItemParams = z.infer<typeof CartRemoveItemParamsSchema>;

export type CartRemoveAllParams = z.infer<typeof CartRemoveAllParamsSchema>;

export type CartIdParams = z.infer<typeof CartIdParamsSchema>;

export type CartUserIdParams = z.infer<typeof CartUserIdParamsSchema>;

export type CartFindOrCreateByUserIdParams = z.infer<
  typeof CartFindOrCreateByUserIdParamsSchema
>;

export type CartFindManyItemsParams = z.infer<
  typeof CartFindManyItemsParamsSchema
>;
