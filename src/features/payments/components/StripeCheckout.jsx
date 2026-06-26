import { useState } from 'react';
import { CreditCard } from 'lucide-react';
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
      <div className="flex items-center gap-2 mb-3">
        <CreditCard size={16} className="text-textsecondary" />
        <span className="text-textsecondary text-sm">Pay with card (international)</span>
      </div>

      <label className="text-textsecondary text-xs mb-2 block">Amount (USD)</label>
      <Input
        type="number"
        step="0.01"
        placeholder="0.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <ErrorText>{localError || error}</ErrorText>

      <Button type="submit" loading={loading} className="w-full mt-5">
        Continue to Stripe
      </Button>

      <p className="text-textmuted text-xs mt-3 text-center">
        You'll be redirected to Stripe's secure checkout
      </p>
    </form>
  );
};

export default StripeCheckout;