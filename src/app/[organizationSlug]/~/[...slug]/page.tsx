import { formatSlugToTitle } from "@/utils/navigation";

const OrgCatchAllPage = async ({
  params,
}: {
  params: Promise<{ organizationSlug: string; slug: string[] }>;
}) => {
  const { slug } = await params;
  const pageTitle = formatSlugToTitle(slug[slug.length - 1]);

  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="text-2xl font-semibold">{pageTitle}</h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
};

export default OrgCatchAllPage;
