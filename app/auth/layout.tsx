import { RootFooter } from "@/components/layout/root-footer";
import RootHeader from "@/components/layout/root-header";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-svh">
      <RootHeader />
      <main className="flex flex-col flex-1">{children}</main>
      <RootFooter />
    </div>
  );
};

export default AuthLayout;
