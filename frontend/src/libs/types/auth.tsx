export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
}

export interface AuthResponse {
  user: AuthUser;
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
