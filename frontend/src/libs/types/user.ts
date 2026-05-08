export interface BaseUser {
  id: number;
  name: string;
  email: string;
}

export interface ProfileResponse {
  user: BaseUser;
}

export interface UpdateProfilePayload {
  name: string;
  email: string;
}
