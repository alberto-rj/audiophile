import { z } from '@/config';

import type {
  CategoryCreateParamsSchema,
  CategoryFindManyParamsSchema,
  CategoryIdParamsSchema,
  CategorySlugParamsSchema,
  CategoryUpdateParamsSchema,
} from './category.params.schema';

export type CategoryIdParams = z.infer<typeof CategoryIdParamsSchema>;

export type CategorySlugParams = z.infer<typeof CategorySlugParamsSchema>;

export type CategoryCreateParams = z.infer<typeof CategoryCreateParamsSchema>;

export type CategoryUpdateParams = z.infer<typeof CategoryUpdateParamsSchema>;

export type CategoryFindManyParams = z.infer<
  typeof CategoryFindManyParamsSchema
>;
