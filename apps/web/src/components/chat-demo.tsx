import * as React from "react";
import { ChatInput, ChatLayout, MessageList } from "./chat";
import { HomeArchive } from "./home-archive";
import type { Message } from "./chat/message-list";

/**
 * ChatPageDemo - Example of how to use the chat components together
 *
 * This demonstrates:
 * - ChatLayout: Main layout with sidebar and chat area
 * - MessageList: Scrollable message container
 * - MessageBubble: Individual message styling (rendered via MessageList)
 * - ChatInput: Input area with ethereal styling
 * - HomeArchive: Sidebar with clock and lore
 */
export function ChatPageDemo() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmitMessage = async (message: string) => {
    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content: message,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const claudeMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        content:
          "This is a simulated response from Claude. In a real implementation, you would call your API here.",
        role: "claude",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, claudeMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <ChatLayout
      sidebar={<HomeArchive className="p-6" />}
      messages={<MessageList messages={messages} isLoading={isLoading} />}
      input={<ChatInput onSubmit={handleSubmitMessage} isLoading={isLoading} />}
    />
  );
}
