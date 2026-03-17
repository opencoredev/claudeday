import { cn } from "@claudeday/ui/lib/utils";
import * as React from "react";

export interface MessageBubbleProps {
  content: string;
  role: "user" | "claude";
  timestamp?: Date;
}

export const MessageBubble = React.forwardRef<HTMLDivElement, MessageBubbleProps>(
  ({ content, role, timestamp }, ref) => {
    const isUser = role === "user";
    const formattedTime = timestamp
      ? timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : null;

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
          isUser ? "justify-end" : "justify-start",
        )}
      >
        <div
          className={cn(
            "max-w-xs rounded-[1.5rem] px-5 py-3 text-sm leading-6 transition-all duration-200",
            isUser
              ? "bg-gradient-to-br from-primary/90 to-primary/70 text-primary-foreground shadow-[0_8px_24px_oklch(0.6171_0.1375_39_/_0.12)]"
              : "bg-gradient-to-br from-background to-background/80 border border-foreground/10 text-foreground shadow-[0_8px_24px_oklch(0.45_0.05_65_/_0.08)]",
          )}
        >
          <p className="text-foreground/90 dark:text-foreground">{content}</p>
          {formattedTime && (
            <p
              className={cn(
                "mt-1.5 text-xs opacity-70",
                isUser ? "text-primary-foreground/70" : "text-foreground/60",
              )}
            >
              {formattedTime}
            </p>
          )}
        </div>
      </div>
    );
  },
);

MessageBubble.displayName = "MessageBubble";
