import type { z } from '@/config';

import {
  ProductBaseSchema,
  ProductDetailedSchema,
  ProductSchema,
} from './product.schema';
import type {
  ProductDescriptionSchema,
  ProductFeaturesSchema,
  ProductIdSchema,
  ProductImageSchema,
  ProductIsNewSchema,
  ProductNameSchema,
  ProductPriceSchema,
  ProductSlugSchema,
} from './product.base.schema';
import type {
  ApiProductCreateBodySchema,
  ApiProductFindManyQuerySchema,
  ApiProductIdParamsSchema,
  ApiProductSlugParamsSchema,
} from './product.api.schema';
import type { ApiProductSlugParams } from './product.api.types';

export type ProductId = z.infer<typeof ProductIdSchema>;

export type ProductSlug = z.infer<typeof ProductSlugSchema>;

export type ProductImage = z.infer<typeof ProductImageSchema>;

export type ProductName = z.infer<typeof ProductNameSchema>;

export type ProductDescription = z.infer<typeof ProductDescriptionSchema>;

export type ProductFeatures = z.infer<typeof ProductFeaturesSchema>;

export type ProductIsNew = z.infer<typeof ProductIsNewSchema>;

export type ProductPrice = z.infer<typeof ProductPriceSchema>;

export type ProductBase = z.infer<typeof ProductBaseSchema>;

export type Product = z.infer<typeof ProductSchema>;

export type ProductDetailed = z.infer<typeof ProductDetailedSchema>;

export type ProductCreateParams = z.infer<typeof ApiProductCreateBodySchema> &
  ApiProductSlugParams;

export type ProductDeleteByIdParams = z.infer<typeof ApiProductIdParamsSchema>;

export type ProductDeleteBySlugParams = z.infer<
  typeof ApiProductSlugParamsSchema
>;

export type ProductFindByIdParams = z.infer<typeof ApiProductIdParamsSchema>;

export type ProductFindBySlugParams = z.infer<
  typeof ApiProductSlugParamsSchema
>;

export type ProductFindManyParams = z.infer<
  typeof ApiProductFindManyQuerySchema
>;
