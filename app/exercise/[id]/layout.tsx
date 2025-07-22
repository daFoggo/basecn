import ExerciseHeader from "@/components/layout/exercise-header";

const ExerciseDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <ExerciseHeader />
      <main className="flex flex-col flex-1">{children}</main>
    </div>
  );
};

export default ExerciseDetailLayout;
