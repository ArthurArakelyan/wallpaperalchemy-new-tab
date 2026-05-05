import { Locale, QueryType } from "../../types";
import Service from "../Service";
import {
  IGetTagLocalesResponseData,
  IGetTagResponseData,
  IGetTagsResponseData,
} from "./types";

export default class TagService extends Service {
  static getTags(query?: QueryType, locale?: Locale) {
    return this.request<IGetTagsResponseData>("GET", "tags", {
      query: { ...query, locale },
      locale,
    });
  }

  static getTag(id: string | number, locale?: Locale) {
    return this.request<IGetTagResponseData>("GET", `tags/${id}`, {
      query: { locale },
      locale,
    });
  }

  static getTagLocales(id: string | number) {
    return this.request<IGetTagLocalesResponseData>(
      "GET",
      `tags/${id}/locales`,
    );
  }
}
