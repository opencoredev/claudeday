import { cn } from "@claudeday/ui/lib/utils";
import * as React from "react";
import { MessageBubble } from "./message-bubble";
import type { MessageBubbleProps } from "./message-bubble";

export interface Message extends MessageBubbleProps {
  id: string;
}

export interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
  className?: string;
}

export const MessageList = React.forwardRef<HTMLDivElement, MessageListProps>(
  ({ messages, isLoading, className }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const endOfMessagesRef = React.useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    React.useEffect(() => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full flex-col gap-4 overflow-y-auto rounded-2xl",
          "px-4 py-6 md:px-6",
          className,
        )}
      >
        {/* Gradient background overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background via-background/50 to-transparent" />

        <div ref={scrollRef} className="flex flex-col gap-4">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center py-12 text-center">
              <div className="space-y-2">
                <p className="text-sm text-foreground/60">No messages yet</p>
                <p className="text-xs text-foreground/40">Start a conversation to begin</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                content={message.content}
                role={message.role}
                timestamp={message.timestamp}
              />
            ))
          )}

          {isLoading && (
            <div className="flex gap-3">
              <div className="max-w-xs rounded-[1.5rem] bg-gradient-to-br from-background to-background/80 border border-foreground/10 px-5 py-3 shadow-[0_8px_24px_oklch(0.45_0.05_65_/_0.08)]">
                <div className="flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce" />
                  <div className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce animation-delay-100" />
                  <div className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce animation-delay-200" />
                </div>
              </div>
            </div>
          )}

          <div ref={endOfMessagesRef} />
        </div>
      </div>
    );
  },
);

MessageList.displayName = "MessageList";
