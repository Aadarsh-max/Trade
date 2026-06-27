import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioStore } from '../features/portfolio/portfolioSlice';
import PnlSummary from '../features/portfolio/components/PnlSummary';
import HoldingsTable from '../features/portfolio/components/HoldingsTable';
import AllocationChart from '../features/portfolio/components/AllocationChart';

const PortfolioPage = () => {
  const { holdings, summary, loading, fetchAll } = usePortfolioStore();

  useEffect(() => {
    fetchAll();

    const interval = setInterval(() => fetchAll(), 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-medium text-textprimary mb-6">Portfolio</h1>

      {loading && !summary ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-surface rounded-card animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="mb-6">
          <PnlSummary summary={summary} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-bordersubtle rounded-card p-5"
        >
          <h2 className="text-textprimary text-base font-medium mb-4">Holdings</h2>
          <HoldingsTable holdings={holdings} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-bordersubtle rounded-card p-5"
        >
          <h2 className="text-textprimary text-base font-medium mb-4">Allocation</h2>
          <AllocationChart holdings={holdings} cashBalance={summary?.cashBalance || 0} />
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioPage;