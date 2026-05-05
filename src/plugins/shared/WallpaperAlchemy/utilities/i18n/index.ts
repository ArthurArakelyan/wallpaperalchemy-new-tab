import { defaultLocale, locales, rtlLocales } from "../../constants/i18n";
import { ogRelativeUrl, ogUrl, url as siteUrl } from "../../constants/main";
import { Dictionary, Direction, Locale, ModifiedLocale } from "../../types";
import json from "../json";
import { ITranslateOptions } from "./types";

export const t = <T = string>(
  locale: Locale,
  locales: Partial<Record<Locale, T>>,
  options: ITranslateOptions = {},
): T => {
  const { ignoreError = false } = options;

  const translation = locales[locale];

  if (translation === undefined) {
    if (!ignoreError) {
      console.error(
        `"${locale}" translation is not found in ${json.stringify(locales)}`,
      );
    }

    return locales[defaultLocale]!;
  }

  return translation;
};

export const dictionary = (dictionary: Dictionary): Dictionary => dictionary;

export const getLocalizedUrl = (locale: Locale): string => {
  return `${siteUrl}${locale !== defaultLocale ? `/${locale}` : ""}`;
};

export const getLocalizedAbsoluteUrl = (
  url: string,
  locale: Locale,
): string => {
  const isNotDefault = locale !== defaultLocale;

  return `${siteUrl}${isNotDefault ? `/${locale}` : ""}${isNotDefault && url === "/" ? "" : url}`;
};

export const getLocalizedRelativeUrl = (
  url: string,
  locale: Locale,
): string => {
  const isNotDefault = locale !== defaultLocale;

  return `${isNotDefault ? `/${locale}` : ""}${isNotDefault && url === "/" ? "" : url}`;
};

export const getLocalizedOgUrl = (locale: Locale): string => {
  return `${ogUrl}/${locale}`;
};

export const getLocalizedOgRelativeUrl = (locale: Locale): string => {
  return `${ogRelativeUrl}/${locale}`;
};

export const getModifiedLocales = (locales: Locale[]): ModifiedLocale[] => {
  return ["x-default", ...locales];
};

export const getNotModifiedLocale = (locale: ModifiedLocale): Locale => {
  if (locale === "x-default") {
    return "en";
  }

  return locale;
};

export const getDirection = (locale: Locale): Direction => {
  if (rtlLocales.includes(locale)) {
    return "rtl";
  }

  return "ltr";
};

export const getIsRtl = (locale: Locale): boolean => {
  return getDirection(locale) === "rtl";
};

export const getLocale = (locale: string | null | undefined): Locale => {
  if (locales.includes(locale as Locale)) {
    return locale as Locale;
  }

  return defaultLocale;
};

// export const getClientLocale = (): Locale => {
//   try {
//     return getLocale(document.documentElement.getAttribute('lang'));
//   } catch (error) {
//     console.error(error);
//
//     return defaultLocale;
//   }
// };

export const getDeviceLocale = (): string => {
  try {
    return navigator.language || "unknown";
  } catch (error) {
    console.error(error);

    return "unknown";
  }
};

export const intlLocaleToWallpaperAlchemyLocale = (
  locale: string,
  defaultLocale: Locale = "en",
): Locale => {
  const map: Record<string, Locale> = {
    en: "en",
    "en-AU": "en",
    "en-CA": "en",
    "en-GB": "en",
    "zh-CN": "zh-CN",
    "zh-TW": "zh-CN",
    hi: "hi",
    es: "es",
    fr: "fr",
    ar: "ar",
    pt: "pt",
    "pt-BR": "pt",
    ru: "ru",
    id: "id",
    fa: "fa",
    de: "de",
    ja: "ja",
    tr: "tr",
    vi: "vi",
    ta: "ta",
    it: "it",
    ko: "ko",
    "ko-KP": "ko",
    th: "th",
    nl: "nl",
    pl: "pl",
    ro: "ro",
    el: "el",
    sv: "sv",
    sr: "sr",
    he: "he",
  };

  return map[locale] ?? defaultLocale;
};
