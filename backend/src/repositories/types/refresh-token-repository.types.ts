import type {
  RefreshToken,
  RefreshTokenCreateParams,
  RefreshTokenDeleteParams,
  RefreshTokenFindByIdParams,
  RefreshTokenFindParams,
} from '@/schemas';

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
