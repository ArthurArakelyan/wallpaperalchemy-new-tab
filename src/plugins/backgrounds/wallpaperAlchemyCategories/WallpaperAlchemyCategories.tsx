import "./wallpaperAlchemyCategories.sass";

import { type FC, useEffect } from "react";
import { useIntl } from "react-intl";

import { useBackgroundRotation } from "../../../hooks";
import BaseBackground from "../base/BaseBackground";
import { fetchImages } from "./api";
import { defaultData, Image as WallpaperAlchemyImage, Props } from "./types";

const WallpaperAlchemyCategories: FC<Props> = ({
  cache,
  data = defaultData,
  loader,
  setCache,
  setData,
}) => {
  const intl = useIntl();

  // If legacy cache design, clear and let the new cache take over
  // Unfortunately, without the image src being stored, I cannot migrate the old cache
  if (cache && "now" in cache) {
    cache = undefined;
  }

  // Migrate old pause setting
  useEffect(() => {
    if (data.timeout === Number.MAX_SAFE_INTEGER) {
      setData({
        ...data,
        paused: true,
        timeout: defaultData.timeout,
      });
    }
  }, []);

  const { item, go, handlePause } = useBackgroundRotation({
    fetch: () => fetchImages(intl.locale, data.tag),
    cacheObj: { cache, setCache },
    data,
    setData,
    loader,
    deps: [data.tag],
    buildUrl: (i: WallpaperAlchemyImage) => i.image,
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

export default WallpaperAlchemyCategories;
