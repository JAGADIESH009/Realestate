import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import PropertyCard from './PropertyCard';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  properties?: any[];
  functionCalls?: any[];
};

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello. I'm Sai Gaurav AI. I can help you explore properties, understand available options, or arrange a site visit."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });
      
      const data = await response.json();
      if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: 'I apologize, but I am currently unavailable. Please try again later.' }]);
      } else {
        setMessages(prev => [...prev, data as Message]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'I apologize, but there was an error processing your request. Our team can assist you directly.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    "Find a Property",
    "Explore Properties",
    "Book a Site Visit",
    "Talk to an Agent"
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            {msg.content && (
              <div 
                className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                  msg.role === 'user' 
                    ? 'bg-warm-ivory text-forest-charcoal font-medium' 
                    : 'bg-warm-ivory/10 text-warm-ivory border border-warm-ivory/10'
                }`}
              >
                <p className="font-sans text-sm leading-relaxed">{msg.content}</p>
              </div>
            )}
            
            {/* Render Property Cards if available */}
            {msg.properties && msg.properties.length > 0 && (
              <div className="w-full mt-4 space-y-4">
                {msg.properties.map((prop: any) => (
                  <PropertyCard key={prop.id} property={prop} onBookVisit={() => handleSend(`I want to book a site visit for ${prop.name}`)} />
                ))}
              </div>
            )}

            {/* Render Form if talk to agent or book visit function was mentioned but we need more info...
                Actually, the AI will just ask questions. But if we want custom UI, we could trigger it here.
                For simplicity, the prompt requires "Book a Site Visit -> collect necessary information".
                We can show the booking form if the AI asks for contact details.
                Let's use a simple heuristic: if functionCalls array has 'book_visit' but it's missing args?
                Wait, our backend handles full function calls. The AI will converse to get info, then call 'book_visit' when it has all args.
            */}
          </motion.div>
        ))}
        
        {/* Quick Actions (only show at the beginning) */}
        {messages.length === 1 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex flex-col space-y-2 mt-4"
          >
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(action)}
                className="self-start text-left bg-transparent border border-warm-ivory/20 hover:bg-warm-ivory hover:text-forest-charcoal hover:border-warm-ivory text-warm-ivory px-4 py-2 rounded-full font-sans text-xs tracking-wide transition-colors duration-300"
              >
                {action}
              </button>
            ))}
          </motion.div>
        )}

        {isLoading && (
          <div className="flex items-start">
            <div className="bg-warm-ivory/5 text-warm-ivory border border-warm-ivory/10 rounded-2xl px-5 py-3 flex items-center space-x-2">
              <Loader2 size={16} className="animate-spin text-warm-ivory/50" />
              <span className="font-sans text-xs text-warm-ivory/50">Sai Gaurav AI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-warm-ivory/10 bg-forest-charcoal/90">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about properties, locations, or pricing..."
            className="w-full bg-warm-ivory/5 border border-warm-ivory/20 rounded-full pl-5 pr-12 py-3 md:py-4 font-sans text-sm text-warm-ivory placeholder-warm-ivory/40 focus:outline-none focus:ring-1 focus:ring-warm-ivory/50 focus:border-warm-ivory/50 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 rounded-full bg-warm-ivory text-forest-charcoal disabled:opacity-50 disabled:cursor-not-allowed hover:bg-warm-ivory/90 transition-colors"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
