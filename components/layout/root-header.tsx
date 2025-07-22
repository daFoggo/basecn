import { AppLogo } from "./app-logo";
import HeaderNavigationButtons from "./header-navigation-buttons";
import HeaderUtilityButtons from "./header-utility-buttons";
import { ReuseHeader } from "./reuse-header";

const RootHeader = () => {
  return (
    <ReuseHeader
      wrapByContainer
      leftSection={<LeftSection />}
      rightSection={<RightSection />}
    />
  );
};

export default RootHeader;

const LeftSection = () => {
  return <AppLogo />;
};

const RightSection = () => {
  return (
    <div className="flex items-center gap-3">
      <HeaderUtilityButtons showThemeSwitcher showGithubButton />
      <HeaderNavigationButtons />
    </div>
  );
};
