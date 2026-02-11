import { redirect } from "next/navigation";

const ProjectPage = async ({
  params,
}: {
  params: Promise<{ organizationSlug: string; projectSlug: string }>;
}) => {
  const { organizationSlug, projectSlug } = await params;
  redirect(`/${organizationSlug}/${projectSlug}/overview`);
};

export default ProjectPage;
