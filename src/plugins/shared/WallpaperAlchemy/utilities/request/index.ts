import { errorCodes } from "../../constants/errorCodes";
import { defaultLocale } from "../../constants/i18n";
import { apiUrl } from "../../constants/main";
import { baseRequestTimeout } from "../../constants/request";
import json from "../json";
import { createQueryParams } from "../query";
import { IRequestOptions, RequestMethodType } from "./types";

const request = async <T = never, D = never>(
  method: RequestMethodType,
  url: string,
  options: IRequestOptions<D> = {},
): Promise<T> => {
  const {
    body,
    query = {},
    locale = defaultLocale,
    // TODO: Implement Wallpaper Alchemy auth
    token = null,
    timeout = baseRequestTimeout,
    absolute = false,
    baseUrl = apiUrl,
    headers = {},
  } = options;

  const isFormData = body instanceof FormData;

  const abortController = new AbortController();

  const fetchPromise = fetch(
    absolute
      ? `${url}${createQueryParams(query)}`
      : `${baseUrl}/${url}${createQueryParams(query)}`,
    {
      method: method,
      body: isFormData ? body : body ? json.stringify(body) : undefined,
      signal: abortController.signal,
      headers: {
        "X-Accept-Language": locale,
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
        ...(!isFormData
          ? {
              "Content-Type": "application/json",
            }
          : {}),
        ...headers,
      },
    },
  );

  const timeoutPromise =
    timeout !== Infinity
      ? new Promise<never>((_, reject) => {
          setTimeout(() => {
            abortController.abort(errorCodes.TIMEOUT);

            reject(new Error(errorCodes.TIMEOUT));
          }, timeout);
        })
      : null;

  try {
    const response = timeoutPromise
      ? await Promise.race([fetchPromise, timeoutPromise])
      : await fetchPromise;

    return await response.json();
  } catch (error) {
    console.error(`${method} ${url} ${error}`);

    if (abortController.signal.reason) {
      throw new Error(abortController.signal.reason, { cause: error });
    }

    throw error;
  }
};

export default request;
