import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearCredentials,
  selectAccessToken,
  setCredentials,
} from '@/app/features/auth';
import type { AppDispatch } from '@/app/store';
import { useGetMeQuery } from '@/app/services/users-api';

export const useCredentials = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector(selectAccessToken);

  const { data, isSuccess, isError } = useGetMeQuery(undefined, {
    skip: accessToken === null,
  });

  useEffect(() => {
    if (isSuccess && data.user) {
      dispatch(
        setCredentials({
          user: data.user,
          accessToken: accessToken!,
        }),
      );
    }

    if (isError) {
      dispatch(clearCredentials());
    }
  }, [isSuccess, isError, data, accessToken, dispatch]);
};
