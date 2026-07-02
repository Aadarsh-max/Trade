import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Wallet, Sparkles } from 'lucide-react';
import { useWalletStore } from '../features/wallet/walletSlice';
import { usePortfolioStore } from '../features/portfolio/portfolioSlice';
import { useMarketStore } from '../features/market/marketSlice';
import PnlSummary from '../features/portfolio/components/PnlSummary';
import PriceTicker from '../features/market/components/PriceTicker';
import Skeleton from '../components/common/Skeleton';
import Loader from '../components/common/Loader';

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

  if (loading) return <Loader fullPage text="Loading dashboard" />;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-textprimary">Dashboard</h1>
        <p className="mt-0.5 text-xs text-textsecondary">Your portfolio at a glance</p>
      </div>

      {loading && !summary ? (
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24" />
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
        className="mb-4 rounded-card border border-bordersubtle bg-surface p-5 shadow-sm"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold tracking-tight text-textprimary">Markets</h2>
          <Link
            to="/trade"
            className="group flex items-center gap-1 rounded-control px-2 py-1 text-xs font-semibold text-accent transition-colors hover:bg-accent/10 hover:text-accentstrong"
          >
            Trade now
            <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <PriceTicker />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link
          to="/wallet"
          className="group flex items-center gap-4 rounded-card border border-bordersubtle bg-surface p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-borderstrong hover:shadow-md"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/12 transition-transform duration-200 group-hover:scale-105">
            <Wallet size={20} className="text-accent" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-textprimary">Manage wallet</p>
            <p className="mt-0.5 text-xs text-textmuted">Add funds or check transaction history</p>
          </div>
          <ArrowRight size={16} className="text-textmuted transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent" />
        </Link>
        <Link
          to="/ai"
          className="group flex items-center gap-4 rounded-card border border-bordersubtle bg-surface p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-borderstrong hover:shadow-md"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/12 transition-transform duration-200 group-hover:scale-105">
            <Sparkles size={20} className="text-accent" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-textprimary">Ask the AI assistant</p>
            <p className="mt-0.5 text-xs text-textmuted">Get insights on your portfolio</p>
          </div>
          <ArrowRight size={16} className="text-textmuted transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent" />
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;