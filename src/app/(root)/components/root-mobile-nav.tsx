import { ArrowRight, MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { GitHubStar } from "@/components/common/github-star";
import { Button } from "@/components/ui/button";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { cn } from "@/lib/utils";

export const RootMobileNav = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden"
        onClick={() => setOpen(!open)}
        size="icon"
        variant="outline"
      >
        {open ? (
          <XIcon className="size-4.5" />
        ) : (
          <MenuIcon className="size-4.5" />
        )}
      </Button>
      {open && (
        <Portal className="top-14" id="mobile-menu">
          <PortalBackdrop />
          <div
            className={cn(
              "data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
              "size-full p-4",
            )}
            data-slot={open ? "open" : "closed"}
          >
            <div className="grid gap-y-2">
              {/* {navLinks.map((link) => (
                <Button
                  asChild
                  className="justify-start"
                  key={link.label}
                  variant="ghost"
                >
                  <a href={link.href}>{link.label}</a>
                </Button>
              ))} */}
            </div>
            <div className=" flex flex-col gap-2 items-start md:items-center">
              <GitHubStar />
              <Link href="/acme-inc" className="w-full">
                <Button className="w-full" size="sm">
                  Go to dashboard
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};
