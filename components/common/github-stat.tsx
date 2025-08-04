"use client";

import Link from "next/link";
import { APP_INFO } from "@/lib/configs/app-info";
import { useGithubStars } from "@/lib/hooks/use-github-stars";
import { formatCompactNumber } from "@/lib/utils/format-number";
import { GitHubIcon } from "./icons";

const GithubStat = () => {
	const { stargazersCount } = useGithubStars(
		APP_INFO?.githubAuthor || "",
		APP_INFO?.githubRepo || "",
	);

	return (
		<Link
			href={APP_INFO?.githubUrl || ""}
			target="_blank"
			rel="noopener noreferrer"
			className="flex items-center gap-2 font-semibold"
		>
			<GitHubIcon className="size-4" />
			<span>{formatCompactNumber(stargazersCount)}</span>
		</Link>
	);
};

export default GithubStat;
