import { redirect } from "next/navigation";

const MonitoringPage = async ({
  params,
}: {
  params: Promise<{ organizationSlug: string; projectSlug: string }>;
}) => {
  const { organizationSlug, projectSlug } = await params;
  redirect(`/${organizationSlug}/${projectSlug}/monitoring/overview`);
};

export default MonitoringPage;
