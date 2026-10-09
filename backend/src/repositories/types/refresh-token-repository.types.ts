import type {
  RefreshToken,
  RefreshTokenCreateParams,
  RefreshTokenIdParams,
  RefreshTokenTokenParams,
} from '@audiophile/shared';

export interface RefreshTokenRepository {
  create: (params: RefreshTokenCreateParams) => Promise<RefreshToken>;

  find: (params: RefreshTokenTokenParams) => Promise<RefreshToken | null>;

  findById: (params: RefreshTokenIdParams) => Promise<RefreshToken | null>;

  delete: (params: RefreshTokenTokenParams) => Promise<RefreshToken | null>;

  deleteManyExpired: () => Promise<void>;

  clear: () => Promise<void>;
}
