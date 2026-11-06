import {
  OrderCreateInputSchema,
  OrderFindInputSchema,
  OrderFindManyInputSchema,
  type OrderCreateInput,
  type OrderFindInput,
  type OrderFindManyInput,
} from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

export function toOrderCreateInput(data: unknown) {
  return parseSchema<OrderCreateInput>(OrderCreateInputSchema, data);
}

export function toOrderFindInput(data: unknown) {
  return parseSchema<OrderFindInput>(OrderFindInputSchema, data);
}

export function toOrderFindManyInput(data: unknown) {
  return parseSchema<OrderFindManyInput>(OrderFindManyInputSchema, data);
}
