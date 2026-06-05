import { z } from '@/config';

import {
  CategorySchema,
  CategoryDescriptionSchema,
  CategoryIdSchema,
  CategoryImageSchema,
  CategoryNameSchema,
  CategorySlugSchema,
} from './category.schema';

export type CategoryId = z.infer<typeof CategoryIdSchema>;

export type CategorySlug = z.infer<typeof CategorySlugSchema>;

export type CategoryImage = z.infer<typeof CategoryImageSchema>;

export type CategoryName = z.infer<typeof CategoryNameSchema>;

export type CategoryDescription = z.infer<typeof CategoryDescriptionSchema>;

export type Category = z.infer<typeof CategorySchema>;
