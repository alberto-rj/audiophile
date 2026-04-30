import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { env } from '@/config/env';
import type { Category, CategoryList } from '@/libs/types';

const { VITE_API_BASE_URL } = env;

export const categoryApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${VITE_API_BASE_URL}/categories` }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => '/',
    }),

    getCategoryBySlug: builder.query<Category, string>({
      query: (slug) => `/${slug}`,
    }),

    getProductsByCategorySlug: builder.query<CategoryList, string>({
      query: (slug) => `/${slug}/products`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryBySlugQuery,
  useGetProductsByCategorySlugQuery,
} = categoryApi;
