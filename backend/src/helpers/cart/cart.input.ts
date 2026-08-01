import {
  CartAddItemInputSchema,
  CartFindOrCreateByUserIdInputSchema,
  CartFindInputSchema,
  CartGetInputSchema,
  CartRemoveAllInputSchema,
  CartRemoveItemInputSchema,
  CartUpdateItemInputSchema,
  type CartAddItemInput,
  type CartFindOrCreateByUserIdInput,
  type CartFindInput,
  type CartRemoveAllInput,
  type CartRemoveItemInput,
  type CartUpdateItemInput,
  type CartGetInput,
} from '@/schemas';

import { parseSchema } from '../parse-schema';

export function toCartAddItemInput(data: unknown) {
  return parseSchema<CartAddItemInput>(CartAddItemInputSchema, data);
}

export function toCartUpdateItemInput(data: unknown) {
  return parseSchema<CartUpdateItemInput>(CartUpdateItemInputSchema, data);
}

export function toCartFindInput(data: unknown) {
  return parseSchema<CartFindInput>(CartFindInputSchema, data);
}

export function toCartFindOrCreateByUserIdInput(data: unknown) {
  return parseSchema<CartFindOrCreateByUserIdInput>(
    CartFindOrCreateByUserIdInputSchema,
    data,
  );
}

export function toCartRemoveItemInput(data: unknown) {
  return parseSchema<CartRemoveItemInput>(CartRemoveItemInputSchema, data);
}

export function toCartGetInput(data: unknown) {
  return parseSchema<CartGetInput>(CartGetInputSchema, data);
}

export function toCartRemoveAllInput(data: unknown) {
  return parseSchema<CartRemoveAllInput>(CartRemoveAllInputSchema, data);
}
