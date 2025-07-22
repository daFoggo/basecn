import { PageLoader } from "@/components/common/page-loader";
import { RootFooter } from "@/components/layout/root-footer";
import RootHeader from "@/components/layout/root-header";
import { Suspense } from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col min-h-svh">
          <PageLoader variant="dots" text="Loading page..." />
        </div>
      }
    >
      <div className="relative flex flex-col bg-background min-h-svh">
        <RootHeader />
        <main className="flex flex-col flex-1">{children}</main>
        <RootFooter />
      </div>
    </Suspense>
  );
};

export default RootLayout;
