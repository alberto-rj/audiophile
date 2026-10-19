import type { Decorator } from '@storybook/react-vite';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearCredentials,
  selectUser,
  setCredentials,
} from '@/app/features/auth';
import { getMockCredentials } from '@/mocks';

export const WithCredentialsDecorator: Decorator = (Story, ctx) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useLayoutEffect(() => {
    dispatch(setCredentials(getMockCredentials()));
    return () => {
      dispatch(clearCredentials());
    };
  }, [dispatch]);

  if (!user) return <></>;

  return <Story {...ctx} />;
};
