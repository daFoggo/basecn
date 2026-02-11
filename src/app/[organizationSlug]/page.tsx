import { redirect } from "next/navigation";

const OrganizationPage = async ({
  params,
}: {
  params: Promise<{ organizationSlug: string }>;
}) => {
  const { organizationSlug } = await params;
  redirect(`/${organizationSlug}/projects`);
};

export default OrganizationPage;
