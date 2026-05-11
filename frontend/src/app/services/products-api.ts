import { createApi } from '@reduxjs/toolkit/query/react';

import { API_ENDPOINTS } from '@/config/api-endpoints';
import type { Product } from '@/libs/types';

import { baseQuery } from './base-query';

export const productApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => API_ENDPOINTS.products,
    }),

    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `${API_ENDPOINTS.products}/${slug}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useLazyGetProductBySlugQuery,
  useLazyGetProductsQuery,
} = productApi;
