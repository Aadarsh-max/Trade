import { useEffect } from "react";
import { motion } from "framer-motion";
import { useMarketStore } from "../features/market/marketSlice";
import { useOrdersStore } from "../features/orders/ordersSlice";
import PriceTicker from "../features/market/components/PriceTicker";
import CandlestickChart from "../features/market/components/CandlestickChart";
import Watchlist from "../features/market/components/Watchlist";
import OrderForm from "../features/orders/components/OrderForm";
import OrderBook from "../features/orders/components/OrderBook";
import OrderHistory from "../features/orders/components/OrderHistory";
import Loader from "../components/common/Loader";

const TradePage = () => {
  const {
    selectedSymbol,
    loading,
    fetchWatchlistQuotes,
    fetchCandles,
    subscribeToWatchlist,
  } = useMarketStore();
  const { fetchOrders } = useOrdersStore();

  useEffect(() => {
    fetchWatchlistQuotes();
    fetchCandles(selectedSymbol);
    fetchOrders();
    subscribeToWatchlist();
  }, []);

  if (loading) return <Loader fullPage text="Loading markets" />;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-textprimary">Trade</h1>
        <p className="mt-0.5 text-xs text-textsecondary">Live markets, orders and your watchlist</p>
      </div>

      <PriceTicker />

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-card border border-bordersubtle bg-surface p-5 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-textprimary">
                {selectedSymbol.replace("USDT", "/USDT")}
              </span>
              <span className="rounded-full bg-glass px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-textmuted">
                Live
              </span>
            </div>
            <CandlestickChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-card border border-bordersubtle bg-surface p-5 shadow-sm"
          >
            <h2 className="mb-4 text-base font-semibold tracking-tight text-textprimary">
              Order history
            </h2>
            <OrderHistory />
          </motion.div>
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