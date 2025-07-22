import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";
import { memo, useMemo } from "react";

const LoadingMessage = memo(() => {
  const currentTime = useMemo(
    () =>
      new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    []
  );

  return (
    <div className="group flex justify-center items-center bg-muted/30 p-4 border-b border-border/50 h-[80px] transition-colors">
      <div className="flex gap-3 w-full max-w-4xl">
        <div className="flex-shrink-0">
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <Bot className="size-4" />
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 min-w-0">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-muted-foreground text-xs">
              <span className="font-semibold">AI Tutor</span>
              <span>•</span>
              <span className="font-medium">{currentTime}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex space-x-1">
                <div className="bg-primary rounded-full w-2 h-2 animate-bounce"></div>
                <div
                  className="bg-primary rounded-full w-2 h-2 animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="bg-primary rounded-full w-2 h-2 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <span className="text-muted-foreground text-sm">
                AI Tutor đang đánh giá...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

LoadingMessage.displayName = "LoadingMessage";

export default LoadingMessage;