import { createApi } from '@reduxjs/toolkit/query/react';

import { API_ENDPOINTS } from '@/config/api-endpoints';
import type { ProductListResponse, ProductResponse } from '@/libs/types';

import { baseQuery } from './base-query';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query<ProductListResponse, void>({
      query: () => API_ENDPOINTS.products,
    }),

    getProductBySlug: builder.query<ProductResponse, string>({
      query: (slug) => `${API_ENDPOINTS.products}/${slug}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useLazyGetProductBySlugQuery,
  useLazyGetProductsQuery,
} = productsApi;
