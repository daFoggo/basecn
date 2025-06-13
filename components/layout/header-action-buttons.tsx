"use client";
import { APP_CONFIG } from "@/lib/config/app";
import { formatCompactNumber } from "@/lib/format";
import { motion } from "framer-motion";
import { GitHubIcon } from "../common/icons";
import { ThemeSwitcher } from "../common/theme-switcher";
import { Button } from "../ui/button";
import { RootHeaderNavigateButton } from "./root-header-navigate-button";
import { useGithubStars } from "@/lib/hooks/use-github-stars";

interface IHeaderActionButtonsProps {
  showNavigationButton?: boolean;
}

const HeaderActionButtons = ({
  showNavigationButton = true,
}: IHeaderActionButtonsProps) => {
  const { stargazersCount } = useGithubStars("daFoggo", "basecn");
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.45 }}
      >
        <Button variant="ghost" asChild>
          <a
            href={APP_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold"
          >
            <GitHubIcon className="size-4" />
            {stargazersCount > 0 && formatCompactNumber(stargazersCount)}
          </a>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <ThemeSwitcher />
      </motion.div>

      {showNavigationButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <RootHeaderNavigateButton />
        </motion.div>
      )}
    </>
  );
};

export default HeaderActionButtons;
