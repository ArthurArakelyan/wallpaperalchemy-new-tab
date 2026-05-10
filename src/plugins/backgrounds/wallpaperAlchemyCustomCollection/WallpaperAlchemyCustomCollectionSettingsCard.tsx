import { FC } from "react";

import CheckIcon from "../../shared/WallpaperAlchemy/components/Icon/icons/Check";
import { getWallpaperCardImage } from "../../shared/WallpaperAlchemy/helpers/wallpaper";
import { IWallpaper } from "../../shared/WallpaperAlchemy/types";
import { Image } from "./types";

type Props = {
  wallpaper: IWallpaper | Image;
  isSelected: boolean;
  onSelect: (wallpaper: IWallpaper | Image) => any;
};

const WallpaperAlchemyCustomCollectionSettingsCard: FC<Props> = ({
  wallpaper,
  isSelected,
  onSelect,
}) => {
  const cardImage =
    "name" in wallpaper ? getWallpaperCardImage(wallpaper) : wallpaper.image;

  return (
    <button
      type="button"
      onClick={() => onSelect(wallpaper)}
      className={`customWallpaper ${isSelected ? "customWallpaper--selected" : ""}`}
    >
      <div className="customWallpaperSelected">
        <CheckIcon className="customWallpaperSelectedIcon" />
      </div>

      <div className="customWallpaperImageWrapper">
        <img
          draggable={false}
          src={cardImage}
          alt={(wallpaper as IWallpaper).name || undefined}
          width={(wallpaper as IWallpaper).width || undefined}
          height={(wallpaper as IWallpaper).height || undefined}
          loading="lazy"
          className="customWallpaperImage"
        />
      </div>
    </button>
  );
};

export default WallpaperAlchemyCustomCollectionSettingsCard;
