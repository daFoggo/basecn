import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EXERCISE_LEVEL } from "../utils/constants";

interface IExerciseLevelBadgeProps {
  level: EXERCISE_LEVEL;
  className?: string;
}

export const ExerciseLevelBadge = ({ level, className }: IExerciseLevelBadgeProps) => {
  return (
    <Badge
      className={cn(
        "font-medium text-xs",
        level === EXERCISE_LEVEL.EASY
          ? "bg-green-500/10 text-green-500"
          : level === EXERCISE_LEVEL.MEDIUM
          ? "bg-yellow-500/10 text-yellow-500"
          : "bg-red-500/10 text-red-500",
        className
      )}
    >
      {level}
    </Badge>
  );
};
