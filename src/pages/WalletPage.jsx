import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Wallet as WalletIcon } from 'lucide-react';
import { useWalletStore } from '../features/wallet/walletSlice';
import DepositModal from '../features/wallet/components/DepositModal';
import WithdrawModal from '../features/wallet/components/WithdrawModal';
import TransactionHistory from '../features/wallet/components/TransactionHistory';
import Button from '../components/common/Button';
import { formatCurrency } from '../lib/formatters';

const WalletPage = () => {
  const {
    balance,
    currency,
    transactions,
    loading,
    actionLoading,
    error,
    fetchBalance,
    fetchTransactions,
    deposit,
    withdraw,
  } = useWalletStore();

  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-medium text-textprimary mb-6">Wallet</h1>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-glass backdrop-blur-md border border-bordersubtle rounded-card p-6 mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <WalletIcon size={16} className="text-textsecondary" />
              <span className="text-textsecondary text-sm">Available balance</span>
            </div>
            {loading ? (
              <div className="h-9 w-40 bg-surface rounded-control animate-pulse" />
            ) : (
              <p className="text-textprimary text-3xl font-medium">{formatCurrency(balance, currency)}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={() => setDepositOpen(true)}>
              <Plus size={16} />
              Add funds
            </Button>
            <Button variant="ghost" onClick={() => setWithdrawOpen(true)}>
              <Minus size={16} />
              Withdraw
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="bg-surface border border-bordersubtle rounded-card p-6">
        <h2 className="text-textprimary text-base font-medium mb-4">Transaction history</h2>
        <TransactionHistory transactions={transactions} />
      </div>

      <DepositModal
        isOpen={depositOpen}
        onClose={() => setDepositOpen(false)}
        onDeposit={deposit}
        loading={actionLoading}
        error={error}
      />

      <WithdrawModal
        isOpen={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        onWithdraw={withdraw}
        loading={actionLoading}
        error={error}
        maxAmount={balance}
      />
    </div>
  );
};

export default WalletPage;