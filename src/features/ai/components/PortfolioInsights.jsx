import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import { useAiStore } from '../aiSlice';

const PortfolioInsights = () => {
  const { insights, insightsLoading, fetchInsights } = useAiStore();

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-accent/10 border border-accent/25 rounded-card p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={15} className="text-accent" />
          <span className="text-accent text-sm font-medium">AI insight</span>
        </div>
        <button
          onClick={fetchInsights}
          disabled={insightsLoading}
          className="text-textmuted hover:text-textprimary transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={insightsLoading ? 'animate-spin' : ''} />
        </button>
      </div>

      {insightsLoading && !insights ? (
        <div className="flex flex-col gap-2">
          <div className="h-3 bg-glass rounded animate-pulse w-full" />
          <div className="h-3 bg-glass rounded animate-pulse w-4/5" />
        </div>
      ) : (
        <p className="text-textsecondary text-sm leading-relaxed">{insights}</p>
      )}
    </motion.div>
  );
};

export default PortfolioInsights;