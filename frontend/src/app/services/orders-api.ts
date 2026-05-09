import { createApi } from '@reduxjs/toolkit/query/react';

import type {
  CreateOrderPayload,
  OrderListResponse,
  OrderResponse,
} from '@/libs/types';

import { baseQueryWithAuth } from './base-query';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Order'],

  endpoints: (builder) => ({
    getOrders: builder.query<OrderListResponse, void>({
      query: () => '/orders',
      providesTags: ['Order'],
    }),

    getOrderById: builder.query<OrderResponse, number>({
      query: (id) => `/orders/${id}`,
      providesTags: (_, __, id) => [{ type: 'Order', id }],
    }),

    createOrder: builder.mutation<OrderResponse, CreateOrderPayload>({
      query: (payload) => ({
        url: '/orders',
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
} = ordersApi;
