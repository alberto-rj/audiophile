import type { z } from '@/config';

import { ProductDetailedSchema, ProductSchema } from './product.schema';

export type Product = z.infer<typeof ProductSchema>;

export type ProductDetailed = z.infer<typeof ProductDetailedSchema>;
