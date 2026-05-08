import type { BaseUser } from '@/libs/types';

export interface AuthState {
  user: BaseUser | null;
  accessToken: string | null;
}

export interface AuthResponse {
  user: BaseUser;
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
