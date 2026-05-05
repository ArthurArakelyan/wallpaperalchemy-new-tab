import { storageUrl } from "@/constants/main";
import { lowerCaseImageExtension } from "@/helpers/image";
import { checkString } from "@/helpers/string";
import { ITag, ITagLocalized } from "@/types";

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

export const getTagGtagData = (tag: ITag | ITagLocalized) => {
  return {
    id: tag.id,
    name: tag.name,
    title: tag.title,
    image: getTagImage(tag) || "",
  };
};
