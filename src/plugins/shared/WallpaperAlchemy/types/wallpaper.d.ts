import { Dictionary, IPublicUser, ITag } from "../types";

export interface IWallpaperGeneral {
  storage: "vps" | "aws";
  id: number;
  slug: string;
  image: string;
  cardImage: string | null;
  width: number;
  height: number;
  author: number;
  user?: IPublicUser;
  tagIds?: number[];
  tags?: ITag[];
  links: Record<string, string>;
  downloads?: {
    count: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IWallpaperLocale {
  name: string;
  description: string;
  keywords: string;
}

export interface IWallpaperLocalized extends IWallpaperGeneral {
  locales: Dictionary<IWallpaperLocale>;
}

export interface IWallpaper extends IWallpaperGeneral, IWallpaperLocale {}
