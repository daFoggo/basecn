import { APP_CONFIG } from "@/lib/configs/app";
import Link from "next/link";
import { VercelIcon } from "../common/icons";

export interface IAppLogoProps {
  url?: string;
  className?: string;
  showName?: boolean;
}

export const AppLogo = ({
  url = "/",
  className = "",
  showName = true,
}: IAppLogoProps) => {
  return (
    <Link href={url} className={className}>
      <div className="flex items-center gap-3 font-bold">
        <VercelIcon className="size-4" />
        {showName && <span className="hidden sm:inline text-foreground">{APP_CONFIG.name}</span>}
      </div>
    </Link>
  );
};
