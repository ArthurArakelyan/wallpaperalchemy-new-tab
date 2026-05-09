export const arrayFromNumber = (n: number): number[] => {
  return Array.from({ length: n }, (_, i) => i);
};

export const uniqueById = <T extends { id: string | number }>(
  arr1: T[],
  arr2: T[],
): T[] => {
  const map = new Map<string | number, T>();

  [...arr1, ...arr2].forEach((item) => map.set(item.id, item));

  return Array.from(map.values());
};
