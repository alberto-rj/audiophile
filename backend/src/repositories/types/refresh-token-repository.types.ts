import type { RefreshToken } from '@/schemas';

export interface RefreshTokenCreateParams {
  userId: number;
  token: string;
  expiresAt: string;
}

export interface RefreshTokenFindByIdParams {
  id: number;
}

export interface RefreshTokenFindParams {
  token: string;
}

export interface RefreshTokenDeleteParams {
  token: string;
}

export interface RefreshTokenRepository {
  create: (params: RefreshTokenCreateParams) => Promise<RefreshToken>;

  find: (params: RefreshTokenFindParams) => Promise<RefreshToken | null>;

  findById: (
    params: RefreshTokenFindByIdParams,
  ) => Promise<RefreshToken | null>;

  delete: (params: RefreshTokenDeleteParams) => Promise<RefreshToken | null>;

  deleteManyExpired: () => Promise<void>;

  clear: () => Promise<void>;
}
