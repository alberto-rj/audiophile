import {
  GalleryCreateInputSchema,
  GalleryFindManyInputSchema,
  GalleryIdInputSchema,
  type GalleryCreateInput,
  type GalleryFindManyInput,
  type GalleryIdInput,
} from '@audiophile/shared';

import { parseSchema } from '../parse-schema';

export function toGalleryCreateInput(data: unknown): GalleryCreateInput {
  return parseSchema(GalleryCreateInputSchema, data);
}

export function toGalleryIdInput(data: unknown): GalleryIdInput {
  return parseSchema(GalleryIdInputSchema, data);
}

export function toGalleryFindManyInput(data: unknown): GalleryFindManyInput {
  return parseSchema(GalleryFindManyInputSchema, data);
}
