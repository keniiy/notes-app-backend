export interface PaginateResult<T> {
  [key: string]: any;
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page?: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number;
  nextPage?: number;
  offset: number;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sort: Record<string, number>;
  offset: number;
  populate?: any[];
}
