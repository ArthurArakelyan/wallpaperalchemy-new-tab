import { Dictionary } from "@/types/i18n";

export interface ITagGeneral {
  id: number;
  name: string;
  title: string;
  imageUrl: string | null;
  width: number | null;
  height: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ITagLocalized extends ITagGeneral {
  locales: Required<Dictionary<string>>;
}

export type ITag = ITagGeneral;
