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
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setProvider('razorpay')}
          className={cn(
            'flex-1 h-9 rounded-control text-xs font-medium transition-colors border',
            provider === 'razorpay'
              ? 'bg-accent text-white border-accent'
              : 'bg-glass text-textsecondary border-bordersubtle hover:text-textprimary'
          )}
        >
          Razorpay
        </button>
        <button
          onClick={() => setProvider('stripe')}
          className={cn(
            'flex-1 h-9 rounded-control text-xs font-medium transition-colors border',
            provider === 'stripe'
              ? 'bg-accent text-white border-accent'
              : 'bg-glass text-textsecondary border-bordersubtle hover:text-textprimary'
          )}
        >
          Stripe
        </button>
      </div>

      <motion.div
        key={provider}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
      >
        {provider === 'razorpay' ? <RazorpayCheckout onSuccess={handleSuccess} /> : <StripeCheckout />}
      </motion.div>
    </Modal>
  );
};

export default DepositModal;