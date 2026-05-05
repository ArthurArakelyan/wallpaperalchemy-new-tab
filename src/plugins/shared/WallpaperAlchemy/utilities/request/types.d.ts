import { Locale, QueryType } from "../../types";

export type RequestMethodType = "GET" | "DELETE" | "POST" | "PUT" | "PATCH";

export interface IRequestOptions<T> {
  body?: T;
  query?: QueryType;
  locale?: Locale;
  token?: string | null;
  timeout?: number;
  absolute?: boolean;
  baseUrl?: string;
  headers?: Record<string, string>;
}
