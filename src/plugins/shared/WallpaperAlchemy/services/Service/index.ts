import { checkIsResponseServerError } from "../../helpers/request";
import { timeout } from "../../helpers/timeout";
import { IBaseResponse } from "../../types";
import request from "../../utilities/request";
import {
  IRequestOptions,
  RequestMethodType,
} from "../../utilities/request/types";
import { IRetryConfig } from "./types";

class Service {
  protected static async request<T = any, D = any>(
    method: RequestMethodType,
    url: string,
    options?: IRequestOptions<D> & IRetryConfig<T>,
  ): Promise<IBaseResponse<T>> {
    const {
      maxRetries = 2,
      retryDelay = 1000,
      retryableMethods = ["GET"],
      shouldRetry = () => true,
      ...requestOptions
    } = options || {};

    let lastResponse: IBaseResponse<T> | null = null;
    let lastError: any = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await request<IBaseResponse<T>, D>(
          method,
          url,
          requestOptions,
        );

        lastResponse = response;

        if (!response || response.success) {
          return response;
        }

        if (
          retryableMethods.includes(method) &&
          attempt < maxRetries &&
          checkIsResponseServerError(response) &&
          shouldRetry(response, attempt)
        ) {
          const delay = retryDelay * Math.pow(2, attempt);

          await timeout(delay);

          continue;
        }

        return response;
      } catch (error: any) {
        // eslint-disable-next-line no-useless-assignment
        lastError = error;

        if (attempt >= maxRetries) {
          throw error;
        }

        throw error;
      }
    }

    if (lastError) {
      throw lastError;
    }

    return lastResponse!;
  }
}

export default Service;
