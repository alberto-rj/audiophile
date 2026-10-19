import type { UserBasic } from '@audiophile/shared';

export interface AuthState {
  user: UserBasic | null;
  accessToken: string | null;
}

export interface AuthResponse {
  user: UserBasic;
  accessToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
