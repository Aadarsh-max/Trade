import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { useAiStore } from '../aiSlice';

const AIChatWidget = () => {
  const { messages, sendMessage, fetchChatHistory, loading } = useAiStore();
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const message = input;
    setInput('');
    await sendMessage(message);
  };

  return (
    <div className="flex h-140 flex-col overflow-hidden rounded-card border border-bordersubtle bg-surface shadow-sm">
      <div className="flex items-center gap-3 border-b border-bordersubtle bg-glass px-5 py-4">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-accent to-accentstrong shadow-sm shadow-accent/20">
          <Sparkles size={16} className="text-white" />
          <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-textprimary">Trading assistant</p>
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            <span className="text-xs text-textmuted">Aware of your portfolio</span>
          </span>
        </div>
      </div>

      <div ref={scrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-4">
        {messages.length === 0 && (
          <div className="flex flex-1 animate-fade-in flex-col items-center justify-center px-4 text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 rounded-2xl bg-accent/10 blur-xl" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-bordersubtle bg-surface">
                <Sparkles size={24} className="text-accent" />
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-textsecondary">
              Ask me about your portfolio, market trends, or trading concepts
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'rounded-2xl rounded-br-md bg-accent text-white shadow-accent/20'
                  : 'rounded-2xl rounded-bl-md border border-bordersubtle bg-glass text-textprimary'
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}

        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-bordersubtle bg-glass px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-textmuted [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-textmuted [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-textmuted" />
            </div>
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-bordersubtle bg-glass px-4 py-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your portfolio..."
          className="h-10 flex-1 rounded-control border border-bordersubtle bg-surface px-3.5 text-sm text-textprimary outline-none transition-all duration-200 placeholder:text-textmuted focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-control bg-accent text-white shadow-sm shadow-accent/20 transition-all duration-200 hover:bg-accentstrong hover:shadow-md hover:shadow-accent/25 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

export default AIChatWidget;