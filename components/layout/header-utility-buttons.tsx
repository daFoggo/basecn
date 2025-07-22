"use client";
import { APP_CONFIG } from "@/lib/configs/app";
import { formatCompactNumber } from "@/lib/utils";
import { useGithubStars } from "@/lib/hooks/use-github-stars";
import { motion } from "framer-motion";
import { GitHubIcon } from "../common/icons";
import { ThemeSwitcher } from "../common/theme-switcher";
import { Button } from "../ui/button";

interface IHeaderUtilityButtonsProps {
  showThemeSwitcher?: boolean;
  showLanguageSwitcher?: boolean;
  showGithubButton?: boolean;
}

const HeaderUtilityButtons = ({
  showThemeSwitcher = false,
  showLanguageSwitcher = false,
  showGithubButton = false,
}: IHeaderUtilityButtonsProps) => {
  const { stargazersCount } = useGithubStars(
    APP_CONFIG.github_author,
    APP_CONFIG.github_repo
  );
  return (
    <>
      {showGithubButton && APP_CONFIG.github && (
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
      )}
      {showThemeSwitcher && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <ThemeSwitcher />
        </motion.div>
      )}

      {showLanguageSwitcher && <>nigga chain</>}
    </>
  );
};

export default HeaderUtilityButtons;
