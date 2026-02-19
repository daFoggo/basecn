"use client";

import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TToolbarMode = "standard" | "filter-list" | "filter-menu";

interface IToolbarModeSwitcherProps {
  value: TToolbarMode;
  onChange: (mode: TToolbarMode) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TOOLBAR_MODES: { value: TToolbarMode; label: string }[] = [
  { value: "standard", label: "Standard Toolbar" },
  { value: "filter-list", label: "Filter List" },
  { value: "filter-menu", label: "Filter Menu" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const ToolbarModeSwitcher = ({
  value,
  onChange,
}: IToolbarModeSwitcherProps) => {
  return (
    <div className="flex items-center rounded-lg border bg-muted/30 p-1">
      {TOOLBAR_MODES.map((mode) => (
        <button
          key={mode.value}
          type="button"
          onClick={() => onChange(mode.value)}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
            value === mode.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
};
