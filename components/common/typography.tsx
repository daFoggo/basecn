import { cn } from "@/lib/utils";
import * as React from "react";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "p"
    | "blockquote"
    | "list"
    | "inline-code"
    | "lead"
    | "large"
    | "small"
    | "muted";
  children: React.ReactNode;
  as?: React.ElementType;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant, children, className, as, ...props }, ref) => {
    const getVariantStyles = (variant: TypographyProps["variant"]) => {
      switch (variant) {
        case "h1":
          return "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl";
        case "h2":
          return "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0";
        case "h3":
          return "scroll-m-20 text-2xl font-semibold tracking-tight";
        case "h4":
          return "scroll-m-20 text-xl font-semibold tracking-tight";
        case "p":
          return "leading-7 [&:not(:first-child)]:mt-6";
        case "blockquote":
          return "mt-6 border-l-2 pl-6 italic";
        case "list":
          return "my-6 ml-6 list-disc [&>li]:mt-2";
        case "inline-code":
          return "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold";
        case "lead":
          return "text-xl text-muted-foreground";
        case "large":
          return "text-lg font-semibold";
        case "small":
          return "text-sm font-medium leading-none";
        case "muted":
          return "text-sm text-muted-foreground";
        default:
          return "";
      }
    };

    const getDefaultElement = (variant: TypographyProps["variant"]) => {
      switch (variant) {
        case "h1":
          return "h1";
        case "h2":
          return "h2";
        case "h3":
          return "h3";
        case "h4":
          return "h4";
        case "p":
          return "p";
        case "blockquote":
          return "blockquote";
        case "list":
          return "ul";
        case "inline-code":
          return "code";
        case "lead":
          return "p";
        case "large":
          return "div";
        case "small":
          return "small";
        case "muted":
          return "p";
        default:
          return "div";
      }
    };

    const Component = as || getDefaultElement(variant);
    const variantStyles = getVariantStyles(variant);

    return (
      <Component ref={ref} className={cn(variantStyles, className)} {...props}>
        {children}
      </Component>
    );
  }
);

Typography.displayName = "Typography";

export { Typography };
