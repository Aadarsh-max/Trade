import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useWalletStore } from '../features/wallet/walletSlice';
import { usePortfolioStore } from '../features/portfolio/portfolioSlice';
import { useMarketStore } from '../features/market/marketSlice';
import PnlSummary from '../features/portfolio/components/PnlSummary';
import PriceTicker from '../features/market/components/PriceTicker';
import Skeleton from '../components/common/Skeleton';

const DashboardPage = () => {
  const { fetchBalance } = useWalletStore();
  const { summary, loading, fetchSummary } = usePortfolioStore();
  const { fetchWatchlistQuotes, subscribeToWatchlist } = useMarketStore();

  useEffect(() => {
    fetchBalance();
    fetchSummary();
    fetchWatchlistQuotes();
    subscribeToWatchlist();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-medium text-textprimary mb-6">Dashboard</h1>

      {loading && !summary ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      ) : (
        <div className="mb-6">
          <PnlSummary summary={summary} />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface border border-bordersubtle rounded-card p-5 mb-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-textprimary text-base font-medium">Markets</h2>
          <Link to="/trade" className="text-accent text-xs flex items-center gap-1 hover:text-accentstrong">
            Trade now <ArrowRight size={12} />
          </Link>
        </div>
        <PriceTicker />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/wallet"
          className="bg-glass border border-bordersubtle rounded-card p-5 hover:border-borderstrong transition-colors"
        >
          <p className="text-textprimary text-sm font-medium mb-1">Manage wallet</p>
          <p className="text-textmuted text-xs">Add funds or check transaction history</p>
        </Link>
        <Link
          to="/ai"
          className="bg-glass border border-bordersubtle rounded-card p-5 hover:border-borderstrong transition-colors"
        >
          <p className="text-textprimary text-sm font-medium mb-1">Ask the AI assistant</p>
          <p className="text-textmuted text-xs">Get insights on your portfolio</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;