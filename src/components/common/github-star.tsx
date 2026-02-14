import Link from "next/link";
import { Suspense, use } from "react";
import { toast } from "sonner";
import { SITE_CONFIG } from "@/configs/site";
import { GitHubIcon } from "../icons/github-icon";
import { Button } from "../ui/button";

const githubConfig = SITE_CONFIG.github;

const getStarsCount = async (): Promise<number> => {
  if (!githubConfig) return 0;
  try {
    const response = await fetch(
      `https://api.github.com/repos/${githubConfig.username}/${githubConfig.repo}`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) return 0;

    const data = await response.json();
    return data.stargazers_count as number;
  } catch (error) {
    toast.error("Failed to fetch GitHub stars");
    console.error("Failed to fetch GitHub stars:", error);
    return 0;
  }
};

const StarCount = ({ promise }: { promise: Promise<number> }) => {
  const stars = use(promise);
  const formattedStars = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(stars);

  return <span className="font-mono">{formattedStars}</span>;
};

const starsPromise = getStarsCount();

export const GitHubStar = () => {
  if (!githubConfig) return null;

  return (
    <Button variant="ghost" asChild>
      <Link
        href={`https://github.com/${githubConfig.username}/${githubConfig.repo}`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1"
      >
        <GitHubIcon className="size-4" />
        <Suspense
          fallback={<div className="size-4 animate-pulse rounded bg-muted" />}
        >
          <StarCount promise={starsPromise} />
        </Suspense>
      </Link>
    </Button>
  );
};
