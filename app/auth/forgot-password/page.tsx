import { LoaderPage } from "@/components/common/loaderPage";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { Suspense } from "react";

const ForgotPasswordPage = () => {
  return (
    <Suspense fallback={<LoaderPage variant="bars" />}>
      <div className="flex flex-col justify-center items-center bg-muted p-6 min-h-svh">
        <div className="w-full max-w-sm md:max-w-3xl">
          <ForgotPasswordForm />
        </div>
      </div>
    </Suspense>
  );
};

export default ForgotPasswordPage;
