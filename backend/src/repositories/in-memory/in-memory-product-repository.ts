import type {
  Category,
  Product,
  ProductCreateParams,
  ProductDetailed,
  ProductFindManyParams,
  ProductIdParams,
  ProductSlugParams,
} from '@audiophile/shared';

import { db } from '@/db/in-memory';
import {
  makeCategory,
  makeGallery,
  makeProduct,
  paginate,
  type PaginateResult,
} from '@/helpers';

import type { ProductRepository } from '../types/product-repository.types';

export class InMemoryProductRepository implements ProductRepository {
  async create(params: ProductCreateParams): Promise<Product> {
    const newProduct = makeProduct(params);

    db.products.set(newProduct.id, newProduct);

    return newProduct;
  }

  async createMany(paramsList: ProductCreateParams[]): Promise<Product[]> {
    const createdProducts = paramsList.map(makeProduct);

    for (const newProduct of createdProducts) {
      db.products.set(newProduct.id, newProduct);
    }

    return createdProducts;
  }

  async findById({ id }: ProductIdParams): Promise<ProductDetailed | null> {
    const foundProduct = db.products.get(id);

    if (!foundProduct) {
      return null;
    }

    return toItemDetailed(foundProduct);
  }

  async findBySlug({
    slug,
  }: ProductSlugParams): Promise<ProductDetailed | null> {
    const foundProduct = Array.from(db.products.values()).find(
      (p) => p.slug === slug,
    );

    if (!foundProduct) {
      return null;
    }

    return toItemDetailed(foundProduct);
  }

  async findMany({
    page,
    limit,
  }: ProductFindManyParams): Promise<PaginateResult<ProductDetailed>> {
    const items = Array.from(db.products.values()).map(toItemDetailed);

    const foundProducts = paginate({
      items,
      page,
      limit,
    });

    return foundProducts;
  }

  async deleteById({ id }: ProductIdParams): Promise<Product | null> {
    const foundProduct = Array.from(db.products.values()).find(
      (item) => item.id === id,
    );

    if (!foundProduct) {
      return null;
    }

    db.products.delete(foundProduct.id);

    return foundProduct;
  }

  async deleteBySlug({ slug }: ProductSlugParams): Promise<Product | null> {
    const foundProduct = Array.from(db.products.values()).find(
      (item) => item.slug === slug,
    );

    if (!foundProduct) {
      return null;
    }

    db.products.delete(foundProduct.id);

    return foundProduct;
  }

  async clear(): Promise<void> {
    db.products.clear();
  }
}

function getProductGallery(productId: Product['id']) {
  for (const [, gallery] of db.galleries.entries()) {
    if (gallery.productId === productId) {
      return gallery;
    }
  }

  return makeGallery({
    first: 'first-not-found',
    second: 'second-not-found',
    third: 'third-not-found',
    productId,
  });
}

function getProductCategory(categoryId: Category['id']) {
  for (const [, category] of db.categories.entries()) {
    if (category.id === categoryId) {
      return category;
    }
  }

  return makeCategory({
    name: 'category not found',
    description: 'category not found',
    image: 'category-not-found',
    slug: 'category-not-found',
  });
}

function getProductIncludes(productId: Product['id']) {
  const includes = Array.from(db.includes.values())
    .filter((include) => include.productId === productId)
    .map(({ item, quantity }) => ({ item, quantity }));

  return includes;
}

function getProductSuggestions(productId: Product['id']) {
  const suggestionRelations = Array.from(db.suggestions.values()).filter(
    (suggestion) => suggestion.sourceId === productId,
  );

  const suggestions = Array.from(db.products.values())
    .filter((product) =>
      suggestionRelations.some((rel) => rel.sourceId === product.id),
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
