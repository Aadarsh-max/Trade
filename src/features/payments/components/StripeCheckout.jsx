import { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import ErrorText from '../../../components/common/ErrorText';
import { usePaymentsStore } from '../paymentsSlice';

const StripeCheckout = () => {
  const [amount, setAmount] = useState('');
  const [localError, setLocalError] = useState('');
  const { startStripeCheckout, loading, error } = usePaymentsStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (!numAmount || numAmount <= 0) {
      setLocalError('Enter a valid amount');
      return;
    }

    setLocalError('');
    await startStripeCheckout(numAmount);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 flex items-center gap-2.5 rounded-control border border-bordersubtle bg-glass px-3 py-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/12">
          <CreditCard size={15} className="text-accent" />
        </span>
        <span className="text-xs font-medium text-textsecondary">Pay with card (international)</span>
      </div>

      <label className="mb-2 block text-xs font-medium text-textsecondary">Amount (USD)</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-textmuted">$</span>
        <Input
          type="number"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="pl-8"
        />
      </div>
      <ErrorText>{localError || error}</ErrorText>

      <Button type="submit" loading={loading} className="mt-5 w-full">
        {loading ? 'Redirecting…' : 'Continue to Stripe'}
      </Button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-textmuted">
        <Lock size={11} />
        You'll be redirected to Stripe's secure checkout
      </p>
    </form>
  );
};

export default StripeCheckout;