import { IDimensions } from "../../types";
import { checkString } from "../string";
import { IAspectRatio } from "./types";

export const getAspectRatio = (width: number, height: number): IAspectRatio => {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

  const divisor = gcd(width, height);

  return {
    width: width / divisor,
    height: height / divisor,
  };
};

export const lowerCaseImageExtension = (url: string): string => {
  const parts = url.split(".");

  if (parts.length > 1) {
    parts[parts.length - 1] = parts[parts.length - 1].toLowerCase();
  }

  return parts.join(".");
};

export const getImageExtension = (url: string): string => {
  const parts = lowerCaseImageExtension(url).split(".");

  return parts[parts.length - 1];
};

export const getIsImageMobile = (width: number, height: number) => {
  return height > width;
};

export const getIsImageDesktop = (width: number, height: number) => {
  return !getIsImageMobile(width, height);
};

export const getEncodingFormat = (url: string): string | null => {
  const ext = getImageExtension(url);

  const map: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    avif: "image/avif",
  };

  return ext ? (map[ext] ?? null) : null;
};

export const getImageDimensions = (
  url: string | null | undefined,
): Promise<IDimensions> => {
  return new Promise((resolve, reject) => {
    if (!checkString(url)) {
      return reject(new Error("Could not load image"));
    }

    const img = new Image();

    img.onload = function () {
      resolve({
        width: img.width,
        height: img.height,
      });
    };

    img.onerror = function () {
      reject(new Error("Could not load image"));
    };

    img.src = url;
  });
};
