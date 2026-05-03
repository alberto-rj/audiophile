import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

import { clearCredentials, setCredentials } from '@/app/features/auth';
import { env } from '@/config/env';
import type { LoginFormData, RegisterFormData } from '@/libs/schemas';
import type { AuthResponse } from '@/libs/types';

const { VITE_API_BASE_URL } = env;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${VITE_API_BASE_URL}/auth`,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterFormData>({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const {
          data: { user, accessToken },
        } = await queryFulfilled;

        dispatch(setCredentials({ user, accessToken }));
      },
    }),

    login: builder.mutation<AuthResponse, LoginFormData>({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
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
        url: '/logout',
        method: 'POST',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;

        dispatch(clearCredentials());
      },
    }),

    refresh: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: '/refresh',
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
