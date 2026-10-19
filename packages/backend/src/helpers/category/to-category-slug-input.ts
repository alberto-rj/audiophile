import {
  CategorySlugInputSchema,
  type CategorySlugInput,
} from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

export function toCategorySlugInput(data: unknown): CategorySlugInput {
  return parseSchema(CategorySlugInputSchema, data);
}
