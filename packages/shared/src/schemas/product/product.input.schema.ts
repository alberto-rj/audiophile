import {
  ProductCreateParamsSchema,
  ProductFindManyParamsSchema,
  ProductIdParamsSchema,
  ProductSlugParamsSchema,
} from './product.params.schema';

export const ProductCreateInputSchema = ProductCreateParamsSchema.extend({});

export const ProductIdInputSchema = ProductIdParamsSchema.extend({});

export const ProductSlugInputSchema = ProductSlugParamsSchema.extend({});

export const ProductFindManyInputSchema = ProductFindManyParamsSchema.extend(
  {},
);
