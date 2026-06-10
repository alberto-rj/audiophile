export interface PaginateParams<T> {
  items: T[];
  page?: number;
  limit?: number;
}

export interface PaginateResult<T> {
  items: T[];
  page: number;
  limit: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export function paginate<T>({
  items,
  limit = 20,
  page = 1,
}: PaginateParams<T>): PaginateResult<T> {
  const validPage = Math.max(1, page);
  const validLimit = Math.max(1, limit);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / validLimit);

  const startIndex = (validPage - 1) * validLimit;
  const endIndex = startIndex + validLimit;

  return {
    items: items.slice(startIndex, endIndex),
    page: validPage,
    limit: validLimit,
    totalPages,
    hasPrev: validPage > 1,
    hasNext: validPage < totalPages,
  };
}
