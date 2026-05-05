export type Locale =
  | "en"
  | "zh-CN"
  | "hi"
  | "es"
  | "fr"
  | "ar"
  | "pt"
  | "bn"
  | "ru"
  | "ur"
  | "id"
  | "fa"
  | "de"
  | "ja"
  | "tr"
  | "vi"
  | "ta"
  | "it"
  | "tl"
  | "ha"
  | "sw"
  | "ko"
  | "th"
  | "nl"
  | "pl"
  | "ro"
  | "bg"
  | "el"
  | "sv"
  | "sr"
  | "he";

export type ModifiedLocale = "x-default" | Locale;

export type Dictionary<T = any> = Partial<Record<Locale, T>>;

export type Direction = "ltr" | "rtl";
