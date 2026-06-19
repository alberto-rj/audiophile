export interface PaginateParams<T> {
  items: T[];
  page?: number;
  limit?: number;
}

export interface PaginateBaseResult {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export interface PaginateResult<T> extends PaginateBaseResult {
  items: T[];
}

export function paginate<T>({
  items,
  limit,
  page,
}: PaginateParams<T>): PaginateResult<T> {
  const validPage = getValidPage(page);
  const validLimit = getValidLimit(limit);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / validLimit);

  const startIndex = (validPage - 1) * validLimit;
  const endIndex = startIndex + validLimit;

  const { hasPrev, hasNext } = getFlags({ page: validPage, totalPages });

  return {
    items: items.slice(startIndex, endIndex),
    page: validPage,
    limit: validLimit,
    totalPages,
    totalItems,
    hasPrev,
    hasNext,
  };
}

export function getOffset(params: { limit?: number; page?: number } = {}) {
  const { limit, page } = params;

  const validPage = getValidPage(page);
  const validLimit = getValidLimit(limit);

  return (validPage - 1) * validLimit;
}

function getTotalPages(params: { limit?: number; totalItems: number }) {
  const { limit, totalItems } = params;

  const validLimit = getValidLimit(limit);
  const validTotalItems = getValidTotalItems(totalItems);

  return Math.ceil(validTotalItems / validLimit);
}

function getFlags({ page, totalPages }: { page?: number; totalPages: number }) {
  const validPage = getValidPage(page);

  return {
    hasPrev: validPage > 1,
    hasNext: validPage < totalPages,
  };
}

export function getBaseResult({
  limit,
  page,
  totalItems,
}: {
  limit: number;
  page: number;
  totalItems: number;
}): PaginateBaseResult {
  const validLimit = getValidLimit(limit);
  const validPage = getValidPage(page);

  const totalPages = getTotalPages({ totalItems, limit: validLimit });
  const { hasNext, hasPrev } = getFlags({ page: validPage, totalPages });

  return {
    totalPages,
    totalItems,
    limit: validLimit,
    page: validPage,
    hasNext,
    hasPrev,
  };
}

function getValidLimit(limit: number = 20) {
  return Math.max(1, limit);
}

function getValidPage(page: number = 1) {
  return Math.max(1, page);
}

function getValidTotalItems(totalItems: number = 0) {
  return Math.max(0, totalItems);
}
