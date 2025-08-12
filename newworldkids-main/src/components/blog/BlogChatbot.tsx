
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const BlogChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hi there! I'm the NWKids.org AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const { translations } = useLanguage();
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: "Thanks for your question! I'm currently in demo mode, but in the full version I'll be able to answer questions about our programs, projects, and impact initiatives."
      }]);
    }, 1000);
    
    setInput('');
  };
  
  return (
    <>
      <Button
        className="rounded-full h-14 w-14 bg-[#F2FF44] text-black hover:bg-[#E2EF34] shadow-lg"
        onClick={() => setOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{translations.chatbot.title}</DialogTitle>
            <DialogDescription>
              {translations.chatbot.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="max-h-[300px] overflow-y-auto py-4 px-2">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-3 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    message.role === 'user' 
                      ? 'bg-[#F2FF44] text-black' 
                      : 'bg-white/10 text-white'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={translations.chatbot.inputPlaceholder}
              className="flex-grow"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BlogChatbot;
