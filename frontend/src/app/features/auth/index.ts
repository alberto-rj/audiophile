import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';
import type { AuthState, AuthUser } from '@/libs/types';

const TOKEN_KEY = 'auth_token';

export function storeAccessToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getInitialAuthState(): AuthState {
  const rawToken = localStorage.getItem(TOKEN_KEY);

  if (rawToken === null) {
    return { user: null, accessToken: null };
  }

  return { user: null, accessToken: rawToken };
}

const initialState = getInitialAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, accessToken },
      }: PayloadAction<{ user: AuthUser; accessToken: string }>,
    ) => {
      state.user = user;
      state.accessToken = accessToken;
    },

    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
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

export const selectIsAuthenticated = (state: RootState) => {
  return state.auth.user !== null && state.auth.accessToken !== null;
};
