import { LoaderPage } from "@/components/common/loaderPage";
import { Landing } from "@/features/landing";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<LoaderPage variant="bars" />}>
      <Landing />
    </Suspense>
  );
};

export default Page;
