import type {
  CartAddItemParams,
  CartCreateParams,
  CartDetailed,
  CartIdParams,
  CartRemoveAllParams,
  CartRemoveItemParams,
  CartUpdateItemParams,
  CartUserIdParams,
} from '@audiophile/shared';

export interface CartRepository {
  create: (params: CartCreateParams) => Promise<CartDetailed>;

  createMany: (paramsList: CartCreateParams[]) => Promise<CartDetailed[]>;

  add: (params: CartAddItemParams) => Promise<CartDetailed | null>;

  find: (params: CartIdParams) => Promise<CartDetailed | null>;

  findByUserId: (params: CartUserIdParams) => Promise<CartDetailed | null>;

  update: (params: CartUpdateItemParams) => Promise<CartDetailed | null>;

  remove: (params: CartRemoveItemParams) => Promise<CartDetailed | null>;

  removeAll: (params: CartRemoveAllParams) => Promise<CartDetailed | null>;

  clear: () => Promise<void>;
}
