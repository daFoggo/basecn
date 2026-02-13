import { Slash } from "lucide-react";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { INavItem } from "@/types/navigation.types";

interface HeaderBreadcrumbProps {
  items: INavItem[];
}

export const HeaderBreadcrumb = ({ items }: HeaderBreadcrumbProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isNotClickable = !item.href || item.href === "#";
          const uniqueKey = `${item.title}-${item.href || "no-url"}-${index}`;

          return (
            <Fragment key={uniqueKey}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.title}</BreadcrumbPage>
                ) : isNotClickable ? (
                  <span className="flex items-center gap-1 hover:text-foreground transition-colors text-muted-foreground cursor-default">
                    {item.title}
                  </span>
                ) : (
                  <BreadcrumbLink
                    href={item.href}
                    className="flex items-center gap-1"
                  >
                    {item.title}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
