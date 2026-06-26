import { useState, useEffect } from 'react';
import { Smartphone } from 'lucide-react';
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
        color: '#7f77dd',
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  if (paymentStatus === 'confirming') {
    return (
      <div className="text-center py-6">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-textsecondary text-sm">Confirming your payment...</p>
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div className="text-center py-6">
        <p className="text-success text-sm font-medium">Payment successful</p>
        <p className="text-textmuted text-xs mt-1">Your wallet has been updated</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 mb-3">
        <Smartphone size={16} className="text-textsecondary" />
        <span className="text-textsecondary text-sm">Pay with UPI, cards, netbanking (India)</span>
      </div>

      <label className="text-textsecondary text-xs mb-2 block">Amount (INR)</label>
      <Input
        type="number"
        step="0.01"
        placeholder="0.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <ErrorText>{localError || error}</ErrorText>

      <Button type="submit" loading={loading} className="w-full mt-5">
        Continue to Razorpay
      </Button>
    </form>
  );
};

export default RazorpayCheckout;