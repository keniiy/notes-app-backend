export interface PaginateResult<T> {
  docs: T[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page?: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number | null;
  nextPage?: number | null;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sort: Record<string, number>;
  offset: number;
  populate?: any[];
}
