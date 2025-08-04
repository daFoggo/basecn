import { cn } from "@/lib/utils/tailwind"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent rounded-md animate-pulse", className)}
      {...props}
    />
  )
}

export { Skeleton }
