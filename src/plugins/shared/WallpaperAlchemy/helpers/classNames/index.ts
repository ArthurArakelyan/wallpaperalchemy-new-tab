export const classNames = (string: string): string => {
  try {
    return string.trim();
  } catch (error) {
    console.error(error);

    return string;
  }
};
