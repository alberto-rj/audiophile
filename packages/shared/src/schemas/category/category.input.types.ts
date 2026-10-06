import { z } from '@/config';

import type {
  CategoryCreateInputSchema,
  CategoryFindManyInputSchema,
  CategoryIdInputSchema,
  CategorySlugInputSchema,
  CategoryUpdateInputSchema,
} from './category.input.schema';

export type CategoryIdInput = z.infer<typeof CategoryIdInputSchema>;

export type CategorySlugInput = z.infer<typeof CategorySlugInputSchema>;

export type CategoryCreateInput = z.infer<typeof CategoryCreateInputSchema>;

export type CategoryUpdateInput = z.infer<typeof CategoryUpdateInputSchema>;

export type CategoryFindManyInput = z.infer<typeof CategoryFindManyInputSchema>;
