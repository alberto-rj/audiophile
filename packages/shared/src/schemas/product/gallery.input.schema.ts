import {
  GalleryCreateParamsSchema,
  GalleryFindManyParamsSchema,
  GalleryIdParamsSchema,
} from './gallery.params.schema';

export const GalleryIdInputSchema = GalleryIdParamsSchema.extend({});

export const GalleryCreateInputSchema = GalleryCreateParamsSchema.extend({});

export const GalleryFindManyInputSchema = GalleryFindManyParamsSchema.extend(
  {},
);
