import { useState } from 'react';
import Modal from '../../../components/common/Modal';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import ErrorText from '../../../components/common/ErrorText';

const WithdrawModal = ({ isOpen, onClose, onWithdraw, loading, error, maxAmount }) => {
  const [amount, setAmount] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (!numAmount || numAmount <= 0) {
      setLocalError('Enter a valid amount');
      return;
    }

    if (numAmount > maxAmount) {
      setLocalError('Amount exceeds available balance');
      return;
    }

    setLocalError('');
    const success = await onWithdraw(numAmount);
    if (success) {
      setAmount('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Withdraw funds">
      <form onSubmit={handleSubmit}>
        <label className="mb-2 block text-xs font-medium text-textsecondary">Amount</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-textmuted">₹</span>
          <Input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            autoFocus
            className="pl-8"
          />
        </div>

        <div className="mt-2 flex items-center justify-between rounded-control border border-bordersubtle bg-glass px-3 py-2">
          <span className="text-xs text-textmuted">Available balance</span>
          <button
            type="button"
            onClick={() => setAmount(String(maxAmount))}
            className="cursor-pointer text-xs font-semibold tabular-nums text-accent transition-colors hover:text-accentstrong"
          >
            ₹{maxAmount.toLocaleString()}
          </button>
        </div>

        <ErrorText>{localError || error}</ErrorText>

        <Button type="submit" loading={loading} variant="ghost" className="mt-5 w-full">
          {loading ? 'Withdrawing…' : 'Withdraw'}
        </Button>
      </form>
    </Modal>
  );
};

export default WithdrawModal;