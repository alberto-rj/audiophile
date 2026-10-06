import { makeId, parseSchema } from '@/helpers';

import {
  ApiGalleryCreateBodySchema,
  ApiGalleryIdParamsSchema,
  ApiGalleryPaginationQuerySchema,
} from './gallery.api.schema';
import type {
  Gallery,
  GalleryCreateParams,
  GalleryDeleteByIdParams,
  GalleryFindByIdParams,
  GalleryFindManyParams,
} from './gallery.types';

export function makeGallery({ ...rest }: GalleryCreateParams): Gallery {
  return {
    ...rest,
    id: makeId(),
  };
}

export function makeGalleryCreateParams(params: unknown): GalleryCreateParams {
  return parseSchema(ApiGalleryCreateBodySchema, params);
}

export function makeGalleryFindByIdParams(
  params: unknown,
): GalleryFindByIdParams {
  return parseSchema(ApiGalleryIdParamsSchema, params);
}

export function makeGalleryDeleteByIdParams(
  params: unknown,
): GalleryDeleteByIdParams {
  return parseSchema(ApiGalleryIdParamsSchema, params);
}

export function makeGalleryFindManyParams(
  params: unknown,
): GalleryFindManyParams {
  return parseSchema(ApiGalleryPaginationQuerySchema, params);
}
