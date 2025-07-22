import { PageLoader } from "@/components/common/page-loader";
import ExerciseHeader from "@/components/layout/exercise-header";
import { Suspense } from "react";

const ExerciseDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col min-h-svh">
          <PageLoader variant="dots" text="Loading exercise details..." />
        </div>
      }
    >
      <div className="flex flex-col min-h-svh">
        <ExerciseHeader />
        <main className="flex flex-col flex-1">{children}</main>
      </div>
    </Suspense>
  );
};

export default ExerciseDetailLayout;
