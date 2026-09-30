import { OrderFindInputSchema, type OrderFindInput } from '@/schemas';

import { parseSchema } from '../parse-schema';

export function toOrderFindInput(data: unknown) {
  return parseSchema<OrderFindInput>(OrderFindInputSchema, data);
}
