import type {
  Gallery,
  GalleryCreateParams,
  GalleryFindManyParams,
  GalleryIdParams,
} from '@audiophile/shared';

import type { PaginateResult } from '@/helpers/paginate';

export interface GalleryRepository {
  create: (params: GalleryCreateParams) => Promise<Gallery>;

  createMany: (params: GalleryCreateParams[]) => Promise<Gallery[]>;

  findById: (params: GalleryIdParams) => Promise<Gallery | null>;

  findMany: (params: GalleryFindManyParams) => Promise<PaginateResult<Gallery>>;

  deleteById: (params: GalleryIdParams) => Promise<Gallery | null>;

  clear: () => Promise<void>;
}
