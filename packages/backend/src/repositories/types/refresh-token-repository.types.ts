import type { PaginateResult } from '@/helpers/paginate';
import type {
  RefreshToken,
  RefreshTokenCreateParams,
  RefreshTokenFindManyParams,
  RefreshTokenIdParams,
  RefreshTokenTokenParams,
} from '@audiophile/shared';

export interface RefreshTokenRepository {
  create: (params: RefreshTokenCreateParams) => Promise<RefreshToken>;

  find: (params: RefreshTokenTokenParams) => Promise<RefreshToken | null>;

  findById: (params: RefreshTokenIdParams) => Promise<RefreshToken | null>;

  findMany: (
    params: RefreshTokenFindManyParams,
  ) => Promise<PaginateResult<RefreshToken>>;

  delete: (params: RefreshTokenTokenParams) => Promise<RefreshToken | null>;

  deleteManyExpired: () => Promise<void>;

  clear: () => Promise<void>;
}
