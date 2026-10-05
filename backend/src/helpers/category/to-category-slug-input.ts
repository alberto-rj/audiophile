import { CategorySlugInputSchema, type CategorySlugInput } from '@/schemas';

import { parseSchema } from '../parse-schema';

export function toCategorySlugInput(data: unknown): CategorySlugInput {
  return parseSchema(CategorySlugInputSchema, data);
}
