import { useEffect, useMemo } from "react";
import useInfiniteScrollHook from "react-infinite-scroll-hook";

import { defaultPaginationPageSize } from "../../constants/pagination";
import { getTotalPageCount } from "../../utilities/pagination";
import {
  IUseInfiniteScrollOptions,
  IUseInfiniteScrollReturnType,
} from "./types";

const useInfiniteScroll = ({
  callback,
  page,
  pageSize = defaultPaginationPageSize,
  total,
  loading,
  error,
  threshold = 300,
  onEndReached,
}: IUseInfiniteScrollOptions): IUseInfiniteScrollReturnType => {
  const totalPageCount = useMemo(() => {
    return getTotalPageCount(total, pageSize);
  }, [total, pageSize]);

  const isLastPage = useMemo(() => {
    return page >= totalPageCount;
  }, [page, totalPageCount]);

  const retry = () => {
    callback(page + 1);
  };

  const loadMore = () => {
    if (!loading && !error && !isLastPage) {
      callback(page + 1);
    }
  };

  const [sentryRef] = useInfiniteScrollHook({
    loading: !!loading,
    disabled: !!error,
    hasNextPage: !isLastPage,
    onLoadMore: loadMore,
    rootMargin: `0px 0px ${threshold}px 0px`,
  });

  useEffect(() => {
    if (isLastPage && onEndReached) {
      onEndReached();
    }
  }, [isLastPage, onEndReached]);

  return {
    totalPageCount,
    isLastPage,
    retry,
    sentryRef,
  };
};

export default useInfiniteScroll;
