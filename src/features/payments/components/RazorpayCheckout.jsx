import { useState, useEffect } from 'react';
import { Smartphone, CheckCircle2 } from 'lucide-react';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import ErrorText from '../../../components/common/ErrorText';
import { usePaymentsStore } from '../paymentsSlice';
import { useWalletStore } from '../../wallet/walletSlice';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const RazorpayCheckout = ({ onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [localError, setLocalError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('idle');
  const { createRazorpayOrder, loading, error, clearError } = usePaymentsStore();
  const fetchBalance = useWalletStore((state) => state.fetchBalance);

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (!numAmount || numAmount <= 0) {
      setLocalError('Enter a valid amount');
      return;
    }

    setLocalError('');
    clearError();

    const orderData = await createRazorpayOrder(numAmount);

    if (!orderData) {
      return;
    }

    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded || !window.Razorpay) {
      setLocalError('Failed to load Razorpay checkout, check your connection');
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: Math.round(numAmount * 100),
      currency: 'INR',
      name: 'Tradeflow',
      description: 'Wallet deposit',
      order_id: orderData.orderId,
      handler: function () {
        setPaymentStatus('confirming');
        setTimeout(async () => {
          await fetchBalance();
          setPaymentStatus('success');
          setAmount('');
          if (onSuccess) onSuccess();
        }, 2000);
      },
      modal: {
        ondismiss: function () {
          setPaymentStatus('idle');
        },
      },
      theme: {
        color: '#6258cf',
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  if (paymentStatus === 'confirming') {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <p className="text-sm font-medium text-textsecondary">Confirming your payment…</p>
        <p className="mt-1 text-xs text-textmuted">This will only take a moment</p>
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <div className="relative mb-3">
          <div className="absolute inset-0 rounded-full bg-success/15 blur-xl" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-success/12">
            <CheckCircle2 size={26} className="text-success" />
          </div>
        </div>
        <p className="text-sm font-semibold text-success">Payment successful</p>
        <p className="mt-1 text-xs text-textmuted">Your wallet has been updated</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 flex items-center gap-2.5 rounded-control border border-bordersubtle bg-glass px-3 py-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/12">
          <Smartphone size={15} className="text-accent" />
        </span>
        <span className="text-xs font-medium text-textsecondary">Pay with UPI, cards, netbanking (India)</span>
      </div>

      <label className="mb-2 block text-xs font-medium text-textsecondary">Amount (INR)</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-textmuted">₹</span>
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
        {loading ? 'Processing…' : 'Continue to Razorpay'}
      </Button>
    </form>
  );
};

export default RazorpayCheckout;