"use client";

import { ErrorAlert } from "@/components/common/error-alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ChevronRight, MessageCircleCode, Trash2 } from "lucide-react";
import { lazy } from "react";
import type { IMessage } from "../utils/types";

interface IExerciseChatPanelProps {
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
  isGettingFeedback: boolean;
  messages: IMessage[];
  error: Error;
  clearMessages: () => void;
}

const MessageList = lazy(() => import("./message-list"));

export const ExerciseChatPanel = ({
  isCollapsed = false,
  toggleCollapse,
  isGettingFeedback,
  messages,
  error,
  clearMessages,
}: IExerciseChatPanelProps) => {
  if (error) {
    return (
      <ErrorAlert
        title="Không thể tải phản hồi"
        description="Vui lòng thử lại sau."
      />
    );
  }

  return (
    <Card
      className={cn("flex flex-col h-full overflow-hidden", isCollapsed && "")}
    >
      <CardHeader
        className={cn(
          "flex flex-row flex-shrink-0 justify-between items-center",
          isCollapsed && "flex-col-reverse gap-3"
        )}
      >
        <div className="flex items-center gap-2">
          <MessageCircleCode className="size-5" />
          {!isCollapsed && <CardTitle className="text-lg">AI Tutor</CardTitle>}
        </div>

        <div className="flex items-center gap-2">
          {!isCollapsed && messages.length > 0 && (
            <Tooltip>
              <TooltipTrigger>
                <Button variant="ghost" size="icon" onClick={clearMessages}>
                  <Trash2 className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Xoá tất cả tin nhắn</p>
              </TooltipContent>
            </Tooltip>
          )}

          {toggleCollapse && (
            <Button variant="ghost" size="icon" onClick={toggleCollapse}>
              <ChevronRight
                className={cn("size-4", isCollapsed && "rotate-180")}
              />
            </Button>
          )}
        </div>
      </CardHeader>

      {!isCollapsed && (
        <CardContent className="flex-1 p-0 min-h-0 overflow-hidden">
          <MessageList
            messages={messages}
            isSending={isGettingFeedback}
            className="h-full"
          />
        </CardContent>
      )}
    </Card>
  );
};
