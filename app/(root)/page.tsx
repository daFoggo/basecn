import { LoaderPage } from "@/components/common/loaderPage";
import { DiceUITable } from "@/features/dice_ui_table";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<LoaderPage variant="bars" />}>
      <DiceUITable />
    </Suspense>
  );
};

export default Page;
