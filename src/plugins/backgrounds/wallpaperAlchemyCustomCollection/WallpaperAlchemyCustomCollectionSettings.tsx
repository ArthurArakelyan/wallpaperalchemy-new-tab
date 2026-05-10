import { type FC, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { backgroundMessages } from "../../../locales/messages";
import { DebounceInput } from "../../shared";
import Loader from "../../shared/WallpaperAlchemy/components/Loader";
import { wallpapersPaginationPageSize } from "../../shared/WallpaperAlchemy/constants/pagination";
import { uniqueById } from "../../shared/WallpaperAlchemy/helpers/array";
import { assertSuccess } from "../../shared/WallpaperAlchemy/helpers/assert";
import useInfiniteScroll from "../../shared/WallpaperAlchemy/hooks/useInfiniteScroll";
import usePrevState from "../../shared/WallpaperAlchemy/hooks/usePrevState";
import { IWallpaper } from "../../shared/WallpaperAlchemy/types";
import BaseSettings from "../base/BaseSettings";
import { getWallpapers } from "./api";
import { defaultData, Image, Props } from "./types";
import WallpaperAlchemyCustomCollectionSettingsCard from "./WallpaperAlchemyCustomCollectionSettingsCard";

const WallpaperAlchemyCustomCollectionSettings: FC<Props> = ({
  data = defaultData,
  setData,
  cache,
}) => {
  const intl = useIntl();

  const [wallpapers, setWallpapers] = useState<IWallpaper[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [initialCacheItems, setInitialCacheItems] = useState<Image[]>([]);

  const prevSearch = usePrevState(search);

  const showCacheItems = !search.trim() && !!initialCacheItems.length;

  const handleFilterWallpapers = (wallpapers: IWallpaper[]): IWallpaper[] => {
    return wallpapers.filter((wallpaper) => !data.ids.includes(wallpaper.id));
  };

  const handleGetWallpapers = async (nextPage: number) => {
    try {
      if (loading) {
        return;
      }

      const searchString = search.trim();

      setLoading(true);
      setError(null);

      const response = await getWallpapers(intl.locale, {
        page: nextPage,
        query: searchString || undefined,
      });

      assertSuccess(response);

      const wallpapers = searchString
        ? response.data.data
        : handleFilterWallpapers(response.data.data);

      if (nextPage === 1) {
        setWallpapers(wallpapers);
      } else {
        setWallpapers((prevState) => {
          return uniqueById(prevState, wallpapers);
        });
      }

      setPage(nextPage);
      setTotal(response.data.pageInfo.totalItems);
    } catch (error: any) {
      console.error(error);

      if (typeof error.message === "string") {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectWallpaper = (wallpaper: IWallpaper | Image) => {
    if (data.ids.includes(wallpaper.id)) {
      setData({ ...data, ids: data.ids.filter((id) => id !== wallpaper.id) });

      return;
    }

    setData({ ...data, ids: [...data.ids, wallpaper.id] });
  };

  const { retry, sentryRef } = useInfiniteScroll({
    callback: handleGetWallpapers,
    page,
    pageSize: wallpapersPaginationPageSize,
    total,
    loading,
    error: Boolean(error),
    threshold: 600,
  });

  useEffect(() => {
    handleGetWallpapers(1);
  }, [search]);

  useEffect(() => {
    const searchString = search.trim();

    if (searchString !== prevSearch && !searchString) {
      setInitialCacheItems(cache?.items || []);
    }
  }, [search]);

  return (
    <div className="WallpaperAlchemyCategoriesSettings">
      <BaseSettings data={data} setData={setData} />

      <div className="customWallpapersSection">
        <label>
          <FormattedMessage {...backgroundMessages.search} />
          <DebounceInput
            type="text"
            value={search}
            placeholder={intl.formatMessage(backgroundMessages.search)}
            onChange={setSearch}
            wait={500}
          />
        </label>

        {(!!wallpapers.length || showCacheItems) && (
          <span className="customWallpapersTitle">
            <FormattedMessage
              {...backgroundMessages.wallpaperAlchemyCustomWallpapersMessage}
            />
          </span>
        )}

        <div className="customWallpapersScroll">
          <div className="customWallpapers">
            {showCacheItems
              ? initialCacheItems.map((wallpaper) => {
                  const isSelected = data.ids.includes(wallpaper.id);

                  return (
                    <WallpaperAlchemyCustomCollectionSettingsCard
                      key={`cache-${wallpaper.id}`}
                      wallpaper={wallpaper}
                      isSelected={isSelected}
                      onSelect={handleSelectWallpaper}
                    />
                  );
                })
              : null}

            {wallpapers.map((wallpaper) => {
              const isSelected = data.ids.includes(wallpaper.id);

              return (
                <WallpaperAlchemyCustomCollectionSettingsCard
                  key={`wallpaper-${wallpaper.id}`}
                  wallpaper={wallpaper}
                  isSelected={isSelected}
                  onSelect={handleSelectWallpaper}
                />
              );
            })}
          </div>

          <div
            aria-hidden
            ref={sentryRef}
            className="customWallpapersScrollSentry"
          >
            &nbsp;
          </div>
        </div>

        {error && (
          <div className="customWallpapersError">
            <span className="customWallpapersErrorTitle">
              <FormattedMessage
                {...backgroundMessages.wallpaperAlchemyDefaultErrorMessage}
              />
            </span>

            <button
              type="button"
              className="button button--primary"
              onClick={retry}
            >
              <FormattedMessage {...backgroundMessages.tryAgain} />
            </button>
          </div>
        )}

        {loading && (
          <div className="customWallpapersLoading">
            <Loader size="small" />
          </div>
        )}
      </div>
    </div>
  );
};

export default WallpaperAlchemyCustomCollectionSettings;
