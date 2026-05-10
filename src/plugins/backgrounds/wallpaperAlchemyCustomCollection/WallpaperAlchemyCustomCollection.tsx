import "./WallpaperAlchemyCustomCollection.sass";

import { type FC } from "react";
import { useIntl } from "react-intl";

import { useBackgroundRotation } from "../../../hooks";
import BaseBackground from "../base/BaseBackground";
import { fetchImages } from "./api";
import { defaultData, Image as WallpaperAlchemyImage, Props } from "./types";

const WallpaperAlchemyCustomCollection: FC<Props> = ({
  cache,
  data = defaultData,
  loader,
  setCache,
  setData,
}) => {
  const intl = useIntl();

  const { item, go, handlePause } = useBackgroundRotation({
    fetch: () => fetchImages(data.ids, intl.locale),
    cacheObj: { cache, setCache },
    data,
    setData,
    loader,
    deps: [data.ids.join(",")],
    buildUrl: (i: WallpaperAlchemyImage) => i.image,
    shouldFetchMore: false,
  });

  const url = item?.image || null;

  return (
    <BaseBackground
      containerClassName="WallpaperAlchemyCustomCollection fullscreen"
      url={url}
      showControls={data.ids.length > 1}
      controlsOnHover={!data.showControls}
      paused={data.paused ?? false}
      onPause={handlePause}
      onPrev={go(-1)}
      onNext={go(1)}
    />
  );
};

export default WallpaperAlchemyCustomCollection;
