export { makeLoginPresenter } from './auth/make-login-presenter';
export { makeRegisterPresenter } from './auth/make-register-presenter';

export { makeCategoryRepository } from './category/make-category-repository';

export {
  IMAGE_TRANSFORMS,
  buildImageUrl,
  buildResponseImage,
  cloudinary,
  uploadImage,
} from './cloudinary/cloudinary';

export {
  asyncLocalStorage,
  getRequestContext,
  setRequestContext,
  updateRequestContext,
} from './logger/context';
export { logger } from './logger/logger';
export type { LogContext, RequestContext } from './logger/logger.types';

export { makeGalleryRepository } from './product/make-gallery-repository';
export { makeIncludeRepository } from './product/make-include-repository';
export { makeProductRepository } from './product/make-product-repository';
export { makeOtherProductRepository } from './product/make-other-repository';
export { toApiProduct } from './product/to-api-product';

export {
  AppError,
  BadRequestError,
  ConflictError,
  ResourceNotFoundError,
  UnauthorizedError,
  ValidationError,
} from './app-error';

export { scheduleTasks } from './cron';

export { makeRefreshToken } from './refresh-token/make-refresh-token';
export { makeRefreshTokenRepository } from './refresh-token/make-refresh-token-repository';

export { makeUser } from './user/make-user';
export { makeUpdateProfilePresenter } from './user/make-update-profile-presenter';
export { makeUserRepository } from './user/make-user-repository';
export { toSafeUser } from './user/to-safe-user';

export { makeId } from './make-id';
export {
  makeResBodyError,
  makeResBodyPaginationResult,
  makeResBodyResult,
  makeResBodyResultList,
  makeResBodyValidationError,
  type ResBodyError,
  type ResBodyResult,
  type ResBodyResultList,
  type ResBodyValidationError,
} from './make-res-body';

export {
  getBaseResult,
  getOffset,
  paginate,
  type PaginateParams,
  type PaginateResult,
} from './paginate';

export { parseSchema } from './parse-schema';

export { getHash, hasCorrectHash } from './password';

export { toSlug } from './to-slug';

export {
  clearRefreshTokenCookie,
  getAccessToken,
  getAccessTokenPayload,
  getRefreshToken,
  getRefreshTokenCookieOptions,
  refreshTokenExpiresAt,
  REFRESH_TOKEN_COOKIE_KEY,
  setRefreshTokenCookie,
  type AuthPayload,
  type AuthRequest,
} from './tokens';
