import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Typography } from "./typography";

interface IPageHeader {
  breadcrumbs?: {
    href: string;
    label: string;
  }[];
  title: string;
}
const PageHeader = ({ breadcrumbs, title }: IPageHeader) => {
  return (
    <div className="flex flex-col justify-between items-start gap-3 max-w-4xl">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs?.map((breadcrumb, index) => (
            <div key={`breadcrumb-${index}`} className="flex items-center gap-2">
              <BreadcrumbItem key={`item-${index}`}>
                <BreadcrumbLink href={breadcrumb.href} key={`link-${index}`}>
                  {breadcrumb.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator key={`separator-${index}`} />
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <Typography variant="h2">{title}</Typography>
    </div>
  );
};

export default PageHeader;
