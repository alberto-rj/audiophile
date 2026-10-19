import {
  OrderCreateInputSchema,
  type OrderCreateInput,
} from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

export function toOrderCreateInput(data: unknown) {
  return parseSchema<OrderCreateInput>(OrderCreateInputSchema, data);
}
