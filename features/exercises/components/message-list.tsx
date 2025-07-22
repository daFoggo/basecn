import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MessageCircleDashed } from "lucide-react";
import { lazy, memo, useCallback, useEffect, useMemo, useRef } from "react";
import { IMessage } from "../utils/types";

const LoadingMessage = lazy(() => import("./loading-message"));
const Message = lazy(() => import("./message"));

const EmptyMessage = memo(() => {
  return (
    <div className="flex flex-1 justify-center items-center p-24">
      <div className="flex flex-col items-center text-muted-foreground text-center">
        <MessageCircleDashed className="mb-6 size-12" />
        <p className="font-semibold text-xl">Chưa có tin nhắn nào cả</p>
        <p className="mt-3 text-sm">
          Bắt đầu làm bài tập để nhận phản hồi từ AI Tutor.
        </p>
      </div>
    </div>
  );
});

EmptyMessage.displayName = "EmptyMessage";

// Component cho message list
const MessageList = memo(
  ({
    messages,
    isSending = false,
    className,
  }: {
    messages: IMessage[];
    isSending?: boolean;
    className?: string;
  }) => {
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
      requestAnimationFrame(() => {
        if (scrollAreaRef.current) {
          const scrollContainer =
            scrollAreaRef.current.querySelector(
              "[data-radix-scroll-area-viewport]"
            ) || scrollAreaRef.current;
          scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: "smooth",
          });
        }
      });
    }, []);

    const messagesList = useMemo(() => {
      return messages.map((message, index) => (
        <Message
          key={`${message.metadata.messageId}-${index}`}
          message={message}
        />
      ));
    }, [messages]);

    useEffect(() => {
      if (messages.length > 0 || isSending) {
        scrollToBottom();
      }
    }, [messages.length, isSending, scrollToBottom]);

    if (messages.length === 0 && !isSending) {
      return <EmptyMessage />;
    }

    return (
      <ScrollArea
        ref={scrollAreaRef}
        className={cn("flex-1", className)}
        style={{ maxHeight: "100%", overflowY: "auto" }}
      >
        <div className="min-h-full">
          {messagesList}
          {isSending && (
            <div className="flex-shrink-0">
              <LoadingMessage />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
    );
  }
);

MessageList.displayName = "MessageList";

export default MessageList;
