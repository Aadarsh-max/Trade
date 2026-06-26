import { motion } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatDate } from '../../../lib/formatters';

const typeConfig = {
  DEPOSIT: { icon: ArrowDownLeft, label: 'Deposit', color: 'text-success' },
  WITHDRAWAL: { icon: ArrowUpRight, label: 'Withdrawal', color: 'text-danger' },
  TRADE_DEBIT: { icon: TrendingDown, label: 'Trade buy', color: 'text-textsecondary' },
  TRADE_CREDIT: { icon: TrendingUp, label: 'Trade sell', color: 'text-textsecondary' },
};

const TransactionHistory = ({ transactions }) => {
  if (transactions.length === 0) {
    return <p className="text-textmuted text-sm text-center py-8">No transactions yet</p>;
  }

  return (
    <div className="flex flex-col gap-1">
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
            className="flex items-center justify-between py-3 px-1 border-b border-bordersubtle last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-glass flex items-center justify-center">
                <Icon size={16} className={config.color} />
              </div>
              <div>
                <p className="text-textprimary text-sm">{config.label}</p>
                <p className="text-textmuted text-xs">{formatDate(tx.createdAt)}</p>
              </div>
            </div>
            <p className={`text-sm font-medium ${isCredit ? 'text-success' : 'text-danger'}`}>
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