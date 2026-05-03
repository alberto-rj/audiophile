export interface AuthState {
  user: BaseUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

export interface BaseUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: BaseUser;
  accessToken: string;
}
