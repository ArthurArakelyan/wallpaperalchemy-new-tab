import {
  IPaginationResponse,
  IWallpaper,
  IWallpaperLocalized,
} from "../../types";

export type IGetWallpapersResponseData = IPaginationResponse<IWallpaper>;

export type IGetWallpaperResponseData = IWallpaper;

export type IGetWallpaperLocalesResponseData = IWallpaperLocalized;

export type IGetRelatedWallpapersResponseData = IPaginationResponse<IWallpaper>;

export interface IDownloadWallpaperResponseData {
  count: number;
  wallpaperId: number;
}
