import { getWallpaperImage } from "../../shared/WallpaperAlchemy/helpers/wallpaper";
import WallpaperService from "../../shared/WallpaperAlchemy/services/WallpaperService";
import { intlLocaleToWallpaperAlchemyLocale } from "../../shared/WallpaperAlchemy/utilities/i18n";
import { cache } from "./cache";
import { Image } from "./types";

const getWallpapers = async (locale: string) => {
  try {
    return await WallpaperService.getWallpapers(
      {
        page: 1,
        perPage: 50,
        sort: "downloads",
        device: "desktop",
      },
      intlLocaleToWallpaperAlchemyLocale(locale),
    );
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const fetchImages = async (locale: string): Promise<Image[]> => {
  const response = await getWallpapers(locale);

  if (!response || !response.success || !response.data.data?.length) {
    console.error("Gracefully fallback to cache", response);

    return cache;
  }

  return response.data.data.map((wallpaper) => ({
    image: getWallpaperImage(wallpaper),
  }));
};
