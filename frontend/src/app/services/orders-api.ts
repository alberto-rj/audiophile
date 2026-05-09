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

  endpoints: (builder) => ({
    getOrders: builder.query<OrderListResponse, void>({
      query: () => '/orders/',
    }),

    getOrderById: builder.query<OrderResponse, number>({
      query: (id) => `/orders/${id}`,
    }),

    createOrder: builder.mutation<OrderResponse, CreateOrderPayload>({
      query: (payload) => ({
        url: '/orders',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetOrdersQuery,
} = ordersApi;
