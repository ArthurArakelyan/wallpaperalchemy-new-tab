import { getWallpaperImage } from "../../shared/WallpaperAlchemy/helpers/wallpaper";
import TagService from "../../shared/WallpaperAlchemy/services/TagService";
import WallpaperService from "../../shared/WallpaperAlchemy/services/WallpaperService";
import { QueryType } from "../../shared/WallpaperAlchemy/types";
import { intlLocaleToWallpaperAlchemyLocale } from "../../shared/WallpaperAlchemy/utilities/i18n";
import { Image } from "./types";

const getWallpapers = async (locale: string, tag?: number) => {
  try {
    if (!tag) {
      return null;
    }

    return await WallpaperService.getWallpapers(
      {
        page: 1,
        perPage: 999,
        sort: "downloads",
        device: "desktop",
        tag,
      },
      intlLocaleToWallpaperAlchemyLocale(locale),
    );
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getTags = async (locale: string, query: QueryType = {}) => {
  return TagService.getTags(
    {
      page: 1,
      perPage: 9999,
      sort: "downloads",
      device: "desktop",
      ...query,
    },
    intlLocaleToWallpaperAlchemyLocale(locale),
  );
};

export const fetchImages = async (
  locale: string,
  tag?: number,
): Promise<Image[]> => {
  const response = await getWallpapers(locale, tag);

  if (!response || !response.success || !response.data.data?.length) {
    console.error("Expected an array, but received:", response);

    return [];
  }

  return response.data.data.map((wallpaper) => ({
    image: getWallpaperImage(wallpaper),
  }));
};
