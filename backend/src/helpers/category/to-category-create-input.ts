import {
  CategoryCreateInputSchema,
  type CategoryCreateInput,
} from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

export function toCategoryCreateInput(data: unknown): CategoryCreateInput {
  return parseSchema(CategoryCreateInputSchema, data);
}
