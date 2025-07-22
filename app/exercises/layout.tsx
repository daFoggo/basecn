import { PageLoader } from "@/components/common/page-loader";
import AppHeader from "@/components/layout/app-header";
import { RootFooter } from "@/components/layout/root-footer";
import { Suspense } from "react";

const ExercisesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col min-h-svh">
          <PageLoader variant="dots" text="Loading exercises..." />
        </div>
      }
    >
      <div className="flex flex-col min-h-svh">
        <AppHeader />
        <main className="flex flex-col flex-1">{children}</main>
        <RootFooter />
      </div>
    </Suspense>
  );
};

export default ExercisesLayout;
