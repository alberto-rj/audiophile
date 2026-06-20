import type { OtherProduct, OtherProductCreateParams } from '@/schemas';

export interface OtherProductRepository {
  create: (params: OtherProductCreateParams) => Promise<OtherProduct>;

  createMany: (params: OtherProductCreateParams[]) => Promise<OtherProduct[]>;

  clear: () => Promise<void>;
}
