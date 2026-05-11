import { createApi } from '@reduxjs/toolkit/query/react';

import { setUser } from '@/app/features/auth';
import { API_ENDPOINTS } from '@/config/api-endpoints';
import type { ProfileResponse, UpdateProfilePayload } from '@/libs/types';

import { baseQueryWithReauth } from './base-query';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getMe: builder.query<ProfileResponse, void>({
      query: () => API_ENDPOINTS.userProfile,
    }),

    updateProfile: builder.mutation<ProfileResponse, UpdateProfilePayload>({
      query: (payload) => ({
        url: API_ENDPOINTS.userProfile,
        method: 'PUT',
        body: payload,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const {
          data: { user },
        } = await queryFulfilled;

        dispatch(setUser({ user }));
      },
    }),
  }),
});

export const { useGetMeQuery, useUpdateProfileMutation, useLazyGetMeQuery } =
  usersApi;
