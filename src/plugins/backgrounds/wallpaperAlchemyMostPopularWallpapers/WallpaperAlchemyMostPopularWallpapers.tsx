import { type FC } from "react";

import { useBackgroundRotation } from "../../../hooks";
import BaseBackground from "../base/BaseBackground";
import { fetchImages } from "./api";
import { defaultData, Image as WallpaperAlchemyImage, Props } from "./types";

const WallpaperAlchemyMostPopularWallpapers: FC<Props> = ({
  cache,
  data = defaultData,
  loader,
  setCache,
  setData,
}) => {
  const { item, go, handlePause } = useBackgroundRotation({
    fetch: () => fetchImages(),
    cacheObj: { cache, setCache },
    data,
    setData,
    loader,
    deps: [],
    buildUrl: (i: WallpaperAlchemyImage) => i.image,
    shouldFetchMore: false,
  });

  const url = item?.image || null;

  return (
    <BaseBackground
      containerClassName="WallpaperAlchemyMostPopularWallpapers fullscreen"
      url={url}
      showControls={true}
      controlsOnHover={!data.showControls}
      paused={data.paused ?? false}
      onPause={handlePause}
      onPrev={go(-1)}
      onNext={go(1)}
    />
  );
};

export default WallpaperAlchemyMostPopularWallpapers;
