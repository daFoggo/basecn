import { PageLoader } from "@/components/common/page-loader";
import { RegisterForm } from "@/features/auth";
import { Suspense } from "react";

const RegisterPage = () => {
  return (
    <Suspense fallback={<PageLoader variant="bars" />}>
      <div className="flex flex-col justify-center items-center bg-muted min-h-svh">
        <div className="w-full max-w-sm md:max-w-3xl">
          <RegisterForm />
        </div>
      </div>
    </Suspense>
  );
};

export default RegisterPage;
