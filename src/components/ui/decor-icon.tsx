import { cn } from "@/lib/utils";

type DecorIconProps = {
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

export const DecorIcon = ({ className, position }: DecorIconProps) => {
  return (
    <div
      className={cn(
        "absolute -z-10 size-6 text-muted-foreground/20",
        position === "top-left" && "-left-3 -top-3",
        position === "top-right" && "-right-3 -top-3",
        position === "bottom-left" && "-left-3 -bottom-3",
        position === "bottom-right" && "-right-3 -bottom-3",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="size-full"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
    </div>
  );
};
