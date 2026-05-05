import { type FC } from "react";

import BaseSettings from "../base/BaseSettings";
import { defaultData, Props } from "./types";

const WallpaperAlchemyMostPopularWallpapersSettings: FC<Props> = ({
  data = defaultData,
  setData,
}) => {
  return (
    <div className="WallpaperAlchemyMostPopularWallpapersSettings">
      <BaseSettings data={data} setData={setData} />
    </div>
  );
};

export default WallpaperAlchemyMostPopularWallpapersSettings;
