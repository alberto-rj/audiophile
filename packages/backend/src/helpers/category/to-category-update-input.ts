import {
  CategoryUpdateInputSchema,
  type CategoryUpdateInput,
} from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

export function toCategoryUpdateInput(data: unknown): CategoryUpdateInput {
  return parseSchema(CategoryUpdateInputSchema, data);
}
