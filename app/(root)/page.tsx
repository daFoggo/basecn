import { PageLoader } from "@/components/common/page-loader";
import { Landing } from "@/features/landing";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<PageLoader variant="bars" />}>
      <Landing />
    </Suspense>
  );
};

export default Page;
