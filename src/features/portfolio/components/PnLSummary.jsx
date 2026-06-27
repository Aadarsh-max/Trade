import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, PieChart } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

const MetricCard = ({ label, value, icon: Icon, accent, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className={`rounded-card p-4 border ${
      accent === 'positive'
        ? 'bg-success/10 border-success/25'
        : accent === 'negative'
        ? 'bg-danger/10 border-danger/25'
        : 'bg-glass border-bordersubtle'
    }`}
  >
    <div className="flex items-center gap-2 mb-2">
      <Icon
        size={14}
        className={
          accent === 'positive' ? 'text-successsoft' : accent === 'negative' ? 'text-dangersoft' : 'text-textsecondary'
        }
      />
      <span className="text-textsecondary text-xs">{label}</span>
    </div>
    <p
      className={`text-xl font-medium ${
        accent === 'positive' ? 'text-successsoft' : accent === 'negative' ? 'text-dangersoft' : 'text-textprimary'
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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