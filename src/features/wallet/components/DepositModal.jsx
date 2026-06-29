import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '../../../components/common/Modal';
import StripeCheckout from '../../payments/components/StripeCheckout';
import RazorpayCheckout from '../../payments/components/RazorpayCheckout';
import { cn } from '../../../utils/cn';

const DepositModal = ({ isOpen, onClose }) => {
  const [provider, setProvider] = useState('razorpay');

  const handleSuccess = () => {
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add funds">
      <div className="mb-5 grid grid-cols-2 gap-1 rounded-control bg-glass p-1">
        <button
          onClick={() => setProvider('razorpay')}
          className={cn(
            'h-9 cursor-pointer rounded-md text-xs font-semibold transition-all duration-200 active:scale-[0.98]',
            provider === 'razorpay'
              ? 'bg-accent text-white shadow-sm shadow-accent/25'
              : 'text-textsecondary hover:text-textprimary'
          )}
        >
          Razorpay
        </button>
        <button
          onClick={() => setProvider('stripe')}
          className={cn(
            'h-9 cursor-pointer rounded-md text-xs font-semibold transition-all duration-200 active:scale-[0.98]',
            provider === 'stripe'
              ? 'bg-accent text-white shadow-sm shadow-accent/25'
              : 'text-textsecondary hover:text-textprimary'
          )}
        >
          Stripe
        </button>
      </div>

      <motion.div
        key={provider}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
      >
        {provider === 'razorpay' ? <RazorpayCheckout onSuccess={handleSuccess} /> : <StripeCheckout />}
      </motion.div>
    </Modal>
  );
};

export default DepositModal;