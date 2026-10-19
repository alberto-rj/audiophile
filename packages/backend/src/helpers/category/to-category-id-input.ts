import {
  CategoryIdInputSchema,
  type CategoryIdInput,
} from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

export function toCategoryIdInput(data: unknown): CategoryIdInput {
  return parseSchema(CategoryIdInputSchema, data);
}
