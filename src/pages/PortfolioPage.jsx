import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioStore } from '../features/portfolio/portfolioSlice';
import PnlSummary from '../features/portfolio/components/PnlSummary';
import HoldingsTable from '../features/portfolio/components/HoldingsTable';
import AllocationChart from '../features/portfolio/components/AllocationChart';

const PortfolioPage = () => {
  const { holdings, summary, loading, fetchAll } = usePortfolioStore();
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-textprimary">Portfolio</h1>
        <p className="mt-0.5 text-xs text-textsecondary">Your holdings and allocation breakdown</p>
      </div>

      {loading && !summary ? (
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-card bg-surface" />
          ))}
        </div>
      ) : (
        <div className="mb-6">
          <PnlSummary summary={summary} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_340px]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-card border border-bordersubtle bg-surface p-5 shadow-sm"
        >
          <h2 className="mb-4 text-base font-semibold tracking-tight text-textprimary">Holdings</h2>
          <HoldingsTable holdings={holdings} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-card border border-bordersubtle bg-surface p-5 shadow-sm"
        >
          <h2 className="mb-4 text-base font-semibold tracking-tight text-textprimary">Allocation</h2>
          <AllocationChart holdings={holdings} cashBalance={summary?.cashBalance || 0} />
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioPage;