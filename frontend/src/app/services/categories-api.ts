import { createApi } from '@reduxjs/toolkit/query/react';

import type { Category, CategoryList } from '@/libs/types';
import { API_ENDPOINTS } from '@/config/api-endpoints';

import { baseQuery } from './base-query';

export const categoryApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => `${API_ENDPOINTS.categories}`,
    }),

    getCategoryBySlug: builder.query<Category, string>({
      query: (slug) => `${API_ENDPOINTS.categories}/${slug}`,
    }),

    getProductsByCategorySlug: builder.query<CategoryList, string>({
      query: (slug) =>
        `${API_ENDPOINTS.categories}/${slug}${API_ENDPOINTS.products}`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryBySlugQuery,
  useGetProductsByCategorySlugQuery,
} = categoryApi;
