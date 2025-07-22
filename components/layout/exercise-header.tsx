"use client";

import { AppLogo } from "./app-logo";
import HeaderUtilityButtons from "./header-utility-buttons";
import { ReuseHeader } from "./reuse-header";
import UserMenu from "./user-menu";

const ExerciseHeader = () => {
  return (
    <ReuseHeader
      wrapByContainer={false}
      leftSection={<LeftSection />}
      rightSection={<RightSection />}
      containerClassName="border-b"
    />
  );
};

export default ExerciseHeader;

const LeftSection = () => {
  return (
    <div className="flex items-center gap-6">
      <AppLogo showName={false} />
    </div>
  );
};

const RightSection = () => {
  return (
    <div className="flex items-center gap-3">
      <HeaderUtilityButtons showThemeSwitcher showGithubButton />
      <UserMenu />
    </div>
  );
};
