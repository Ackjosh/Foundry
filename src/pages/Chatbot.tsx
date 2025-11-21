import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Send, Bot, User, Plus, MessageSquare, Trash2, X } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

const Chatbot = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "Getting Started",
      messages: [
        {
          role: "assistant",
          content: "Hi! I'm your AI advisor. How can I help you solve your startup challenges today?",
        },
      ],
    },
  ]);
  const [activeChatId, setActiveChatId] = useState("1");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChat?.messages]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: `Chat ${chats.length + 1}`,
      messages: [
        {
          role: "assistant",
          content: "Hi! I'm your AI advisor. How can I help you solve your startup challenges today?",
        },
      ],
    };
    setChats([...chats, newChat]);
    setActiveChatId(newChat.id);
  };

  const deleteChat = (chatId: string) => {
    if (chats.length === 1) return;
    const newChats = chats.filter((chat) => chat.id !== chatId);
    setChats(newChats);
    if (activeChatId === chatId) {
      setActiveChatId(newChats[0].id);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || !activeChat) return;

    const userMessage = input.trim();
    setInput("");

    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          messages: [...chat.messages, { role: "user" as const, content: userMessage }],
        };
      }
      return chat;
    });
    setChats(updatedChats);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const updatedChatsWithResponse = chats.map((chat) => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              { role: "user" as const, content: userMessage },
              {
                role: "assistant" as const,
                content: "I understand your concern. Let me help you with that. This is a placeholder response - integrate with an AI API for real responses.",
              },
            ],
          };
        }
        return chat;
      });
      setChats(updatedChatsWithResponse);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-border flex flex-col">
        <div className="p-4">
          <Button onClick={createNewChat} className="w-full" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>

        <Separator />

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`group flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer hover:bg-muted transition-colors ${
                  activeChatId === chat.id ? "bg-muted" : ""
                }`}
                onClick={() => setActiveChatId(chat.id)}
              >
                <MessageSquare className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <span className="flex-1 text-sm truncate">{chat.title}</span>
                {chats.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <Separator />

        <div className="p-4">
          <div className="text-xs text-muted-foreground space-y-1">
            <p className="font-medium">Quick Tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Ask about funding strategies</li>
              <li>Get product-market fit advice</li>
              <li>Scaling best practices</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-border px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">AI Advisor</h2>
              <p className="text-sm text-muted-foreground">Your startup success partner</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="h-10 w-10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-6" ref={scrollRef}>
          <div className="max-w-4xl mx-auto space-y-6 py-6">
            {activeChat?.messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-5 py-3 max-w-[75%] ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-muted rounded-2xl px-5 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t border-border p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <Input
                  placeholder="Ask me anything about your startup challenges..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="pr-4 py-6 text-base"
                />
              </div>
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                size="lg"
                className="h-[52px] px-6"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI Advisor can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
