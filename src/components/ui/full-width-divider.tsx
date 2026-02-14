import { cn } from "@/lib/utils";

export function FullWidthDivider({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("absolute left-0 right-0 h-px bg-border", className)}
      {...props}
    />
  );
}
