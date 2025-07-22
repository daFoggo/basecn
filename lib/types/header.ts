import { ReactNode } from "react";

export interface IReuseHeaderProps {
  wrapByContainer?: boolean;
  leftSection?: ReactNode;
  centerSection?: ReactNode;
  rightSection?: ReactNode;
  rightNavigationSection?: ReactNode;
  className?: string;
  sticky?: boolean;
  showScrollEffect?: boolean;
  showMobileMenu?: boolean;
  mobileMenuContent?: ReactNode;
  containerClassName?: string;
}
