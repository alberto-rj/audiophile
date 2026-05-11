import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import type { RootState } from '@/app/store';
import {
  clearCredentials,
  selectAccessToken,
  setCredentials,
} from '@/app/features/auth';
import { env } from '@/config/env';
import type { AuthResponse } from '@/libs/types';

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

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const authResult = await baseQueryWithAuth(args, api, extraOptions);

  if (authResult.error?.status !== 401) {
    return authResult;
  }

  const refreshResult = await baseQueryWithAuth(
    {
      url: '/auth/refresh',
      method: 'POST',
    },
    api,
    extraOptions,
  );

  if (refreshResult.error) {
    api.dispatch(clearCredentials());
  } else {
    api.dispatch(setCredentials(refreshResult.data as AuthResponse));
  }

  return authResult;
};
