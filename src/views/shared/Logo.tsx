import "./Logo.sass";

import type { FC } from "react";
import { useIntl } from "react-intl";

import { siteName } from "../../plugins/shared/WallpaperAlchemy/constants/main";
import {
  getLocalizedAbsoluteUrl,
  intlLocaleToWallpaperAlchemyLocale,
} from "../../plugins/shared/WallpaperAlchemy/utilities/i18n";

const Logo: FC = () => {
  const intl = useIntl();

  return (
    <a
      className="logo"
      href={getLocalizedAbsoluteUrl(
        "/",
        intlLocaleToWallpaperAlchemyLocale(intl.locale),
      )}
      target="_blank"
    >
      <img
        draggable={false}
        src="/icons/128.png"
        alt={siteName}
        width={32}
        height={32}
        loading="lazy"
        className="logoImage"
      />

      <h1 className="logoTitle">{siteName}</h1>
    </a>
  );
};

export default Logo;
