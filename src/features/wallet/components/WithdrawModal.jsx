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
        <label className="text-textsecondary text-xs mb-2 block">Amount</label>
        <Input
          type="number"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          autoFocus
        />
        <p className="text-textmuted text-xs mt-1.5">Available: ₹{maxAmount.toLocaleString()}</p>
        <ErrorText>{localError || error}</ErrorText>

        <Button type="submit" loading={loading} variant="ghost" className="w-full mt-5">
          Withdraw
        </Button>
      </form>
    </Modal>
  );
};

export default WithdrawModal;