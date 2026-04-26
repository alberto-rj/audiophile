import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Product } from '@/libs/types';

export const productApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/products' }),
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
