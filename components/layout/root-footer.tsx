import DiscordIcon from "@/assets/discord.svg";
import GitHubIcon from "@/assets/github.svg";
import Logo from "@/assets/logo.svg";
import TwitterIcon from "@/assets/twitter.svg";
import { PanelsTopLeft } from "lucide-react";
import Link from "next/link";

export const RootFooter = () => {
  return (
    <footer className="bg-background/95 backdrop-blur-sm border-t w-full">
      <div className="flex flex-col gap-8 py-10 lg:py-16 container">
        <div className="gap-8 grid sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4 col-span-2 max-w-md">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <PanelsTopLeft className="size-4" />
              <span>basecn</span>
            </Link>
            <p className="text-muted-foreground text-sm">
                A Next.js with shadcn/ui project base to build mordern web applications.
            </p>
            <div className="flex gap-4">
              {/* <a
                href="https://github.com/jnsahaj/tweakcn"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <GitHubIcon className="size-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://discord.gg/Phs4u2NM3n"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <DiscordIcon className="size-5" />
                <span className="sr-only">Discord</span>
              </a>
              <a
                href="https://x.com/iamsahaj_xyz"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <TwitterIcon className="size-5" />
                <span className="sr-only">Twitter</span>
              </a> */}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sm">Product</h4>
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
              <li>
                <a
                  href="#roadmap"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Roadmap
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sm">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/jnsahaj/tweakcn"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/Phs4u2NM3n"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/messages/compose?recipient_id=1426676644152889345"
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
            &copy; {new Date().getFullYear()} tweakcn. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            <Link href="/privacy-policy">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
