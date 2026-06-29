import { motion } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatDate } from '../../../utils/formatters'

const typeConfig = {
  DEPOSIT: { icon: ArrowDownLeft, label: 'Deposit', color: 'text-success', bg: 'bg-success/12' },
  WITHDRAWAL: { icon: ArrowUpRight, label: 'Withdrawal', color: 'text-danger', bg: 'bg-danger/12' },
  TRADE_DEBIT: { icon: TrendingDown, label: 'Trade buy', color: 'text-textsecondary', bg: 'bg-glass' },
  TRADE_CREDIT: { icon: TrendingUp, label: 'Trade sell', color: 'text-textsecondary', bg: 'bg-glass' },
};

const TransactionHistory = ({ transactions }) => {
  if (transactions.length === 0) {
    return <p className="py-10 text-center text-sm text-textmuted">No transactions yet</p>;
  }

  return (
    <div className="flex flex-col">
      {transactions.map((tx, index) => {
        const config = typeConfig[tx.type] || typeConfig.DEPOSIT;
        const Icon = config.icon;
        const isCredit = tx.type === 'DEPOSIT' || tx.type === 'TRADE_CREDIT';

        return (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            className="group -mx-2 flex items-center justify-between gap-3 rounded-control border-b border-bordersubtle px-2 py-3 transition-colors last:border-0 hover:bg-glass/60"
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.bg}`}>
                <Icon size={17} className={config.color} />
              </div>
              <div>
                <p className="text-sm font-semibold text-textprimary">{config.label}</p>
                <p className="mt-0.5 text-xs tabular-nums text-textmuted">{formatDate(tx.createdAt)}</p>
              </div>
            </div>
            <p className={`text-sm font-semibold tabular-nums ${isCredit ? 'text-success' : 'text-danger'}`}>
              {isCredit ? '+' : '-'}
              {formatCurrency(Number(tx.amount))}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TransactionHistory;