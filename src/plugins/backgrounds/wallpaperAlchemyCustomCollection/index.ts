import { defineMessages } from "react-intl";

import { Config } from "../../types";
import WallpaperAlchemyCustomCollection from "./WallpaperAlchemyCustomCollection";
import WallpaperAlchemyCustomCollectionSettings from "./WallpaperAlchemyCustomCollectionSettings";

const messages = defineMessages({
  name: {
    id: "backgrounds.wallpaperAlchemyCustomCollection.name",
    defaultMessage: "Wallpaper Alchemy - Custom Collection",
    description: "Name of the wallpaperAlchemyCustomCollection background",
  },
  description: {
    id: "backgrounds.wallpaperAlchemyCustomCollection.description",
    defaultMessage: "Build your own collection of wallpapers.",
    description:
      "Description of the wallpaperAlchemyCustomCollection background",
  },
});

const config: Config = {
  key: "background/wallpaperAlchemyCustomCollection",
  name: messages.name,
  description: messages.description,
  dashboardComponent: WallpaperAlchemyCustomCollection,
  settingsComponent: WallpaperAlchemyCustomCollectionSettings,
  supportsBackdrop: true,
};

export default config;
