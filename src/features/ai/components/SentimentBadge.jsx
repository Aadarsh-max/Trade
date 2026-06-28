import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getSentimentApi } from '../../../api/ai.api';

const sentimentConfig = {
  bullish: { icon: TrendingUp, color: 'text-success', bg: 'bg-success/15' },
  bearish: { icon: TrendingDown, color: 'text-danger', bg: 'bg-danger/15' },
  neutral: { icon: Minus, color: 'text-textsecondary', bg: 'bg-glass' },
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
        className="text-xs text-textmuted hover:text-accent transition-colors disabled:opacity-50"
      >
        {loading ? '...' : 'Check sentiment'}
      </button>
    );
  }

  const config = sentimentConfig[sentiment.sentiment] || sentimentConfig.neutral;
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-control ${config.bg}`} title={sentiment.summary}>
      <Icon size={11} className={config.color} />
      <span className={`text-xs ${config.color} capitalize`}>{sentiment.sentiment}</span>
    </div>
  );
};

export default SentimentBadge;