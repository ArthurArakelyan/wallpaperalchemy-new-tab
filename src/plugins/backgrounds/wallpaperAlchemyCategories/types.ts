import { RotatingCache } from "../../../hooks";
import { API } from "../../types";

export interface Data {
  tag?: number;
  paused?: boolean;
  timeout: number;
  showControls: boolean;
}

export interface Image {
  image: string;
}

type Cache = RotatingCache<Image>;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  paused: false,
  timeout: 900,
  showControls: true,
};
