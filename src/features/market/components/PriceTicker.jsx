import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useMarketStore } from '../marketSlice';
import { formatCurrency } from '../../../utils/formatters';

const PriceTicker = () => {
  const { watchlist, quotes, selectedSymbol, selectSymbol } = useMarketStore();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {watchlist.map((symbol) => {
        const quote = quotes[symbol];
        const isSelected = symbol === selectedSymbol;

        return (
          <motion.button
            key={symbol}
            onClick={() => selectSymbol(symbol)}
            whileTap={{ scale: 0.97 }}
            className={`shrink-0 px-4 py-3 rounded-control border transition-colors text-left min-w-35 ${
              isSelected
                ? 'bg-accent/10 border-accent'
                : 'bg-glass border-bordersubtle hover:border-borderstrong'
            }`}
          >
            <p className="text-textprimary text-sm font-medium">{symbol.replace('USDT', '')}</p>
            {quote ? (
              <p className="text-textsecondary text-xs mt-1">{formatCurrency(quote.price, 'USD')}</p>
            ) : (
              <div className="h-4 w-16 bg-surface rounded animate-pulse mt-1" />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default PriceTicker;