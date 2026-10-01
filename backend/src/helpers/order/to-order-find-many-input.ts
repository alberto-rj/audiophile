import { OrderFindManyInputSchema, type OrderFindManyInput } from '@/schemas';

import { parseSchema } from '../parse-schema';

export function toOrderFindManyInput(data: unknown) {
  return parseSchema<OrderFindManyInput>(OrderFindManyInputSchema, data);
}
