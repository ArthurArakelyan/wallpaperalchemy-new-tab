import "./Loader.sass";

import { FC } from "react";

import { classNames } from "../../helpers/classNames";
import { ILoaderProps } from "./types";

const Loader: FC<ILoaderProps> = ({ size = "normal", className = "" }) => {
  return (
    <div
      className={classNames(
        `wallpaper-alchemy-loader-wrapper wallpaper-alchemy-loader-wrapper--${size} ${className}`,
      )}
    >
      <svg className="wallpaper-alchemy-loader" viewBox="22 22 44 44">
        <circle
          className="wallpaper-alchemy-loader__circle"
          cx="44"
          cy="44"
          r="20.2"
          fill="none"
          strokeWidth="3.6"
        />
      </svg>
    </div>
  );
};

export default Loader;
