import { redirect } from "next/navigation";

const Page = () => {
  // return (
  //   <Suspense fallback={<PageLoader variant="bars" />}>
  //     <Landing />
  //   </Suspense>
  //   <
  // );
  redirect("/exercises");
};

export default Page;
