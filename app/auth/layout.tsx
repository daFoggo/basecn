import { NoNavHeader } from "@/components/layout/no-nav-header";
import { RootFooter } from "@/components/layout/root-footer";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="z-10 relative flex flex-col bg-background min-h-svh">
      <NoNavHeader />
      <main className="flex flex-col flex-1">{children}</main>
      <RootFooter />
    </div>
  );
};

export default AuthLayout;
