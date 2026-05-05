import { IBaseResponse } from "../../types";
import { RequestMethodType } from "../../utilities/request/types";

export interface IRetryConfig<T = any> {
  maxRetries?: number;
  retryDelay?: number;
  retryableMethods?: RequestMethodType[];
  shouldRetry?: (response: IBaseResponse<T>, attempt: number) => boolean;
}
