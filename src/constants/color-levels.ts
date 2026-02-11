/**
 * Centralized color level system inspired by Vercel/Geist Design.
 * Provides consistent solid and subtle color variants.
 */

// ---------------------------------------------------------------------------
// Color Level Definitions
// ---------------------------------------------------------------------------

export type TColorLevel =
  // Semantic
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  // Colors
  | "gray"
  | "blue"
  | "purple"
  | "amber"
  | "red"
  | "pink"
  | "green"
  | "teal"
  | "inverted";

export interface IColorLevelValues {
  /** Solid background (high contrast) */
  bg: string;
  /** Subtle background (low contrast) */
  bgSubtle: string;
  /** Text color (usually for use on subtle bg) */
  text: string;
  /** Border color (usually for use on subtle bg) */
  border: string;
  /** Dot/Indicator color (usually same as solid bg) */
  dot: string;
}

const GEIST_COLORS: Record<string, IColorLevelValues> = {
  gray: {
    bg: "bg-zinc-600 dark:bg-zinc-500",
    bgSubtle: "bg-zinc-100 dark:bg-zinc-800/50",
    text: "text-zinc-700 dark:text-zinc-300",
    border: "border-zinc-200 dark:border-zinc-700",
    dot: "bg-zinc-600 dark:bg-zinc-400",
  },
  blue: {
    bg: "bg-blue-600 dark:bg-blue-500",
    bgSubtle: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
    dot: "bg-blue-600 dark:bg-blue-500",
  },
  purple: {
    bg: "bg-purple-600 dark:bg-purple-500",
    bgSubtle: "bg-purple-50 dark:bg-purple-900/20",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-800",
    dot: "bg-purple-600 dark:bg-purple-500",
  },
  amber: {
    bg: "bg-amber-600 dark:bg-amber-500",
    bgSubtle: "bg-amber-50 dark:bg-amber-900/20",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
    dot: "bg-amber-600 dark:bg-amber-500",
  },
  red: {
    bg: "bg-red-600 dark:bg-red-500",
    bgSubtle: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-700 dark:text-red-300",
    border: "border-red-200 dark:border-red-800",
    dot: "bg-red-600 dark:bg-red-500",
  },
  pink: {
    bg: "bg-pink-600 dark:bg-pink-500",
    bgSubtle: "bg-pink-50 dark:bg-pink-900/20",
    text: "text-pink-700 dark:text-pink-300",
    border: "border-pink-200 dark:border-pink-800",
    dot: "bg-pink-600 dark:bg-pink-500",
  },
  green: {
    bg: "bg-emerald-600 dark:bg-emerald-500",
    bgSubtle: "bg-emerald-50 dark:bg-emerald-900/20",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800",
    dot: "bg-emerald-600 dark:bg-emerald-500",
  },
  teal: {
    bg: "bg-teal-600 dark:bg-teal-500",
    bgSubtle: "bg-teal-50 dark:bg-teal-900/20",
    text: "text-teal-700 dark:text-teal-300",
    border: "border-teal-200 dark:border-teal-800",
    dot: "bg-teal-600 dark:bg-teal-500",
  },
  inverted: {
    bg: "bg-foreground",
    bgSubtle: "bg-muted",
    text: "text-background",
    border: "border-foreground",
    dot: "bg-foreground",
  },
};

export const COLOR_LEVELS: Record<TColorLevel, IColorLevelValues> = {
  // Direct colors
  gray: GEIST_COLORS.gray,
  blue: GEIST_COLORS.blue,
  purple: GEIST_COLORS.purple,
  amber: GEIST_COLORS.amber,
  red: GEIST_COLORS.red,
  pink: GEIST_COLORS.pink,
  green: GEIST_COLORS.green,
  teal: GEIST_COLORS.teal,
  inverted: GEIST_COLORS.inverted,

  // Semantic mapping
  success: GEIST_COLORS.green,
  warning: GEIST_COLORS.amber,
  danger: GEIST_COLORS.red,
  info: GEIST_COLORS.blue,
  neutral: GEIST_COLORS.gray,
};

// ---------------------------------------------------------------------------
// Helper: createLevelConfig
// ---------------------------------------------------------------------------

type TLevelConfigEntry<
  TExtra extends Record<string, unknown> = Record<string, unknown>,
> = {
  level: TColorLevel;
  label: string;
} & TExtra;

type TLevelConfigResult<
  TExtra extends Record<string, unknown> = Record<string, unknown>,
> = IColorLevelValues & {
  level: TColorLevel;
  label: string;
} & TExtra;

/**
 * Creates a type-safe config by merging color level values with your custom data.
 */
export const createLevelConfig = <
  TKey extends string,
  TExtra extends Record<string, unknown> = Record<string, unknown>,
>(
  config: Record<TKey, TLevelConfigEntry<TExtra>>,
): Record<TKey, TLevelConfigResult<TExtra>> => {
  const result = {} as Record<TKey, TLevelConfigResult<TExtra>>;

  for (const key of Object.keys(config) as TKey[]) {
    const { level, ...rest } = config[key];
    const colorValues = COLOR_LEVELS[level] || COLOR_LEVELS.neutral;

    result[key] = {
      ...colorValues,
      level,
      ...rest,
    } as TLevelConfigResult<TExtra>;
  }

  return result;
};
