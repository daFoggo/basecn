import { cn } from "@/lib/utils";
import { FILTER_TYPE_LEGEND } from "../constants";

export const FilterTypeDescription = () => {
  return (
    <div className="flex flex-col items-start gap-2 rounded-lg border border-dashed bg-muted/30 p-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Filter variants
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {FILTER_TYPE_LEGEND.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-1 text-xs text-muted-foreground"
          >
            <span className={cn("size-2 rounded-full shrink-0", item.color)} />
            <span className="font-medium text-foreground">{item.label}</span>
            <span>- {item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
