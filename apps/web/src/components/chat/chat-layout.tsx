import { cn } from "@claudeday/ui/lib/utils";
import * as React from "react";

export interface ChatLayoutProps {
  sidebar: React.ReactNode;
  messages: React.ReactNode;
  input: React.ReactNode;
  className?: string;
}

export const ChatLayout = React.forwardRef<HTMLDivElement, ChatLayoutProps>(
  ({ sidebar, messages, input, className }, ref) => {
    // Sidebar state for future mobile toggle implementation

    return (
      <div
        ref={ref}
        className={cn("relative h-screen w-full overflow-hidden bg-background", className)}
      >
        {/* Background gradients for ethereal effect */}
        <div className="pointer-events-none fixed inset-0">
          {/* Top gradient glow */}
          <div className="absolute inset-x-0 top-0 h-96 bg-[linear-gradient(90deg,transparent,oklch(0.72_0.09_73_/_0.1),transparent)] blur-3xl" />

          {/* Subtle radial gradients */}
          <div
            className="absolute"
            style={{
              width: "600px",
              height: "600px",
              background: "radial-gradient(circle, oklch(0.72 0.08 78 / 0.15) 0%, transparent 70%)",
              top: "-200px",
              right: "-300px",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute"
            style={{
              width: "400px",
              height: "400px",
              background: "radial-gradient(circle, oklch(0.62 0.1 39 / 0.08) 0%, transparent 70%)",
              bottom: "200px",
              left: "-150px",
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* Main layout container */}
        <div className="relative z-0 flex h-full w-full">
          {/* Sidebar */}
          <aside
            className={cn(
              "border-r border-foreground/10 bg-background/80 backdrop-blur-sm",
              "flex flex-col",
              "transition-all duration-300",
              "w-72",
              "overflow-hidden",
            )}
          >
            <div className="flex-1 overflow-y-auto">{sidebar}</div>
          </aside>

          {/* Main chat area */}
          <main className="relative z-0 flex flex-1 flex-col">
            {/* Messages container */}
            <div className="relative flex-1 overflow-hidden">{messages}</div>

            {/* Input container - always at bottom */}
            <div className="relative flex-shrink-0 bg-gradient-to-t from-background/95 to-background/50">
              {input}
            </div>
          </main>
        </div>

        {/* Mobile sidebar toggle - could be added to header if needed */}
      </div>
    );
  },
);

ChatLayout.displayName = "ChatLayout";
