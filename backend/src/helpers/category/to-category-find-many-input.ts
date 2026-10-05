import {
  CategoryFindManyInputSchema,
  type CategoryFindManyInput,
} from '@/schemas';

import { parseSchema } from '../parse-schema';

export function toCategoryFindManyInput(data: unknown): CategoryFindManyInput {
  return parseSchema(CategoryFindManyInputSchema, data);
}
