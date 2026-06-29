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
      className="relative overflow-hidden rounded-card border border-accent/25 bg-linear-to-br from-accent/12 via-accent/5 to-transparent p-5 shadow-sm"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/10 blur-2xl" />

      <div className="relative mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 ring-1 ring-inset ring-accent/20">
            <Sparkles size={14} className="text-accent" />
          </span>
          <span className="text-sm font-semibold text-accent">AI insight</span>
        </div>
        <button
          onClick={fetchInsights}
          disabled={insightsLoading}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-textmuted transition-all duration-200 hover:bg-accent/10 hover:text-accent active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw size={14} className={insightsLoading ? 'animate-spin' : ''} />
        </button>
      </div>

      {insightsLoading && !insights ? (
        <div className="relative flex flex-col gap-2">
          <div className="h-3 w-full overflow-hidden rounded bg-glass">
            <div className="h-full w-full -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-accent/20 to-transparent" />
          </div>
          <div className="h-3 w-4/5 overflow-hidden rounded bg-glass">
            <div className="h-full w-full -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-accent/20 to-transparent" />
          </div>
        </div>
      ) : (
        <p className="relative text-sm leading-relaxed text-textsecondary">{insights}</p>
      )}
    </motion.div>
  );
};

export default PortfolioInsights;