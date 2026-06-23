import { db } from '@/db/in-memory';
import { paginate, type PaginateResult } from '@/helpers';
import type { ProductRepository } from '@/repositories';
import { makeCategory, makeProduct } from '@/schemas';
import type {
  CategoryId,
  Product,
  ProductCreateParams,
  ProductDeleteByIdParams,
  ProductDeleteBySlugParams,
  ProductDetailed,
  ProductFindByIdParams,
  ProductFindBySlugParams,
  ProductFindManyParams,
  ProductId,
} from '@/schemas';

export class InMemoryProductRepository implements ProductRepository {
  async create(params: ProductCreateParams): Promise<Product> {
    const newItem = makeProduct(params);

    db.products.set(newItem.id, newItem);

    return newItem;
  }

  async createMany(paramsList: ProductCreateParams[]): Promise<Product[]> {
    const newItems = paramsList.map(makeProduct);

    for (const newItem of newItems) {
      db.products.set(newItem.id, newItem);
    }

    return newItems;
  }

  async findById({
    id,
  }: ProductFindByIdParams): Promise<ProductDetailed | null> {
    const foundItem = db.products.get(id);

    if (!foundItem) {
      return null;
    }

    return toItemDetailed(foundItem);
  }

  async findBySlug({
    slug,
  }: ProductFindBySlugParams): Promise<ProductDetailed | null> {
    const foundItem = Array.from(db.products.values()).find(
      (p) => p.slug === slug,
    );

    if (!foundItem) {
      return null;
    }

    return toItemDetailed(foundItem);
  }

  async findMany({
    page,
    limit,
  }: ProductFindManyParams): Promise<PaginateResult<ProductDetailed>> {
    const items = Array.from(db.products.values()).map(toItemDetailed);

    const foundItems = paginate({
      items,
      page,
      limit,
    });

    return foundItems;
  }

  async deleteById({ id }: ProductDeleteByIdParams): Promise<Product | null> {
    const foundItem = Array.from(db.products.values()).find(
      (item) => item.id === id,
    );

    if (!foundItem) {
      return null;
    }

    return foundItem;
  }

  async deleteBySlug({
    slug,
  }: ProductDeleteBySlugParams): Promise<Product | null> {
    const foundItem = Array.from(db.products.values()).find(
      (item) => item.slug === slug,
    );

    if (!foundItem) {
      return null;
    }

    return foundItem;
  }

  async clear(): Promise<void> {
    db.products.clear();
  }
}

function getProductGallery(productId: ProductId) {
  for (const [, gallery] of db.galleries.entries()) {
    if (gallery.productId === productId) {
      return gallery;
    }
  }

  return null;
}

function getProductCategory(categoryId: CategoryId) {
  for (const [, category] of db.categories.entries()) {
    if (category.id === categoryId) {
      return category;
    }
  }

  return makeCategory({
    name: 'category not found',
    description: '',
    image: '',
    slug: 'category-not-found',
  });
}

function getProductIncludes(productId: ProductId) {
  const includes = Array.from(db.includes.values())
    .filter((include) => include.productId === productId)
    .map(({ item, quantity }) => ({ item, quantity }));

  return includes;
}

function getProductSuggestions(productId: ProductId) {
  const otherRelations = Array.from(db.otherProducts.values()).filter(
    (other) => other.productId === productId,
  );

  const suggestions = Array.from(db.products.values())
    .filter((product) =>
      otherRelations.some((rel) => rel.otherId === product.id),
    )
    .map(({ name, slug, image }) => ({ name, slug, image }));

  return suggestions;
}

function toItemDetailed(item: Product): ProductDetailed {
  return {
    ...item,
    gallery: getProductGallery(item.id),
    category: getProductCategory(item.categoryId),
    includes: getProductIncludes(item.id),
    suggestions: getProductSuggestions(item.id),
  };
}
