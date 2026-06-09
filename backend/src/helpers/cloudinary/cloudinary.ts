import { v2 as cloudinary } from 'cloudinary';

import { env } from '@/config';
import type { ResponsiveImage } from '@/schemas';

const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } =
  env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const IMAGE_TRANSFORMS = {
  product: {
    mobile: 'w_654,h_654,c_fill,q_auto,f_auto',
    tablet: 'w_689,h_689,c_fill,q_auto,f_auto',
    desktop: 'w_540,h_560,c_fill,q_auto,f_auto',
  },
  category: {
    mobile: 'w_654,h_240,c_fill,q_auto,f_auto',
    tablet: 'w_689,h_240,c_fill,q_auto,f_auto',
    desktop: 'w_445,h_422,c_fill,q_auto,f_auto',
  },
  gallery: {
    mobile: 'w_654,h_348,c_fill,q_auto,f_auto',
    tablet: 'w_277,h_174,c_fill,q_auto,f_auto',
    desktop: 'w_445,h_280,c_fill,q_auto,f_auto',
  },
} as const;

type TransformContext = keyof typeof IMAGE_TRANSFORMS;

/**
 * Generates the URL for a publicId with the desired transform
 */
export function buildImageUrl(publicId: string, transform: string): string {
  return cloudinary.url(publicId, {
    transformation: transform,
    secure: true,
  });
}

/**
 * Generates the complete ResponsiveImage object for a context
 */
export function buildResponseImage(
  publicId: string,
  context: TransformContext,
): ResponsiveImage {
  const { mobile, tablet, desktop } = IMAGE_TRANSFORMS[context];

  return {
    mobile: buildImageUrl(publicId, mobile),
    tablet: buildImageUrl(publicId, tablet),
    desktop: buildImageUrl(publicId, desktop),
  };
}

/**
 * Upload a buffer or path — returns the publicId
 */
export async function uploadImage(
  source: string, // local path, URL, or base64
  folder: string, // ex: 'audiophile/products
  publicId?: string, // force a specific ID
) {
  if (typeof publicId === 'string') {
    const { public_id } = await cloudinary.uploader.upload(source, {
      folder,
      overwrite: true,
      resource_type: 'image',
      public_id: publicId,
    });

    return public_id;
  }

  const { public_id } = await cloudinary.uploader.upload(source, {
    folder,
    overwrite: true,
    resource_type: 'image',
  });

  return public_id;
}

export { cloudinary };
