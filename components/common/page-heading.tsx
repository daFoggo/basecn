import type { ReactNode } from "react";
import { cn } from "@/lib/utils/tailwind";

interface IPageHeadingProps {
    title: string;
    subtitle?: string;
    rightSections?: ReactNode;
    titleClassName?: string;
    subtitleClassName?: string;
    rightSectionsClassName?: string;
    className?: string;
}

const PageHeading = ({ 
    title, 
    subtitle, 
    rightSections,
    titleClassName,
    subtitleClassName,
    rightSectionsClassName,
    className
}: IPageHeadingProps) => {
    return (
        <div className={cn("flex justify-between items-start gap-4 w-full", className)}>
            <div className="flex flex-col items-start gap-1">
                <p className={cn("font-bold text-2xl", titleClassName)}>
                    {title}
                </p>
                {subtitle && (
                    <p className={cn("text-muted-foreground text-sm", subtitleClassName)}>
                        {subtitle}
                    </p>
                )}
            </div>
            {rightSections && (
                <div className={cn("", rightSectionsClassName)}>
                    {rightSections}
                </div>
            )}
        </div>
    );
};

export default PageHeading;