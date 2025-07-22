import { APP_CONFIG } from "@/lib/configs/app";
import Link from "next/link";
import { VercelIcon } from "../common/icons";

export const RootFooter = () => {
  return (
    <footer className="backdrop-blur-sm border-t w-full">
      <div className="flex flex-col gap-8 py-10 lg:py-16 container">
        <div className="gap-8 grid sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4 col-span-2 max-w-md">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <VercelIcon className="size-4" />
              <span>{APP_CONFIG.name}</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              {APP_CONFIG.description}
            </p>
          </div>
          <div className="space-y-4">
            <p className="font-bold text-sm">Product</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#features"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#examples"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Examples
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <p className="font-bold text-sm">Resources</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={APP_CONFIG.contact}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex sm:flex-row flex-col justify-between items-center gap-4 pt-8 border-t border-border/40">
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} {APP_CONFIG.name}. All rights
            reserved.
          </p>
          {/* <p className="text-muted-foreground text-xs">
            <Link href="/privacy-policy">Privacy Policy</Link>
          </p> */}
        </div>
      </div>
    </footer>
  );
};
