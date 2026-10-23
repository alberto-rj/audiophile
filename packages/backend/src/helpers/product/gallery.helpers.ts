import {
  GalleryCreateInputSchema,
  GalleryFindManyInputSchema,
  GalleryIdInputSchema,
  makeId,
  type Gallery,
  type GalleryCreateInput,
  type GalleryCreateParams,
  type GalleryFindManyInput,
  type GalleryIdInput,
} from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

export function makeGallery({ ...rest }: GalleryCreateParams): Gallery {
  return {
    ...rest,
    id: makeId(),
  };
}

export function toGalleryCreateInput(data: unknown): GalleryCreateInput {
  return parseSchema(GalleryCreateInputSchema, data);
}

export function toGalleryIdInput(data: unknown): GalleryIdInput {
  return parseSchema(GalleryIdInputSchema, data);
}

export function toGalleryFindManyInput(data: unknown): GalleryFindManyInput {
  return parseSchema(GalleryFindManyInputSchema, data);
}
