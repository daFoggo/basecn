import { RootFooter } from "@/components/layout/root-footer";
import { RootHeader } from "@/components/layout/root-header";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="z-10 relative flex flex-col bg-background min-h-svh">
      <RootHeader />
      <main className="flex flex-col flex-1 mx-auto container">{children}</main>
      <RootFooter />
    </div>
  );
};

export default RootLayout;
