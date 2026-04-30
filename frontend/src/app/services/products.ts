import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { env } from '@/config/env';
import type { Product } from '@/libs/types';

const { VITE_API_BASE_URL } = env;

export const productApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${VITE_API_BASE_URL}/products` }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/',
    }),

    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `/${slug}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductBySlugQuery } = productApi;
