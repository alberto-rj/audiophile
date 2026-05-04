import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import type { RootState } from '@/app/store';
import { selectAccessToken } from '@/app/features/auth';
import { env } from '@/config/env';

const { VITE_API_BASE_URL } = env;

export const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `${VITE_API_BASE_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = selectAccessToken(getState() as RootState);

      if (typeof token === 'string') {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  });

  return baseQuery(args, api, extraOptions);
};
