import { defineMessages } from "react-intl";

import { Config } from "../../types";
import WallpaperAlchemyMostPopularWallpapers from "./WallpaperAlchemyMostPopularWallpapers";
import WallpaperAlchemyMostPopularWallpapersSettings from "./WallpaperAlchemyMostPopularWallpapersSettings";

// TODO: translations
const messages = defineMessages({
  name: {
    id: "backgrounds.wallpaperAlchemyMostPopularWallpapers.name",
    defaultMessage: "Wallpaper Alchemy - Most Popular Wallpapers",
    description: "Name of the wallpaperAlchemyMostPopularWallpapers background",
  },
  description: {
    id: "backgrounds.wallpaperAlchemyMostPopularWallpapers.description",
    defaultMessage: "The most popular wallpapers in Wallpaper Alchemy.",
    description:
      "Description of the wallpaperAlchemyMostPopularWallpapers background",
  },
});

const config: Config = {
  key: "background/wallpaperAlchemyMostPopularWallpapers",
  name: messages.name,
  description: messages.description,
  dashboardComponent: WallpaperAlchemyMostPopularWallpapers,
  settingsComponent: WallpaperAlchemyMostPopularWallpapersSettings,
  supportsBackdrop: true,
};

export default config;
