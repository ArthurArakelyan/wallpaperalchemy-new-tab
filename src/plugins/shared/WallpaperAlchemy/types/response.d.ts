import { IPageInfo } from "@/types/pagination";

export interface IBaseResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
}

export interface IPaginationResponse<T = any, D = object> extends D {
  data: T[];
  pageInfo: IPageInfo;
}
