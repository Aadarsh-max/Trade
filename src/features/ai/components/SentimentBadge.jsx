import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getSentimentApi } from '../../../api/ai.api';

const sentimentConfig = {
  bullish: { icon: TrendingUp, color: 'text-success', bg: 'bg-success/15', ring: 'ring-success/25' },
  bearish: { icon: TrendingDown, color: 'text-danger', bg: 'bg-danger/15', ring: 'ring-danger/25' },
  neutral: { icon: Minus, color: 'text-textsecondary', bg: 'bg-glass', ring: 'ring-bordersubtle' },
};

const SentimentBadge = ({ symbol }) => {
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkSentiment = async () => {
    setLoading(true);
    try {
      const headlines = [
        `${symbol.replace('USDT', '')} price action and market outlook today`,
        `Trading volume and momentum analysis for ${symbol.replace('USDT', '')}`,
      ];
      const response = await getSentimentApi(headlines);
      setSentiment(response.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  if (!sentiment) {
    return (
      <button
        onClick={checkSentiment}
        disabled={loading}
        className="inline-flex cursor-pointer items-center gap-1 rounded-control border border-bordersubtle bg-glass px-2 py-1 text-xs font-medium text-textmuted transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-accent active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <span className="h-1 w-1 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
            <span className="h-1 w-1 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
            <span className="h-1 w-1 animate-bounce rounded-full bg-current" />
          </>
        ) : (
          'Check sentiment'
        )}
      </button>
    );
  }

  const config = sentimentConfig[sentiment.sentiment] || sentimentConfig.neutral;
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex animate-fade-in items-center gap-1.5 rounded-control px-2 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${config.bg} ${config.color} ${config.ring}`}
      title={sentiment.summary}
    >
      <Icon size={12} className={config.color} />
      <span>{sentiment.sentiment}</span>
    </div>
  );
};

export default SentimentBadge;