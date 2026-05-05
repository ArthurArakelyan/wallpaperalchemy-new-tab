export interface IPageInfo {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  lastPage: number;
  nextPage: number | null;
  nextPageUrl: string | null;
  page: number;
  perPage: number;
  prevPage: number | null;
  prevPageUrl: string | null;
  totalItems: number;
  totalItemsOnPage: number;
  totalPages: number;
}
