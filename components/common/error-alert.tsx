import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { ReactNode } from "react";

interface IErrorAlertProps {
  title: string;
  description?: ReactNode;
  className?: string;
}

export function ErrorAlert({
  title = "Có lỗi xảy ra",
  description = "Vui lòng thử lại sau.",
  className,
}: IErrorAlertProps) {
  return (
    <Alert variant="destructive" className={cn("w-full", className)}>
      <AlertCircle className="size-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
