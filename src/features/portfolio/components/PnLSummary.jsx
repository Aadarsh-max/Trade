import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, PieChart } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

const MetricCard = ({ label, value, icon: Icon, accent, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className={`group relative overflow-hidden rounded-card border p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
      accent === 'positive'
        ? 'border-success/25 bg-linear-to-br from-success/12 to-transparent'
        : accent === 'negative'
        ? 'border-danger/25 bg-linear-to-br from-danger/12 to-transparent'
        : 'border-bordersubtle bg-surface'
    }`}
  >
    <div className="mb-3 flex items-center justify-between">
      <span className="text-xs font-medium text-textsecondary">{label}</span>
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full ${
          accent === 'positive' ? 'bg-success/15' : accent === 'negative' ? 'bg-danger/15' : 'bg-glass'
        }`}
      >
        <Icon
          size={14}
          className={
            accent === 'positive' ? 'text-success' : accent === 'negative' ? 'text-danger' : 'text-textsecondary'
          }
        />
      </span>
    </div>
    <p
      className={`text-xl font-bold tabular-nums tracking-tight ${
        accent === 'positive' ? 'text-success' : accent === 'negative' ? 'text-danger' : 'text-textprimary'
      }`}
    >
      {value}
    </p>
  </motion.div>
);

const PnlSummary = ({ summary }) => {
  if (!summary) return null;

  const { netWorth, cashBalance, totalCurrentValue, totalUnrealizedPnl, totalRealizedPnl } = summary;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <MetricCard label="Net worth" value={formatCurrency(netWorth)} icon={Wallet} delay={0} />
      <MetricCard label="Holdings value" value={formatCurrency(totalCurrentValue)} icon={PieChart} delay={0.05} />
      <MetricCard
        label="Unrealized P&L"
        value={`${totalUnrealizedPnl >= 0 ? '+' : ''}${formatCurrency(totalUnrealizedPnl)}`}
        icon={totalUnrealizedPnl >= 0 ? TrendingUp : TrendingDown}
        accent={totalUnrealizedPnl >= 0 ? 'positive' : 'negative'}
        delay={0.1}
      />
      <MetricCard
        label="Realized P&L"
        value={`${totalRealizedPnl >= 0 ? '+' : ''}${formatCurrency(totalRealizedPnl)}`}
        icon={totalRealizedPnl >= 0 ? TrendingUp : TrendingDown}
        accent={totalRealizedPnl >= 0 ? 'positive' : 'negative'}
        delay={0.15}
      />
    </div>
  );
};

export default PnlSummary;