import {
  CartAddItemInputSchema,
  CartIdInputSchema,
  CartRemoveAllInputSchema,
  CartRemoveItemInputSchema,
  CartUpdateItemInputSchema,
  type CartAddItemInput,
  type CartIdInput,
  type CartRemoveAllInput,
  type CartRemoveItemInput,
  type CartUpdateItemInput,
  type CartUserIdInput,
  CartUserIdInputSchema,
  CartCreateInputSchema,
  type CartCreateInput,
} from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

export function toCartCreateInput(data: unknown) {
  return parseSchema<CartCreateInput>(CartCreateInputSchema, data);
}

export function toCartAddItemInput(data: unknown) {
  return parseSchema<CartAddItemInput>(CartAddItemInputSchema, data);
}

export function toCartUpdateItemInput(data: unknown) {
  return parseSchema<CartUpdateItemInput>(CartUpdateItemInputSchema, data);
}

export function toCartRemoveItemInput(data: unknown) {
  return parseSchema<CartRemoveItemInput>(CartRemoveItemInputSchema, data);
}

export function toCartRemoveAllInput(data: unknown) {
  return parseSchema<CartRemoveAllInput>(CartRemoveAllInputSchema, data);
}

export function toCartIdInput(data: unknown) {
  return parseSchema<CartIdInput>(CartIdInputSchema, data);
}

export function toCartUserIdInput(data: unknown) {
  return parseSchema<CartUserIdInput>(CartUserIdInputSchema, data);
}
