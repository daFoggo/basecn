/**
 * UTIL FUNCTIONS FOR DATE FORMATTING OF DATA TABLES
 * DONT EDIT THIS FILE UNLESS YOU KNOW WHAT YOU ARE DOING
 */
export function formatDate(
  date: Date | string | number | undefined,
  opts: Intl.DateTimeFormatOptions = {},
) {
  if (!date) return "";

  try {
    return new Intl.DateTimeFormat("en-US", {
      month: opts.month ?? "long",
      day: opts.day ?? "numeric",
      year: opts.year ?? "numeric",
      ...opts,
    }).format(new Date(date));
  } catch (_err) {
    console.error("Error formatting date:", _err);
    return "_";
  }
}

/**
 * Format number to show in k format (e.g., 1557 => 1.6k)
 */
export function formatCompactNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  }
  return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
}
