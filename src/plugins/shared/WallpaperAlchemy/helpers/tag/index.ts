import { storageUrl } from "../../constants/main";
import { ITag, ITagLocalized } from "../../types";
import { lowerCaseImageExtension } from "../image";
import { checkString } from "../string";

export const getTagUrl = (tag: ITag | ITagLocalized): string => {
  return `/${tag.name}/wallpapers`;
};

export const getTagImage = (tag: ITag | ITagLocalized): string | null => {
  if (!checkString(tag.imageUrl)) {
    return null;
  }

  return `${storageUrl}${lowerCaseImageExtension(tag.imageUrl)}`;
};

export const getTagImageWidth = (
  tag: ITag | ITagLocalized,
): number | undefined => {
  return tag.width || undefined;
};

export const getTagImageHeight = (
  tag: ITag | ITagLocalized,
): number | undefined => {
  return tag.height || undefined;
};
