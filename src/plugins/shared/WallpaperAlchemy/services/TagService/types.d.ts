import { IPaginationResponse, ITag, ITagLocalized } from "../../types";

export type IGetTagsResponseData = IPaginationResponse<ITag>;

export type IGetTagResponseData = ITag;

export type IGetTagLocalesResponseData = ITagLocalized;
