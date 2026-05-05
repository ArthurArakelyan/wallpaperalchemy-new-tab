import { storageUrl } from "../../constants/main";
import { IWallpaper, IWallpaperLocalized } from "../../types";
import { lowerCaseImageExtension } from "../image";
import { checkObjectStrings, checkString } from "../string";

export const isWallpaperNotLocalized = (
  wallpaper: IWallpaper | IWallpaperLocalized,
): wallpaper is IWallpaperLocalized => {
  return Boolean("locales" in wallpaper && wallpaper.locales);
};

export const isWallpaperLocalized = (
  wallpaper: IWallpaper | IWallpaperLocalized,
): wallpaper is IWallpaper => {
  return !isWallpaperNotLocalized(wallpaper);
};

export const getWallpaperFullId = (
  wallpaper: IWallpaper | IWallpaperLocalized,
): string => {
  return `${wallpaper.slug}-${wallpaper.id}`;
};

export const getWallpaperUrl = (
  wallpaper: IWallpaper | IWallpaperLocalized,
): string => {
  return `/wallpaper/${getWallpaperFullId(wallpaper)}`;
};

export const getWallpaperImageFromUrl = (image: string): string => {
  return `${storageUrl}${lowerCaseImageExtension(image)}`;
};

export const getWallpaperImage = (
  wallpaper: IWallpaper | IWallpaperLocalized,
): string => {
  return getWallpaperImageFromUrl(wallpaper.image);
};

export const getWallpaperCardImage = (
  wallpaper: IWallpaper | IWallpaperLocalized,
): string => {
  if (!checkString(wallpaper.cardImage)) {
    return getWallpaperImage(wallpaper);
  }

  return `${storageUrl}${lowerCaseImageExtension(wallpaper.cardImage)}`;
};

export const getWallpaperSlug = (url: string): string => {
  const split = url.split("-");

  split.pop();

  return split.join("");
};

export const getWallpaperId = (url: string): string => {
  const split = url.split("-");

  return split[split.length - 1];
};

export const getIsWallpaperMobile = (wallpaper: IWallpaper) => {
  return wallpaper.height > wallpaper.width;
};

export const getIsWallpaperDesktop = (wallpaper: IWallpaper) => {
  return !getIsWallpaperMobile(wallpaper);
};

export const getWallpaperChromeWebStoreLink = (
  wallpaper: IWallpaper,
): string | null => {
  return wallpaper.links?.chrome || null;
};

export const getWallpaperResourceLinks = (
  wallpaper: IWallpaper,
): Record<string, string> | null => {
  const { links } = wallpaper;

  if (!links || !checkObjectStrings(links)) {
    return null;
  }

  const linksCopy = { ...links };

  delete linksCopy.chrome;

  if (!checkObjectStrings(linksCopy)) {
    return null;
  }

  return linksCopy;
};
