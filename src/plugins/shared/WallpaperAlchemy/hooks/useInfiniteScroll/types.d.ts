import { UseInfiniteScrollHookRefCallback } from "react-infinite-scroll-hook";

export interface IUseInfiniteScrollOptions {
  callback: (nextPage: number) => any;
  page: number;
  pageSize?: number;
  total: number;
  loading?: boolean;
  error?: boolean;
  threshold?: number;
  onEndReached?: () => any;
}

export interface IUseInfiniteScrollReturnType {
  totalPageCount: number;
  isLastPage: boolean;
  retry: () => void;
  sentryRef: UseInfiniteScrollHookRefCallback;
}
