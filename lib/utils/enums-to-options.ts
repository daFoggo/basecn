/**
 * 
 * @param enumObject The enum object to convert to options.
 * @returns An array of options with label and value properties.
 */
export const enumsToOptions = <T extends Record<string, string>>(
  enumObject: T
): Array<{ label: string; value: T[keyof T] }> => {
  return Object.entries(enumObject).map(([, value]) => ({
    label: value,
    value: value as T[keyof T],
  }));
};
