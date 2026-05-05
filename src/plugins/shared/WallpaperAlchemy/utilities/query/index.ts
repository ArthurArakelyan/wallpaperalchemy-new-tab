import { QueryType } from "../../types";

export const createQueryParams = (params: QueryType): string => {
  const queryParamsString = Object.entries(params)
    .map(([key, value]) => {
      if (value === null || value === undefined) {
        return "";
      }

      if (Array.isArray(value)) {
        return value
          .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
          .join("&");
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter((param) => param !== "")
    .join("&");

  if (!queryParamsString.trim()) {
    return "";
  }

  return `?${queryParamsString}`;
};
