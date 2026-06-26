import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMarketStore } from '../features/market/marketSlice';
import PriceTicker from '../features/market/components/PriceTicker';
import CandlestickChart from '../features/market/components/CandlestickChart';
import Watchlist from '../features/market/components/Watchlist';

const TradePage = () => {
  const { selectedSymbol, fetchWatchlistQuotes, fetchCandles } = useMarketStore();

  useEffect(() => {
    fetchWatchlistQuotes();
    fetchCandles(selectedSymbol);

    const interval = setInterval(() => {
      fetchWatchlistQuotes();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-medium text-textprimary mb-6">Trade</h1>

      <PriceTicker />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-bordersubtle rounded-card p-5"
        >
          <p className="text-textprimary text-sm font-medium mb-4">
            {selectedSymbol.replace('USDT', '/USDT')}
          </p>
          <CandlestickChart />
        </motion.div>

        <Watchlist />
      </div>
    </div>
  );
};

export default TradePage;