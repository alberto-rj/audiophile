import { createApi } from '@reduxjs/toolkit/query/react';

import { setUser } from '@/app/features/auth';
import type { ProfileResponse, UpdateProfilePayload } from '@/libs/types';

import { baseQueryWithAuth } from './base-query';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getMe: builder.query<ProfileResponse, void>({
      query: () => '/users/me',
    }),

    updateProfile: builder.mutation<ProfileResponse, UpdateProfilePayload>({
      query: (payload) => ({
        url: '/users/me',
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

export const { useGetMeQuery, useUpdateProfileMutation } = usersApi;
