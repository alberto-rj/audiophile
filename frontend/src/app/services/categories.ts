import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Category, CategoryList } from '@/libs/types';

export const categoryApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/categories' }),
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
