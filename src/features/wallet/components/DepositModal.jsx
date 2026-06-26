import { useState } from 'react';
import Modal from '../../../components/common/Modal';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import ErrorText from '../../../components/common/ErrorText';

const DepositModal = ({ isOpen, onClose, onDeposit, loading, error }) => {
  const [amount, setAmount] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (!numAmount || numAmount <= 0) {
      setLocalError('Enter a valid amount');
      return;
    }

    setLocalError('');
    const success = await onDeposit(numAmount);
    if (success) {
      setAmount('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add funds">
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
        <ErrorText>{localError || error}</ErrorText>

        <div className="flex gap-2 mt-5">
          {[500, 1000, 5000].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmount(String(preset))}
              className="flex-1 h-9 rounded-control bg-glass border border-bordersubtle text-textsecondary text-xs hover:text-textprimary hover:border-borderstrong transition-colors"
            >
              ₹{preset}
            </button>
          ))}
        </div>

        <Button type="submit" loading={loading} className="w-full mt-5">
          Add funds
        </Button>
      </form>
    </Modal>
  );
};

export default DepositModal;