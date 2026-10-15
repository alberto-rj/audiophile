import type {
  ApiCategoryPaginationResponse,
  ApiCategoryResultListResponse,
} from '@audiophile/shared';
import { createApi } from '@reduxjs/toolkit/query/react';

import { API_ENDPOINTS } from '@/config/api-endpoints';

import { baseQuery } from './base-query';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCategories: builder.query<ApiCategoryPaginationResponse, void>({
      query: () => `${API_ENDPOINTS.categories}`,
    }),

    getCategoryBySlug: builder.query<ApiCategoryResultListResponse, string>({
      query: (slug) => `${API_ENDPOINTS.categories}/${slug}`,
    }),

    getCategoryProducts: builder.query<ApiCategoryResultListResponse, string>({
      query: (slug) =>
        `${API_ENDPOINTS.categories}/${slug}${API_ENDPOINTS.products}`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryBySlugQuery,
  useGetCategoryProductsQuery,
} = categoriesApi;
