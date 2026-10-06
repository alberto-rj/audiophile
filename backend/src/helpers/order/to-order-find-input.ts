import { OrderFindInputSchema, type OrderFindInput } from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

export function toOrderFindInput(data: unknown) {
  return parseSchema<OrderFindInput>(OrderFindInputSchema, data);
}
