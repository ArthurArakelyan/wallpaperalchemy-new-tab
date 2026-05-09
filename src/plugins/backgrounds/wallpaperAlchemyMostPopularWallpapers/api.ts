import { defaultLocale } from "../../shared/WallpaperAlchemy/constants/i18n";
import { getWallpaperImage } from "../../shared/WallpaperAlchemy/helpers/wallpaper";
import WallpaperService from "../../shared/WallpaperAlchemy/services/WallpaperService";
import { cache } from "./cache";
import { Image } from "./types";

const getWallpapers = async () => {
  try {
    return await WallpaperService.getWallpapers(
      {
        page: 1,
        perPage: 50,
        sort: "downloads",
        device: "desktop",
      },
      defaultLocale,
    );
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const fetchImages = async (): Promise<Image[]> => {
  // TODO: For first launch use cache only, then bring getWallpapers into action
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line no-constant-condition
  if ("a") {
    return cache;
  }

  const response = await getWallpapers();

  if (!response || !response.success || !response.data.data?.length) {
    console.error("Gracefully fallback to cache", response);

    return cache;
  }

  return response.data.data.map((wallpaper) => ({
    image: getWallpaperImage(wallpaper),
  }));
};
