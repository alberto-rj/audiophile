import { createApi } from '@reduxjs/toolkit/query/react';

import type { GetMeResponse } from '@/libs/types';

import { baseQueryWithAuth } from './base-query';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getMe: builder.query<GetMeResponse, void>({
      query: () => '/auth/me',
    }),
  }),
});

export const { useGetMeQuery } = usersApi;
