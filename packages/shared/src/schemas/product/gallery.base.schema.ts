import { z } from '@/config';

export const GalleryIdSchema = z.coerce.number().int().positive();

export const GalleryImageSchema = z.string();
