import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TOOLBAR_MODE_OPTIONS } from "../constants";
import type { TToolbarMode } from "../types";

interface IToolbarModeTabsProps {
  value: TToolbarMode;
  onChange: (mode: TToolbarMode) => void;
}

export const ToolbarModeTabs = ({ value, onChange }: IToolbarModeTabsProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Toolbar Mode
      </p>

      <Tabs
        value={value}
        onValueChange={(v) => onChange(v as TToolbarMode)}
        className="w-full"
      >
        <TabsList>
          {TOOLBAR_MODE_OPTIONS.map((mode) => (
            <TabsTrigger key={mode.value} value={mode.value}>
              {mode.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
