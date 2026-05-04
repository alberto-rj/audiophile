import { useEffect, type ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch } from '@/app/store';
import {
  clearCredentials,
  selectAccessToken,
  setCredentials,
} from '@/app/features/auth';
import { useGetMeQuery } from '@/app/services/users-api';

interface AppInitializerProps {
  children: ReactNode;
}

export const AppInitializer = ({ children }: AppInitializerProps) => {
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

  return <>{children}</>;
};
