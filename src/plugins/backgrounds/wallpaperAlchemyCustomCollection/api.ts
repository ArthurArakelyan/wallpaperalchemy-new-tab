import { wallpapersPaginationPageSize } from "../../shared/WallpaperAlchemy/constants/pagination";
import { getWallpaperImage } from "../../shared/WallpaperAlchemy/helpers/wallpaper";
import WallpaperService from "../../shared/WallpaperAlchemy/services/WallpaperService";
import { QueryType } from "../../shared/WallpaperAlchemy/types";
import { intlLocaleToWallpaperAlchemyLocale } from "../../shared/WallpaperAlchemy/utilities/i18n";
import { Image } from "./types";

export const getWallpapers = async (locale: string, query: QueryType = {}) => {
  return await WallpaperService.getWallpapers(
    {
      page: 1,
      perPage: wallpapersPaginationPageSize,
      sort: "downloads",
      device: "desktop",
      ...query,
    },
    intlLocaleToWallpaperAlchemyLocale(locale),
  );
};

export const getWallpapersByIds = async (ids: number[], locale: string) => {
  try {
    const wallpaperAlchemyLocale = intlLocaleToWallpaperAlchemyLocale(locale);

    return Promise.all(
      ids.map((id) => {
        // TODO: Make a separate endpoint, to avoid calling same 100 times at once
        return WallpaperService.getWallpaper(id, wallpaperAlchemyLocale);
      }),
    );
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const fetchImages = async (
  ids: number[],
  locale: string,
): Promise<Image[]> => {
  const responses = await getWallpapersByIds(ids, locale);

  // TODO: Delete if 404

  if (
    !responses ||
    !responses.length ||
    responses.find((response) => !response.success)
  ) {
    console.error("Expected an array, but received:", responses);

    return [];
  }

  return responses.map((response) => ({
    image: getWallpaperImage(response.data),
  }));
};
