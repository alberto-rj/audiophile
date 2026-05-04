import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { env } from '@/config/env';
import type { CreateOrderPayload, CreateOrderResponse } from '@/libs/types';

const { VITE_API_BASE_URL } = env;

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${VITE_API_BASE_URL}/orders` }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, CreateOrderPayload>({
      query: (payload) => ({
        url: '/',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApi;
