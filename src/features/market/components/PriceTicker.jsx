import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useMarketStore } from '../marketSlice';
import { formatCurrency } from '../../../utils/formatters';

const PriceTicker = () => {
  const { watchlist, quotes, selectedSymbol, selectSymbol } = useMarketStore();

  return (
    <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
      {watchlist.map((symbol) => {
        const quote = quotes[symbol];
        const isSelected = symbol === selectedSymbol;
        const change = quote?.changePercent ?? quote?.priceChangePercent;
        const isUp = Number(change) >= 0;

        return (
          <motion.button
            key={symbol}
            onClick={() => selectSymbol(symbol)}
            whileTap={{ scale: 0.97 }}
            className={`group relative shrink-0 overflow-hidden rounded-card border px-4 py-3 text-left transition-all duration-200 min-w-37 cursor-pointer ${
              isSelected
                ? 'border-accent/50 bg-accent/10 shadow-sm shadow-accent/10'
                : 'border-bordersubtle bg-surface hover:-translate-y-0.5 hover:border-borderstrong hover:shadow-sm'
            }`}
          >
            {isSelected && (
              <span className="absolute inset-x-0 top-0 h-0.5 bg-accent" />
            )}
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-textprimary">{symbol.replace('USDT', '')}</p>
              {quote && change != null && (
                <span
                  className={`flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    isUp ? 'bg-success/12 text-success' : 'bg-danger/12 text-danger'
                  }`}
                >
                  {isUp ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                  {Math.abs(Number(change)).toFixed(2)}%
                </span>
              )}
            </div>
            {quote ? (
              <p className="mt-1.5 text-sm font-medium tabular-nums text-textsecondary">
                {formatCurrency(quote.price, 'USD')}
              </p>
            ) : (
              <div className="mt-1.5 h-4 w-16 animate-pulse rounded bg-glass" />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default PriceTicker;