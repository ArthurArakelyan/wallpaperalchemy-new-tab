import { type FC, useEffect, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { backgroundMessages } from "../../../locales/messages";
import { DebounceInput } from "../../shared";
import Loader from "../../shared/WallpaperAlchemy/components/Loader";
import { wallpapersPaginationPageSize } from "../../shared/WallpaperAlchemy/constants/pagination";
import { uniqueById } from "../../shared/WallpaperAlchemy/helpers/array";
import { assertSuccess } from "../../shared/WallpaperAlchemy/helpers/assert";
import useInfiniteScroll from "../../shared/WallpaperAlchemy/hooks/useInfiniteScroll";
import { IWallpaper } from "../../shared/WallpaperAlchemy/types";
import BaseSettings from "../base/BaseSettings";
import { getWallpapers } from "./api";
import { defaultData, Props } from "./types";
import WallpaperAlchemyCustomCollectionSettingsCard from "./WallpaperAlchemyCustomCollectionSettingsCard";

const WallpaperAlchemyCustomCollectionSettings: FC<Props> = ({
  data = defaultData,
  setData,
}) => {
  const intl = useIntl();

  const [wallpapers, setWallpapers] = useState<IWallpaper[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const filteredWallpapers = useMemo(() => {
    return wallpapers.filter((wallpaper) => !data.ids.includes(wallpaper.id));
  }, [wallpapers, data.ids]);

  const handleGetWallpapers = async (nextPage: number) => {
    try {
      if (loading) {
        return;
      }

      setLoading(true);
      setError(null);

      const response = await getWallpapers(intl.locale, {
        page: nextPage,
        query: search.trim() || undefined,
      });

      assertSuccess(response);

      if (nextPage === 1) {
        setWallpapers(response.data.data);
      } else {
        setWallpapers((prevState) => {
          return uniqueById(prevState, response.data.data);
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

  const handleSelectWallpaper = (wallpaper: IWallpaper) => {
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
    // }, [intl.locale, search]);
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

        {!!wallpapers.length && (
          <span className="customWallpapersTitle">
            <FormattedMessage
              {...backgroundMessages.wallpaperAlchemyCustomWallpapersMessage}
            />
          </span>
        )}

        {!!filteredWallpapers.length && (
          <div className="customWallpapersScroll">
            <div className="customWallpapers">
              {filteredWallpapers.map((wallpaper) => {
                return (
                  <WallpaperAlchemyCustomCollectionSettingsCard
                    key={wallpaper.id}
                    wallpaper={wallpaper}
                    isSelected={false}
                    onSelect={() => handleSelectWallpaper(wallpaper)}
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
        )}

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
