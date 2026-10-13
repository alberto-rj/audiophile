import type {
  ApiUserResultListResponse,
  ApiUserUpdateProfileBody,
} from '@audiophile/shared';
import { createApi } from '@reduxjs/toolkit/query/react';

import { setUser } from '@/app/features/auth';
import { API_ENDPOINTS } from '@/config/api-endpoints';

import { baseQueryWithReauth } from './base-query';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getMe: builder.query<ApiUserResultListResponse, void>({
      query: () => API_ENDPOINTS.userProfile,
    }),

    updateProfile: builder.mutation<
      ApiUserResultListResponse,
      ApiUserUpdateProfileBody
    >({
      query: (payload) => ({
        url: API_ENDPOINTS.userProfile,
        method: 'PUT',
        body: payload,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const {
          data: { results },
        } = await queryFulfilled;

        const [user] = results;

        dispatch(setUser({ user }));
      },
    }),
  }),
});

export const { useGetMeQuery, useUpdateProfileMutation, useLazyGetMeQuery } =
  usersApi;
