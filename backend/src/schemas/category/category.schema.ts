import { z } from '@/config';

import {
  CategoryDescriptionSchema,
  CategoryIdSchema,
  CategoryImageSchema,
  CategoryNameSchema,
  CategorySlugSchema,
} from './category.base.schema';

export const CategorySchema = z.object({
  id: CategoryIdSchema,
  slug: CategorySlugSchema,
  image: CategoryImageSchema,
  name: CategoryNameSchema,
  description: CategoryDescriptionSchema,
});
