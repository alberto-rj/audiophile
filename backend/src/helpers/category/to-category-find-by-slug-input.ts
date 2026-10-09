import {
  CategoryFindBySlugInputSchema,
  type CategoryFindBySlugInput,
} from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

export function toCategoryFindBySlugInput(
  data: unknown,
): CategoryFindBySlugInput {
  return parseSchema(CategoryFindBySlugInputSchema, data);
}
