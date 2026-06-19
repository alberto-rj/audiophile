import type { PaginateResult } from '@/helpers';
import type {
  Gallery,
  GalleryCreateParams,
  GalleryDeleteByIdParams,
  GalleryFindByIdParams,
  GalleryFindManyParams,
} from '@/schemas';

export interface GalleryRepository {
  create: (params: GalleryCreateParams) => Promise<Gallery>;

  createMany: (params: GalleryCreateParams[]) => Promise<Gallery[]>;

  findById: (params: GalleryFindByIdParams) => Promise<Gallery | null>;

  findMany: (params: GalleryFindManyParams) => Promise<PaginateResult<Gallery>>;

  deleteById: (params: GalleryDeleteByIdParams) => Promise<Gallery | null>;

  clear: () => Promise<void>;
}
