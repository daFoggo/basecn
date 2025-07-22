import { MarkdownKatexRenderer } from "@/components/common/markdown-katex-renderer";
import { Typography } from "@/components/common/typography";
import { Separator } from "@/components/ui/separator";
import type { IExercise } from "../utils/types";
import { ExerciseLevelBadge } from "./exercise-level-badge";

export interface IExerciseDescriptionProps {
  exerciseData: IExercise;
}

export const ExerciseDescription = ({
  exerciseData,
}: IExerciseDescriptionProps) => {
  return (
    <div className="flex flex-col gap-3 w-full h-full min-h-0">
      <div className="flex-shrink-0">
        <Typography variant="h2">{exerciseData.name}</Typography>
        <ExerciseLevelBadge
          level={exerciseData.level}
          className="font-semibold text-sm"
        />
      </div>
      <Separator className="flex-shrink-0" />
      <div className="relative flex-1 min-h-0">
        <div className="absolute inset-0 overflow-y-auto">
          <MarkdownKatexRenderer content={exerciseData.statement} />
        </div>
      </div>
    </div>
  );
};
