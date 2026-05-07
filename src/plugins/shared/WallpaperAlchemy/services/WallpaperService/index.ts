import { vercelApiUrl } from "../../constants/main";
import { Locale, QueryType } from "../../types";
import Service from "../Service";
import {
  IDownloadWallpaperResponseData,
  IGetRelatedWallpapersResponseData,
  IGetWallpaperLocalesResponseData,
  IGetWallpaperResponseData,
  IGetWallpapersResponseData,
} from "./types";

export default class WallpaperService extends Service {
  static getWallpapers(query?: QueryType, locale?: Locale) {
    return this.request<IGetWallpapersResponseData>(
      "GET",
      "browser-extension/wallpapers",
      {
        query: { ...query, locale },
        locale,
        baseUrl: vercelApiUrl,
      },
    );
  }

  static getWallpaper(id: string | number, locale?: Locale) {
    return this.request<IGetWallpaperResponseData>("GET", `wallpapers/${id}`, {
      query: { locale },
      locale,
    });
  }

  static getWallpaperLocales(id: string | number) {
    return this.request<IGetWallpaperLocalesResponseData>(
      "GET",
      `wallpapers/${id}/locales`,
    );
  }

  static getRelatedWallpapers(
    id: string | number,
    query?: QueryType,
    locale?: Locale,
  ) {
    return this.request<IGetRelatedWallpapersResponseData>(
      "GET",
      `wallpapers/${id}/related`,
      {
        query: { ...query, locale },
        locale,
      },
    );
  }

  static downloadWallpaper(id: string | number) {
    return this.request<IDownloadWallpaperResponseData>(
      "PATCH",
      `downloads/${id}`,
    );
  }
}
