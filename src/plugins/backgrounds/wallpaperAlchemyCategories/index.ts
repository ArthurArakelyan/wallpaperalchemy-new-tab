import { defineMessages } from "react-intl";

import { Config } from "../../types";
import WallpaperAlchemyCategories from "./WallpaperAlchemyCategories";
import WallpaperAlchemyCategoriesSettings from "./WallpaperAlchemyCategoriesSettings";

const messages = defineMessages({
  name: {
    id: "backgrounds.wallpaperAlchemyCategories.name",
    defaultMessage: "Wallpaper Alchemy - Categories",
    description: "Name of the wallpaperAlchemyCategories background",
  },
  description: {
    id: "backgrounds.wallpaperAlchemyCategories.description",
    defaultMessage: "A category of wallpapers.",
    description: "Description of the wallpaperAlchemyCategories background",
  },
});

const config: Config = {
  key: "background/wallpaperAlchemyCategories",
  name: messages.name,
  description: messages.description,
  dashboardComponent: WallpaperAlchemyCategories,
  settingsComponent: WallpaperAlchemyCategoriesSettings,
  supportsBackdrop: true,
};

export default config;
