# Chat UI Components Integration Guide

## Components Overview

### 1. **MessageBubble** (`message-bubble.tsx`)

Individual message with ethereal styling.

```tsx
import { MessageBubble } from "@/components/chat";

<MessageBubble content="Hello, how can I help?" role="claude" timestamp={new Date()} />;
```

**Props:**

- `content: string` - Message text
- `role: "user" | "claude"` - Message sender
- `timestamp?: Date` - Optional timestamp

**Styling:**

- User messages: Gradient primary color with shadow
- Claude messages: Soft background with border

---

### 2. **MessageList** (`message-list.tsx`)

Scrollable container for messages with auto-scroll.

```tsx
import { MessageList } from "@/components/chat";
import type { Message } from "@/components/chat";

const messages: Message[] = [
  {
    id: "1",
    content: "Hi there!",
    role: "user",
    timestamp: new Date(),
  },
];

<MessageList messages={messages} isLoading={false} />;
```

**Props:**

- `messages: Message[]` - Array of messages
- `isLoading?: boolean` - Show loading indicator
- `className?: string` - Additional CSS classes

**Features:**

- Auto-scrolls to newest message
- Empty state with guidance
- Loading animation with bouncing dots
- Gradient background overlay

---

### 3. **ChatInput** (`chat-input.tsx`)

Floating ethereal input with submit button.

```tsx
import { ChatInput } from "@/components/chat";

<ChatInput
  onSubmit={(message) => {
    console.log("Sending:", message);
  }}
  isLoading={false}
  placeholder="Ask me anything..."
/>;
```

**Props:**

- `onSubmit: (message: string) => void` - Message submission handler
- `isLoading?: boolean` - Disable input while processing
- `placeholder?: string` - Input placeholder text
- `className?: string` - Additional CSS classes

**Features:**

- Enter key to submit (Shift+Enter for newline support - can be added)
- Dynamic button state (enabled/disabled)
- Spinner icon while loading
- Backdrop blur with shadow effects
- Auto-focus after send

---

### 4. **ChatLayout** (`chat-layout.tsx`)

Main layout with sidebar, messages, and input.

```tsx
import { ChatLayout } from "@/components/chat";

<ChatLayout
  sidebar={<YourSidebarComponent />}
  messages={<MessageList messages={messages} />}
  input={<ChatInput onSubmit={handleSubmit} />}
/>;
```

**Props:**

- `sidebar: React.ReactNode` - Left sidebar content
- `messages: React.ReactNode` - Center message area
- `input: React.ReactNode` - Bottom input area
- `className?: string` - Additional CSS classes

**Layout:**

- Full-screen container (h-screen)
- Fixed ethereal background gradients
- Sidebar: 288px (w-72) with border
- Messages: Flex-1 (remaining space, scrollable)
- Input: Sticky at bottom

---

### 5. **HomeArchive** (`home-archive.tsx`)

Extracted clock and lore components from home page.

```tsx
import { HomeArchive, useClaudeDayClock } from "@/components/home-archive";

// As a sidebar component
<HomeArchive className="p-6" />;

// Or use the hook directly
const clock = useClaudeDayClock();
if (clock?.isHoliday) {
  console.log("Claude Day is live!");
}
```

**Exports:**

- **Component:** `HomeArchive` - Full clock + lore UI
- **Hook:** `useClaudeDayClock()` - Real-time countdown state
- **Utilities:** `buildClockSnapshot()`, `formatCountdown()`, `getResetForYear()`
- **Constants:** `loreCards`, `sourceLinks`, `RESET_MONTH`, `RESET_DAY`
- **Types:** `ClockSnapshot`, `Message`

---

## Complete Usage Example

### Basic Chat Page

```tsx
import React from "react";
import { ChatInput, ChatLayout, MessageList } from "@/components/chat";
import { HomeArchive } from "@/components/home-archive";
import type { Message } from "@/components/chat";

export function ChatPage() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (content: string) => {
    // Add user message
    const userMsg: Message = {
      id: crypto.randomUUID(),
      content,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Call your API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });
      const data = await response.json();

      // Add Claude response
      const claudeMsg: Message = {
        id: crypto.randomUUID(),
        content: data.reply,
        role: "claude",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, claudeMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatLayout
      sidebar={<HomeArchive className="p-6" />}
      messages={<MessageList messages={messages} isLoading={isLoading} />}
      input={<ChatInput onSubmit={handleSubmit} isLoading={isLoading} />}
    />
  );
}
```

---

## Styling Details

All components use the **ethereal** design system:

### Colors

- **Primary:** `oklch(0.6171 0.1375 39.0427)` - Golden yellow
- **Background:** `oklch(0.9818 0.0054 95.0986)` - Off-white (light mode)
- **Border:** `oklch(0.8847 0.0069 97.3627)` - Subtle gray

### Effects

- **Shadows:** `shadow-[0_8px_24px_oklch(0.45_0.05_65_/_0.08)]`
- **Blur:** `backdrop-blur-md`, `blur-3xl`
- **Gradients:** OKLch color space for smooth transitions
- **Borders:** Subtle `border-foreground/10` or `border-foreground/20`

### Typography

- **Display Font:** Fraunces (serif) - `style={{ fontFamily: "var(--font-display)" }}`
- **Body Font:** System sans-serif

### Animations

- **Message entry:** `fade-in slide-in-from-bottom-2`
- **Loading dots:** `animate-bounce animation-delay-*`
- **Button hover:** Smooth shadow expansion

---

## Accessibility

- ✅ Semantic HTML (proper heading levels, `<form>`, `<aside>`)
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation (Enter to send, Tab through elements)
- ✅ Focus management (auto-focus input after send)
- ✅ Disabled states properly communicated
- ✅ Color not the only differentiator (text clearly distinguishes sender)

---

## TypeScript

All components are fully typed with generics and React.forwardRef:

```tsx
// MessageBubble
export interface MessageBubbleProps {
  content: string;
  role: "user" | "claude";
  timestamp?: Date;
}

// Message (for MessageList)
export interface Message extends MessageBubbleProps {
  id: string;
}

// ChatInput
export interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}
```

---

## Integration with Existing Components

The chat components integrate seamlessly with existing `@claudeday/ui` components:

- **Button:** Used in ChatInput with variants and sizing
- **Input:** Used in ChatInput with custom styling
- **Card:** Used in HomeArchive for lore and clock display
- **cn() utility:** For safe Tailwind class merging

---

## Performance Considerations

1. **MessageList auto-scroll** - Uses `useRef` and `useEffect` for smooth scrolling
2. **Message rendering** - Each message is independent (no re-render of all on new message)
3. **Input debouncing** - Not needed, direct event handling
4. **Background gradients** - Fixed positioning (not re-painted on scroll)
5. **Loading animation** - CSS-based (no JS overhead)

---

## Customization

### Custom styling

```tsx
<ChatInput
  className="rounded-lg" // Override borderRadius
  placeholder="Custom prompt..."
/>
```

### Custom sidebar

```tsx
<ChatLayout
  sidebar={<CustomSidebar />} // Replace HomeArchive
  messages={<MessageList messages={messages} />}
  input={<ChatInput onSubmit={handleSubmit} />}
/>
```

### Custom message bubble

```tsx
// Create wrapper component
<MessageBubble content={message} role="claude" timestamp={new Date()} />
```

---

## Notes

- All components handle loading states gracefully
- Timestamp is optional but recommended for UX
- HomeArchive automatically updates its clock every second
- MessageList auto-scrolls on new messages (can be disabled by removing useEffect)
- ChatInput clears after successful submission
