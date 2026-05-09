import { FC } from "react";

import CheckIcon from "../../shared/WallpaperAlchemy/components/Icon/icons/Check";
import { getWallpaperCardImage } from "../../shared/WallpaperAlchemy/helpers/wallpaper";
import { IWallpaper } from "../../shared/WallpaperAlchemy/types";

type Props = {
  wallpaper: IWallpaper;
  isSelected: boolean;
  onSelect: (wallpaper: IWallpaper) => any;
};

const WallpaperAlchemyCustomCollectionSettingsCard: FC<Props> = ({
  wallpaper,
  isSelected,
  onSelect,
}) => {
  const cardImage = getWallpaperCardImage(wallpaper);

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
          alt={wallpaper.name}
          width={wallpaper.width}
          height={wallpaper.height}
          loading="lazy"
          className="customWallpaperImage"
        />
      </div>
    </button>
  );
};

export default WallpaperAlchemyCustomCollectionSettingsCard;
