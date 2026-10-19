import type {
  ApiOrderCreateBody,
  ApiOrderListingQuery,
  ApiOrderPaginationResponse,
  ApiOrderResultListResponse,
} from '@audiophile/shared';
import { createApi } from '@reduxjs/toolkit/query/react';

import { API_ENDPOINTS } from '@/config/api-endpoints';

import { baseQueryWithReauth } from './base-query';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Order'],

  endpoints: (builder) => ({
    getOrders: builder.query<
      ApiOrderPaginationResponse,
      Partial<ApiOrderListingQuery> | undefined
    >({
      query: (filters) => {
        return {
          url: API_ENDPOINTS.orders,
          method: 'GET',
          params: filters ? filters : undefined,
        };
      },
      providesTags: ['Order'],
    }),

    getOrderById: builder.query<ApiOrderResultListResponse, number>({
      query: (id) => `${API_ENDPOINTS.orders}/${id}`,
      providesTags: (_, __, id) => [{ type: 'Order', id }],
    }),

    createOrder: builder.mutation<
      ApiOrderResultListResponse,
      ApiOrderCreateBody
    >({
      query: (payload) => ({
        url: API_ENDPOINTS.orders,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetOrdersQuery,
  useLazyGetOrderByIdQuery,
  useLazyGetOrdersQuery,
} = ordersApi;
