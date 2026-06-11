import { z } from '@/config';

import { CategoryNameSchema } from '../category/category.base.schema';
import { ResponsiveImageSchema } from '../common/common.schema';
import { ApiGallerySchema } from './gallery.api.schema';
import { ApiIncludeSchema } from './include.api.schema';
import {
  ProductDescriptionSchema,
  ProductFeaturesSchema,
  ProductIdSchema,
  ProductIsNewSchema,
  ProductNameSchema,
  ProductPriceSchema,
  ProductSlugSchema,
} from './product.base.schema';
import { ProductBaseSchema } from './product.schema';

export const ApiProductSchema = z.object({
  id: ProductIdSchema,
  slug: ProductSlugSchema,
  name: ProductNameSchema,
  isNew: ProductIsNewSchema,
  price: ProductPriceSchema,
  description: ProductDescriptionSchema,
  features: ProductFeaturesSchema,
  category: CategoryNameSchema,
  image: ResponsiveImageSchema,
  categoryImage: ResponsiveImageSchema,
  includes: z.array(ApiIncludeSchema),
  gallery: ApiGallerySchema,
  others: z.array(ProductBaseSchema),
});
