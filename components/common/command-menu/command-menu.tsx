"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  type ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { navData } from "@/app/dashboard/components/nav-data";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { THEME_OPTIONS } from "@/constants/theme";
import { useMutationObserver } from "@/hooks/use-mutation-observer";
import { flattenNavData } from "@/lib/nav-utils";
import type { TFlatNavGroup, TFlatNavItem } from "@/types/navigation";
import { useCommandMenu } from "./command-menu-context";

interface ICommandMenuItemProps extends ComponentProps<typeof CommandItem> {
  onHighlight?: () => void;
}

type TSelectedType = "page" | "theme" | null;

const CommandMenuItem = ({ onHighlight, ...props }: ICommandMenuItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useMutationObserver(
    ref,
    (mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "aria-selected" &&
          ref.current?.getAttribute("aria-selected") === "true"
        ) {
          onHighlight?.();
        }
      }
    },
    {
      attributes: true,
      attributeFilter: ["aria-selected"],
    },
  );

  return <CommandItem ref={ref} {...props} />;
};

export const CommandMenu = () => {
  const router = useRouter();
  const { open, setOpen } = useCommandMenu();
  const { setTheme } = useTheme();
  const [selectedType, setSelectedType] = useState<TSelectedType>(null);

  // Group nav data for search - memoized to avoid recalculation
  const navGroups = useMemo(() => flattenNavData(navData), []);

  // Reset selected type when menu closes
  useEffect(() => {
    if (!open) {
      setSelectedType(null);
    }
  }, [open]);

  const runCommand = useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    [setOpen],
  );

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      className="top-1/2 -translate-y-1/2 max-w-sm md:max-w-lg lg:max-w-xl"
    >
      <Command className="rounded-none border-0">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="max-h-[60vh] md:max-h-[50vh]">
          <CommandEmpty>No results found.</CommandEmpty>

          {/* Navigation Items - Grouped */}
          {navGroups.map((group: TFlatNavGroup) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((item: TFlatNavItem) => (
                <CommandMenuItem
                  key={item.href}
                  value={`${item.title} ${item.group} ${item.keywords?.join(" ") || ""}`}
                  onHighlight={() => setSelectedType("page")}
                  onSelect={() => runCommand(() => router.push(item.href))}
                >
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </CommandMenuItem>
              ))}
            </CommandGroup>
          ))}

          <CommandSeparator />

          {/* Theme Options */}
          <CommandGroup heading="Theme">
            {THEME_OPTIONS.map((theme) => (
              <CommandMenuItem
                key={theme.value}
                value={`${theme.label} theme`}
                onHighlight={() => setSelectedType("theme")}
                onSelect={() => runCommand(() => setTheme(theme.value))}
              >
                {theme.icon}
                <span className="ml-2">{theme.label}</span>
              </CommandMenuItem>
            ))}
          </CommandGroup>
        </CommandList>

        <div className="flex items-center justify-between border-t p-2 text-xs text-muted-foreground">
          <span>
            {selectedType === "page" && "Press Enter to navigate"}
            {selectedType === "theme" && "Press Enter to apply theme"}
            {!selectedType && "Type to search..."}
          </span>
          <Kbd>ESC</Kbd>
        </div>
      </Command>
    </CommandDialog>
  );
};
