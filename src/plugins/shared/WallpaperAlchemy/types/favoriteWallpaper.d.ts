import { IWallpaper } from "@/types/wallpaper";

export interface IFavoriteWallpaper {
  id: number;
  wallpaperId: number;
  wallpaper: IWallpaper;
  createdAt: string;
}
