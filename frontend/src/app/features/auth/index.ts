import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';
import type { BaseUser } from '@/libs/types';

export interface AuthState {
  user: BaseUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, accessToken },
      }: PayloadAction<{ user: BaseUser; accessToken: string }>,
    ) => {
      state.user = user;
      state.accessToken = accessToken;
    },

    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectUser = (state: RootState) => {
  return state.auth.user;
};

export const selectAccessToken = (state: RootState) => {
  return state.auth.accessToken;
};

export const selectAuthenticated = (state: RootState) => {
  return state.auth.isAuthenticated;
};
