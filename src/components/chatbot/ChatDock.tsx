import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { lovableClient, isLovableConfigured } from "@/services/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Loader2, MessageCircle, Send, X } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: Date;
}

const chatEnabled = (import.meta.env.VITE_CHAT_ENABLED ?? "true") !== "false";
const lemonKeyPresent = Boolean(import.meta.env.VITE_LEMONAI_API_KEY ?? "");

const FALLBACK_RESPONSE =
  "Lemon AI is warming up. Connect the Lovable Cloud backend and provide the Lemon AI credentials to receive live responses.";

const createChatMessage = (role: ChatMessage["role"], content: string): ChatMessage => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  content,
  createdAt: new Date(),
});

const motionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 12 },
};

const dockVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

const ChatDock = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    createChatMessage(
      "system",
      "Hi! I'm Lemon AI, your sustainability guide. Ask me about conservation missions, blockchain rewards, or how to join the mission."
    ),
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const lovableReady = isLovableConfigured();

  const canSend = input.trim().length > 0;

  const sendMutation = useMutation({
    mutationFn: async (prompt: string) => {
      if (!lovableReady || !lemonKeyPresent) {
        return { reply: FALLBACK_RESPONSE };
      }

      return lovableClient.post<{ reply: string }>("/chat/lemon", {
        prompt,
        metadata: {
          source: "chat-dock",
        },
      });
    },
  });

  const toggleDock = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSend = useCallback(() => {
    if (!canSend || sendMutation.isPending) return;

    const userMessage = createChatMessage("user", input.trim());
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    sendMutation.mutate(input.trim(), {
      onSuccess: (data) => {
        const reply = createChatMessage("assistant", data.reply ?? FALLBACK_RESPONSE);
        setMessages((prev) => [...prev, reply]);
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      },
      onError: () => {
        const reply = createChatMessage("assistant", FALLBACK_RESPONSE);
        setMessages((prev) => [...prev, reply]);
      },
    });
  }, [canSend, input, sendMutation]);

  const placeholder = useMemo(() => {
    if (!lemonKeyPresent) {
      return "Add VITE_LEMONAI_API_KEY to enable live conversations";
    }

    if (!lovableReady) {
      return "Connect Lovable Cloud to enable responses";
    }

    return "Ask how we empower eco-heroes today...";
  }, [lemonKeyPresent, lovableReady]);

  if (!chatEnabled) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>{isOpen && (
        <motion.div
          id="lemon-ai-dock"
          key="chat-dock"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={dockVariants}
          transition={{
            type: "spring",
            damping: shouldReduceMotion ? 50 : 22,
            stiffness: shouldReduceMotion ? 200 : 180,
          }}
          className="w-[min(24rem,90vw)] rounded-2xl border border-primary/20 bg-background/95 shadow-2xl backdrop-blur-xl"
          aria-live="polite"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-primary">Lemon AI Copilot</p>
              <p className="text-xs text-muted-foreground">Your on-call sustainability navigator</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDock}
              aria-label="Close Lemon AI chat"
              className="rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-72">
            <div className="flex flex-col gap-3 px-4 py-4">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    layout
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={motionVariants}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                    className={cn(
                      "rounded-xl px-3 py-2 text-sm shadow-sm",
                      message.role === "user"
                        ? "ml-auto bg-primary text-primary-foreground"
                        : message.role === "assistant"
                          ? "mr-auto bg-card text-card-foreground"
                          : "mx-auto bg-muted text-muted-foreground"
                    )}
                  >
                    {message.content}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>
          </ScrollArea>
          <div className="border-t border-border bg-muted/30 px-4 py-3">
            <Textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={placeholder}
              rows={3}
              className="mb-2 resize-none border-none bg-background text-sm shadow-none focus-visible:ring-0"
              aria-label="Message Lemon AI"
              disabled={sendMutation.isPending || !lovableReady}
            />
            <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
              <span>
                {lemonKeyPresent
                  ? "Powered by Lovable Cloud Lemon AI"
                  : "Add Lemon AI credentials to unlock live answers"}
              </span>
              <Button
                type="button"
                size="sm"
                className="gap-2"
                onClick={handleSend}
                disabled={!canSend || sendMutation.isPending}
              >
                {sendMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Send
              </Button>
            </div>
          </div>
        </motion.div>
      )}</AnimatePresence>
      <Button
        type="button"
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg"
        onClick={toggleDock}
        aria-expanded={isOpen}
        aria-controls="lemon-ai-dock"
        aria-label="Open Lemon AI chatbot"
      >
        {sendMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <MessageCircle className="h-5 w-5" />}
      </Button>
    </div>
  );
};

export default ChatDock;
