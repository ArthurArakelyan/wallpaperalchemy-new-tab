import "./wallpaperAlchemyCategories.sass";

import { type FC } from "react";
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

  const { item, go, handlePause } = useBackgroundRotation({
    fetch: () => fetchImages(intl.locale, data.tag),
    cacheObj: { cache, setCache },
    data,
    setData,
    loader,
    deps: [data.tag],
    buildUrl: (i: WallpaperAlchemyImage) => i.image,
    shouldFetchMore: false,
  });

  const url = item?.image || null;

  return (
    <BaseBackground
      containerClassName="WallpaperAlchemyCategories fullscreen"
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
