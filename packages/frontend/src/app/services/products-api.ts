import type {
  ApiProductFindManyQuery,
  ApiProductPaginationResponse,
  ApiProductResultListResponse,
} from '@audiophile/shared';
import { createApi } from '@reduxjs/toolkit/query/react';

import { API_ENDPOINTS } from '@/config/api-endpoints';

import { baseQuery } from './base-query';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query<
      ApiProductPaginationResponse,
      Partial<ApiProductFindManyQuery> | undefined
    >({
      query: (filters) => {
        return {
          url: API_ENDPOINTS.products,
          method: 'GET',
          params: filters ? filters : undefined,
        };
      },
    }),

    getProductBySlug: builder.query<ApiProductResultListResponse, string>({
      query: (slug) => {
        return {
          url: `${API_ENDPOINTS.products}/${slug}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useLazyGetProductBySlugQuery,
  useLazyGetProductsQuery,
} = productsApi;
