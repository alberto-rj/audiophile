export function createProductsRoute() {
  return `/products/`;
}

export function createProductRoute(slug: string) {
  return `/products/${slug}`;
}

export function createCategoriesRoute() {
  return `/categories/`;
}

export function createCategoryRoute(slug: string) {
  return `/categories/${slug}`;
}
