import { createApi } from '@reduxjs/toolkit/query/react';

import { API_ENDPOINTS } from '@/config/api-endpoints';
import type {
  AddCartItemPayload,
  CartResponse,
  RemoveCartItemPayload,
  UpdateCartItemQuantityPayload,
} from '@/libs/types';

import { baseQueryWithAuth } from './base-query';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, void>({
      query: () => API_ENDPOINTS.cart,
      providesTags: ['Cart'],
    }),

    addCartItem: builder.mutation<CartResponse, AddCartItemPayload>({
      query: (payload) => ({
        url: API_ENDPOINTS.cartItems,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Cart'],
    }),

    updateCartItemQuantity: builder.mutation<
      CartResponse,
      UpdateCartItemQuantityPayload
    >({
      query: ({ productId, quantity }) => ({
        url: `${API_ENDPOINTS.cartItems}/${productId}`,
        method: 'PATCH',
        body: { quantity },
      }),
      invalidatesTags: ['Cart'],
    }),

    removeCartItem: builder.mutation<CartResponse, RemoveCartItemPayload>({
      query: ({ productId }) => ({
        url: `${API_ENDPOINTS.cartItems}/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),

    clearCart: builder.mutation<CartResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.cart,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartItemMutation,
  useClearCartMutation,
  useRemoveCartItemMutation,
  useUpdateCartItemQuantityMutation,
  useLazyGetCartQuery,
} = cartApi;
