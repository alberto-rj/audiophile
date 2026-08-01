import type {
  CartAddItemParams,
  CartDetailed,
  CartFindOrCreateByUserIdParams,
  CartFindParams,
  CartRemoveAllParams,
  CartRemoveItemParams,
  CartUpdateItemParams,
} from '@/schemas';

export interface CartRepository {
  add: (params: CartAddItemParams) => Promise<CartDetailed | null>;

  find: (params: CartFindParams) => Promise<CartDetailed | null>;

  findOrCreateByUserId: (
    params: CartFindOrCreateByUserIdParams,
  ) => Promise<CartDetailed>;

  update: (params: CartUpdateItemParams) => Promise<CartDetailed | null>;

  remove: (params: CartRemoveItemParams) => Promise<CartDetailed | null>;

  removeAll: (params: CartRemoveAllParams) => Promise<CartDetailed | null>;

  clear: () => Promise<void>;
}
