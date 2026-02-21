import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Send, Bot, User, Plus, MessageSquare, Trash2, X, AlertCircle } from "lucide-react";
import { UserButton, useUser } from "@clerk/clerk-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

const API_BASE = "http://127.0.0.1:8000";

const Chatbot = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user?.id;

  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string>("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  // Load chat history on mount
  useEffect(() => {
    const loadChatHistory = async () => {
      if (!userId) return;

      try {
        setIsLoadingHistory(true);
        const response = await fetch(`${API_BASE}/chat-history/${userId}`);
        const data = await response.json();

        if (data.sessions && data.sessions.length > 0) {
          // Load messages for each session
          const chatsWithMessages = await Promise.all(
            data.sessions.map(async (session: any) => {
              const msgResponse = await fetch(`${API_BASE}/chat/${session.id}/messages`);
              const msgData = await msgResponse.json();
              return {
                id: session.id,
                title: session.title,
                messages: msgData.messages || [],
              };
            })
          );
          setChats(chatsWithMessages);
          setActiveChatId(chatsWithMessages[0].id);
        } else {
          // Create initial chat if none exist
          await createNewChat();
        }
      } catch (error) {
        console.error("Failed to load chat history:", error);
        // Fallback to default chat
        const defaultChat: Chat = {
          id: Date.now().toString(),
          title: "Getting Started",
          messages: [
            {
              role: "assistant",
              content: "Hi! I'm your AI advisor. How can I help you solve your startup challenges today?",
            },
          ],
        };
        setChats([defaultChat]);
        setActiveChatId(defaultChat.id);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    loadChatHistory();
  }, [userId]);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [activeChat?.messages, isLoading]);

  const createNewChat = async () => {
    if (!userId) return;

    const newSessionId = Date.now().toString();
    const newTitle = "New Strategy Chat";

    try {
      // Create session in database
      await fetch(`${API_BASE}/chat/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          session_id: newSessionId,
          title: newTitle,
        }),
      });

      // Add to local state
      const newChat: Chat = {
        id: newSessionId,
        title: newTitle,
        messages: [
          {
            role: "assistant",
            content: "New session started. What's on your mind?",
          },
        ],
      };

      setChats([newChat, ...chats]);
      setActiveChatId(newChat.id);
    } catch (error) {
      console.error("Failed to create new chat:", error);
    }
  };

  const deleteChat = async (chatId: string) => {
    if (chats.length === 1 || !userId) return;

    try {
      // Delete from database
      await fetch(`${API_BASE}/chat/${chatId}?user_id=${userId}`, {
        method: "DELETE",
      });

      // Remove from local state
      const newChats = chats.filter((chat) => chat.id !== chatId);
      setChats(newChats);
      if (activeChatId === chatId) {
        setActiveChatId(newChats[0].id);
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || !activeChat || !userId) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Optimistically add user message to UI
    setChats(prev => prev.map(chat =>
      chat.id === activeChatId
        ? { ...chat, messages: [...chat.messages, { role: "user", content: userMessage }] }
        : chat
    ));

    try {
      const response = await fetch(`${API_BASE}/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userMessage,
          user_id: userId,
          session_id: activeChatId,
        }),
      });

      if (!response.ok) throw new Error("Server connection failed");

      const data = await response.json();

      // Update chat with AI response and auto-update title for new chats
      setChats(prev => prev.map(chat =>
        chat.id === activeChatId
          ? {
            ...chat,
            title: chat.messages.length <= 2 ? userMessage.substring(0, 30) + "..." : chat.title,
            messages: [...chat.messages, { role: "assistant", content: data.answer }]
          }
          : chat
      ));

      // Update title in database if it's the first message
      if (activeChat.messages.length <= 2) {
        const newTitle = userMessage.substring(0, 30) + "...";
        await fetch(`${API_BASE}/chat/${activeChatId}/title`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: newTitle }),
        });
      }
    } catch (error) {
      console.error("RAG Error:", error);
      setChats(prev => prev.map(chat =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, { role: "assistant", content: "⚠️ **Connection Error**: I couldn't reach the advisor. Please ensure your Python backend is running at `localhost:8000`." }] }
          : chat
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <div className="w-64 border-r border-border flex flex-col bg-muted/20">
        <div className="p-4 h-20 flex items-center justify-center">
          <Button onClick={createNewChat} className="w-full shadow-sm" variant="default">
            <Plus className="h-4 w-4 mr-2" />
            New Session
          </Button>
        </div>

        <Separator />

        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`group flex items-center gap-2 rounded-xl px-3 py-2.5 cursor-pointer transition-all ${activeChatId === chat.id ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                onClick={() => setActiveChatId(chat.id)}
              >
                <MessageSquare className="h-4 w-4 flex-shrink-0" />
                <span className="flex-1 text-sm font-medium truncate">{chat.title}</span>
                {chats.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
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

        <div className="p-6 border-t bg-muted/10">
          <div className="text-xs text-muted-foreground space-y-4">
            <p className="font-semibold uppercase tracking-widest flex items-center gap-2">
              <AlertCircle className="h-3 w-3" /> System Status
            </p>
            <ul className="space-y-2 italic">
              <li>RAG Engine Active</li>
              <li>ChromaDB Connected</li>
              <li>Gemini-Flash 2.5</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-20 border-b border-border px-8 flex items-center justify-between bg-background/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shadow-inner">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">Foundry AI</h2>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-xs text-muted-foreground font-medium">System Ready</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <UserButton />
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-8" ref={scrollRef}>
          <div className="max-w-3xl mx-auto space-y-8">
            {activeChat?.messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                {message.role === "assistant" && (
                  <div className="h-10 w-10 rounded-lg bg-muted border flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-6 py-4 shadow-sm border ${message.role === "user"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-card-foreground border-border"
                    } max-w-[85%]`}
                >
                  <div className={`text-sm leading-relaxed prose prose-sm ${message.role === 'user' ? 'prose-invert' : 'dark:prose-invert'}`}>
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </div>
                {message.role === "user" && (
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="h-10 w-10 rounded-lg bg-muted border flex items-center justify-center">
                  <Bot className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="bg-card border rounded-2xl px-6 py-4">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t bg-muted/20 p-6">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-center">
              <Input
                placeholder="Ask Foundry about your startup..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="h-14 pl-6 pr-16 rounded-2xl border-2 focus-visible:ring-primary shadow-lg bg-background"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                size="icon"
                className="absolute right-2 h-10 w-10 rounded-xl transition-all"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-3 text-center uppercase tracking-[0.2em] font-bold">
              Powered by Foundry RAG Engine & Gemini 2.5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

