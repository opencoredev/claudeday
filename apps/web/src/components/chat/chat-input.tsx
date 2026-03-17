import { Button } from "@claudeday/ui/components/button";
import { Input } from "@claudeday/ui/components/input";
import { cn } from "@claudeday/ui/lib/utils";
import { ArrowUp, Loader2 } from "lucide-react";
import * as React from "react";

export interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

export const ChatInput = React.forwardRef<HTMLDivElement, ChatInputProps>(
  ({ onSubmit, isLoading, placeholder = "Ask me anything...", className }, ref) => {
    const [value, setValue] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (value.trim() && !isLoading) {
        onSubmit(value.trim());
        setValue("");
        inputRef.current?.focus();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e as any);
      }
    };

    return (
      <div ref={ref} className={cn("relative z-10 w-full", className)}>
        {/* Backdrop blur effect above input */}
        <div className="pointer-events-none absolute -inset-x-4 bottom-full h-16 bg-gradient-to-b from-transparent to-background/80 blur-xl" />

        <form
          onSubmit={handleSubmit}
          className={cn(
            "relative mx-4 mb-4 flex items-center gap-2",
            "rounded-full border border-foreground/15",
            "bg-gradient-to-r from-background/95 to-background/90",
            "px-4 py-2.5 md:px-5 md:py-3",
            "shadow-[0_16px_48px_oklch(0.45_0.05_65_/_0.12)]",
            "backdrop-blur-md",
            "transition-all duration-200",
            "focus-within:border-foreground/30",
            "focus-within:shadow-[0_20px_64px_oklch(0.45_0.05_65_/_0.16)]",
            "hover:border-foreground/20",
          )}
        >
          <Input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            className={cn(
              "flex-1 border-0 bg-transparent px-0 py-0",
              "text-sm placeholder:text-foreground/40",
              "focus:outline-none focus:ring-0",
              "disabled:opacity-70",
            )}
          />

          <Button
            type="submit"
            size="icon-sm"
            disabled={!value.trim() || isLoading}
            className={cn(
              "shrink-0 rounded-full",
              "transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              value.trim() && !isLoading
                ? "bg-gradient-to-br from-primary/90 to-primary/70 shadow-[0_8px_24px_oklch(0.6171_0.1375_39_/_0.12)] hover:shadow-[0_12px_32px_oklch(0.6171_0.1375_39_/_0.16)]"
                : "bg-foreground/10",
            )}
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ArrowUp className="size-4" />
            )}
          </Button>
        </form>
      </div>
    );
  },
);

ChatInput.displayName = "ChatInput";
