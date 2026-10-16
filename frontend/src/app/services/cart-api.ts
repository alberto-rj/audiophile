import type {
  ApiCartAddItemBody,
  ApiCartResultListResponse,
} from '@audiophile/shared';
import { createApi } from '@reduxjs/toolkit/query/react';

import { API_ENDPOINTS } from '@/config/api-endpoints';
import type {
  RemoveCartItemPayload,
  UpdateCartItemQuantityPayload,
} from '@/libs/types';

import { baseQueryWithReauth } from './base-query';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query<ApiCartResultListResponse, void>({
      query: () => API_ENDPOINTS.cart,
      providesTags: ['Cart'],
    }),

    addCartItem: builder.mutation<
      ApiCartResultListResponse,
      ApiCartAddItemBody
    >({
      query: (payload) => ({
        url: API_ENDPOINTS.cart,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Cart'],
    }),

    updateCartItemQuantity: builder.mutation<
      ApiCartResultListResponse,
      UpdateCartItemQuantityPayload
    >({
      query: ({ itemId, quantity }) => ({
        url: `${API_ENDPOINTS.cart}/${itemId}`,
        method: 'PATCH',
        body: { quantity },
      }),
      invalidatesTags: ['Cart'],
    }),

    removeCartItem: builder.mutation<
      ApiCartResultListResponse,
      RemoveCartItemPayload
    >({
      query: ({ itemId }) => ({
        url: `${API_ENDPOINTS.cart}/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),

    clearCart: builder.mutation<ApiCartResultListResponse, void>({
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
