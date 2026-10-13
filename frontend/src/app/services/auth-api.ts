import type {
  ApiAuthResponse,
  ApiAuthRegisterBody,
  ApiAuthLoginBody,
} from '@audiophile/shared';
import { createApi } from '@reduxjs/toolkit/query/react';

import { clearCredentials, setCredentials } from '@/app/features/auth';
import { setIsCartModalOpen } from '@/app/features/cart';
import { API_ENDPOINTS } from '@/config/api-endpoints';

import { baseQueryWithReauth } from './base-query';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation<ApiAuthResponse, ApiAuthRegisterBody>({
      query: (payload) => ({
        url: API_ENDPOINTS.register,
        method: 'POST',
        body: payload,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const {
          data: { user, accessToken },
        } = await queryFulfilled;

        dispatch(setCredentials({ user, accessToken }));
      },
    }),

    login: builder.mutation<ApiAuthResponse, ApiAuthLoginBody>({
      query: (payload) => ({
        url: API_ENDPOINTS.login,
        method: 'POST',
        body: payload,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const {
          data: { user, accessToken },
        } = await queryFulfilled;

        dispatch(setCredentials({ user, accessToken }));
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: API_ENDPOINTS.logout,
        method: 'POST',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;

        dispatch(setIsCartModalOpen(false));
        dispatch(clearCredentials());
      },
    }),

    refresh: builder.mutation<ApiAuthResponse, void>({
      query: () => ({
        url: API_ENDPOINTS.refresh,
        method: 'POST',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const {
          data: { user, accessToken },
        } = await queryFulfilled;

        dispatch(setCredentials({ user, accessToken }));
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
} = authApi;
