export interface IAppInfo {
  name?: string;
  description?: string;
  publicUrl?: string;
  ogImage?: string;
  githubUrl?: string;
  githubAuthor?: string;
  githubRepo?: string;
  authorWebsite?: string;
  contactEmail?: string;
}

export const APP_INFO: IAppInfo = {
  name: "basecn",
  description:
    "Essential components and features builts with shadcn/ui for kickstarting your Next.js projects.",
  publicUrl: "https://basecn.vercel.app",
  ogImage: "https://basecn.vercel.app/og-image.png",
  githubUrl: "https://github.com/daFoggo/basecn",
  githubAuthor: "daFoggo",
  githubRepo: "basecn",
  authorWebsite: "https://github.com/daFoggo",
  contactEmail: "ntgiang141105@gmail.com",
};
