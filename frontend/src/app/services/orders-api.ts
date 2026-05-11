import { createApi } from '@reduxjs/toolkit/query/react';

import type {
  CreateOrderPayload,
  OrderListResponse,
  OrderResponse,
} from '@/libs/types';

import { API_ENDPOINTS } from '@/config/api-endpoints';

import { baseQueryWithReauth } from './base-query';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Order'],

  endpoints: (builder) => ({
    getOrders: builder.query<OrderListResponse, void>({
      query: () => API_ENDPOINTS.orders,
      providesTags: ['Order'],
    }),

    getOrderById: builder.query<OrderResponse, number>({
      query: (id) => `${API_ENDPOINTS.orders}/${id}`,
      providesTags: (_, __, id) => [{ type: 'Order', id }],
    }),

    createOrder: builder.mutation<OrderResponse, CreateOrderPayload>({
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
