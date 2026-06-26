import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMarketStore } from '../features/market/marketSlice';
import { useOrdersStore } from '../features/orders/ordersSlice';
import PriceTicker from '../features/market/components/PriceTicker';
import CandlestickChart from '../features/market/components/CandlestickChart';
import Watchlist from '../features/market/components/Watchlist';
import OrderForm from '../features/orders/components/OrderForm';
import OrderBook from '../features/orders/components/OrderBook';
import OrderHistory from '../features/orders/components/OrderHistory';

const TradePage = () => {
  const { selectedSymbol, fetchWatchlistQuotes, fetchCandles } = useMarketStore();
  const { fetchOrders } = useOrdersStore();

  useEffect(() => {
    fetchWatchlistQuotes();
    fetchCandles(selectedSymbol);
    fetchOrders();

    const priceInterval = setInterval(() => fetchWatchlistQuotes(), 5000);
    const orderInterval = setInterval(() => fetchOrders(), 8000);

    return () => {
      clearInterval(priceInterval);
      clearInterval(orderInterval);
    };
  }, []);

  return (
    <div>
      <h1 className="text-xl font-medium text-textprimary mb-6">Trade</h1>

      <PriceTicker />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 mt-4">
        <div className="flex flex-col gap-4">
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

          <div className="bg-surface border border-bordersubtle rounded-card p-5">
            <h2 className="text-textprimary text-base font-medium mb-4">Order history</h2>
            <OrderHistory />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <OrderForm />
          <OrderBook />
          <Watchlist />
        </div>
      </div>
    </div>
  );
};

export default TradePage;