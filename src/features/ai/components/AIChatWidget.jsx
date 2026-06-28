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
    <div className="bg-surface border border-bordersubtle rounded-card flex flex-col h-140">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-bordersubtle">
        <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center">
          <Sparkles size={14} className="text-accent" />
        </div>
        <div>
          <p className="text-textprimary text-sm font-medium">Trading assistant</p>
          <p className="text-textmuted text-xs">Aware of your portfolio</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <Sparkles size={24} className="text-textmuted mb-3" />
            <p className="text-textsecondary text-sm">Ask me about your portfolio, market trends, or trading concepts</p>
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
              className={`max-w-[80%] px-3.5 py-2.5 rounded-control text-sm ${
                msg.role === 'user'
                  ? 'bg-accent text-white'
                  : 'bg-glass text-textprimary border border-bordersubtle'
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-glass border border-bordersubtle rounded-control px-3.5 py-2.5 flex items-center gap-2">
              <Loader2 size={14} className="animate-spin text-textsecondary" />
              <span className="text-textmuted text-xs">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-bordersubtle">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your portfolio..."
          className="flex-1 h-10 px-3 rounded-control bg-glass border border-bordersubtle text-textprimary text-sm placeholder:text-textmuted outline-none focus:border-borderstrong"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-10 h-10 rounded-control bg-accent hover:bg-accentstrong disabled:opacity-40 flex items-center justify-center transition-colors shrink-0"
        >
          <Send size={16} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default AIChatWidget;