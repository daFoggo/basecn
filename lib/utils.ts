import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCompactNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  }
  return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
}

/**
 * 
 * @param enumObject The enum object to convert to options.
 * @returns An array of options with label and value properties.
 */
export const enumToOptions = <T extends Record<string, string>>(
  enumObject: T
): Array<{ label: string; value: T[keyof T] }> => {
  return Object.entries(enumObject).map(([, value]) => ({
    label: value,
    value: value as T[keyof T],
  }));
};
