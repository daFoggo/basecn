"use client";
import { motion } from "framer-motion";
import { ThemeSwitcher } from "../common/theme-switcher";
import { RootHeaderNavigateButton } from "./root-header-navigate-button";
import UserMenu from "./user-menu";

interface IHeaderActionButtonsProps {
  showNavigationButton?: boolean;
  showUserMenu?: boolean;
}

const HeaderActionButtons = ({
  showNavigationButton = true,
  showUserMenu = false,
}: IHeaderActionButtonsProps) => {
  // const { isAuthenticated } = useAuthContext();
  const isAuthenticated = true;
  return (
    <>
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
      {showUserMenu && isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <UserMenu />
        </motion.div>
      )}
    </>
  );
};

export default HeaderActionButtons;
