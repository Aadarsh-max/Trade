import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Minus, Wallet as WalletIcon } from 'lucide-react';
import { useWalletStore } from '../features/wallet/walletSlice';
import DepositModal from '../features/wallet/components/DepositModal';
import WithdrawModal from '../features/wallet/components/WithdrawModal';
import TransactionHistory from '../features/wallet/components/TransactionHistory';
import Button from '../components/common/Button';
import { formatCurrency } from '../utils/formatters';
import { verifyStripePaymentApi } from '../api/payments.api';
import Loader from '../components/common/Loader';

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
    withdraw,
  } = useWalletStore();

  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const paymentStatus = searchParams.get('payment_status');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (paymentStatus === 'success' && sessionId) {
      handleStripeVerification(sessionId);
    } else if (paymentStatus === 'cancelled') {
      setVerifyMessage('Payment was cancelled.');
      setSearchParams({});
    }
  }, [paymentStatus, sessionId]);

  const handleStripeVerification = async (sessionId) => {
    setVerifying(true);
    setVerifyMessage('Verifying your payment...');

    try {
      await verifyStripePaymentApi(sessionId);
      setVerifyMessage('Payment verified! Your wallet has been credited.');
      await fetchBalance();
      await fetchTransactions();
    } catch (err) {
      setVerifyMessage('Payment verification failed. Please contact support.');
    } finally {
      setVerifying(false);
      setSearchParams({});
    }
  };

  if (loading) return <Loader fullPage text="Loading wallet" />;

  return (
    <div className="animate-fade-in">
      {verifyMessage && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-4 flex items-center gap-2 rounded-control border px-4 py-3 text-sm font-medium ${
            verifyMessage.includes('credited')
              ? 'border-success/30 bg-success/10 text-success'
              : verifyMessage.includes('cancelled') || verifyMessage.includes('failed')
              ? 'border-danger/30 bg-danger/10 text-danger'
              : 'border-accent/30 bg-accent/10 text-accent'
          }`}
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
          </span>
          {verifyMessage}
        </motion.div>
      )}

      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-textprimary">Wallet</h1>
        <p className="mt-0.5 text-xs text-textsecondary">Manage your funds and transactions</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-6 overflow-hidden rounded-card border border-bordersubtle bg-linear-to-br from-accent/12 via-surface to-surface p-6 shadow-sm"
      >
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15">
                <WalletIcon size={16} className="text-accent" />
              </span>
              <span className="text-sm font-medium text-textsecondary">Available balance</span>
            </div>
            {loading || verifying ? (
              <div className="h-10 w-44 animate-pulse rounded-control bg-glass" />
            ) : (
              <p className="text-3xl font-bold tracking-tight tabular-nums text-textprimary sm:text-4xl">
                {formatCurrency(balance, currency)}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={() => setDepositOpen(true)}>
              <Plus size={16} />
              Add funds
            </Button>
            <Button variant="soft" onClick={() => setWithdrawOpen(true)}>
              <Minus size={16} />
              Withdraw
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-card border border-bordersubtle bg-surface p-6 shadow-sm"
      >
        <h2 className="mb-4 text-base font-semibold tracking-tight text-textprimary">Transaction history</h2>
        <TransactionHistory transactions={transactions} />
      </motion.div>

      <DepositModal isOpen={depositOpen} onClose={() => setDepositOpen(false)} />

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