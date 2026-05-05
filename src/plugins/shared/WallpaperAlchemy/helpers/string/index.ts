export const checkString = (str: any): str is string => {
  try {
    if (typeof str !== "string") {
      return false;
    }

    if (!str) {
      return false;
    }

    if (!str.trim()) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};

export const checkObjectStrings = <T extends object>(object: T): boolean => {
  try {
    return !!Object.values(object).find((link) => checkString(link));
  } catch (error) {
    console.error(error);

    return false;
  }
};

export const startsWithHttp = (string: string): boolean => {
  return /^https?:\/\//.test(string);
};

export const shortenUrl = (string: string): string => {
  return string.replace(/^https?:\/\//, "");
};

export const capitalize = (string: string): string => {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const createSlug = (text: string): string => {
  return text
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s-]/g, "") // Remove all symbols except letters, numbers, spaces, and hyphens
    .trim() // Remove leading/trailing spaces
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
};
