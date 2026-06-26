import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import ErrorText from '../../../components/common/ErrorText';
import { useOrdersStore } from '../ordersSlice';
import { useMarketStore } from '../../market/marketSlice';
import { useWalletStore } from '../../wallet/walletSlice';
import { cn } from '../../../utils/cn';

const OrderForm = () => {
  const { selectedSymbol, quotes } = useMarketStore();
  const { placeOrder, placingOrder, error } = useOrdersStore();
  const { balance, fetchBalance } = useWalletStore();

  const [side, setSide] = useState('BUY');
  const [type, setType] = useState('MARKET');
  const [quantity, setQuantity] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [localError, setLocalError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const currentPrice = quotes[selectedSymbol]?.price || 0;
  const estimatedTotal = quantity && currentPrice ? (parseFloat(quantity) * (type === 'LIMIT' && limitPrice ? parseFloat(limitPrice) : currentPrice)) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccessMsg('');

    const numQuantity = parseFloat(quantity);

    if (!numQuantity || numQuantity <= 0) {
      setLocalError('Enter a valid quantity');
      return;
    }

    if (type === 'LIMIT' && (!limitPrice || parseFloat(limitPrice) <= 0)) {
      setLocalError('Enter a valid limit price');
      return;
    }

    const orderData = {
      symbol: selectedSymbol,
      side,
      type,
      quantity: numQuantity,
      ...(type === 'LIMIT' && { limitPrice: parseFloat(limitPrice) }),
    };

    const result = await placeOrder(orderData);

    if (result.success) {
      const filled = result.data.trade !== null;
      setSuccessMsg(filled ? 'Order filled successfully' : 'Order placed, awaiting execution');
      setQuantity('');
      setLimitPrice('');
      fetchBalance();

      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface border border-bordersubtle rounded-card p-5"
    >
      <h2 className="text-textprimary text-base font-medium mb-4">Place order</h2>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSide('BUY')}
          className={cn(
            'flex-1 h-10 rounded-control text-sm font-medium transition-colors border',
            side === 'BUY'
              ? 'bg-success text-white border-success'
              : 'bg-glass text-textsecondary border-bordersubtle hover:text-textprimary'
          )}
        >
          Buy
        </button>
        <button
          onClick={() => setSide('SELL')}
          className={cn(
            'flex-1 h-10 rounded-control text-sm font-medium transition-colors border',
            side === 'SELL'
              ? 'bg-danger text-white border-danger'
              : 'bg-glass text-textsecondary border-bordersubtle hover:text-textprimary'
          )}
        >
          Sell
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setType('MARKET')}
          className={cn(
            'flex-1 h-8 rounded-control text-xs transition-colors border',
            type === 'MARKET'
              ? 'bg-accent/15 text-accent border-accent/40'
              : 'bg-transparent text-textsecondary border-bordersubtle hover:text-textprimary'
          )}
        >
          Market
        </button>
        <button
          onClick={() => setType('LIMIT')}
          className={cn(
            'flex-1 h-8 rounded-control text-xs transition-colors border',
            type === 'LIMIT'
              ? 'bg-accent/15 text-accent border-accent/40'
              : 'bg-transparent text-textsecondary border-bordersubtle hover:text-textprimary'
          )}
        >
          Limit
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="text-textsecondary text-xs mb-2 block">
          Quantity ({selectedSymbol.replace('USDT', '')})
        </label>
        <Input
          type="number"
          step="0.0001"
          placeholder="0.00"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        {type === 'LIMIT' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3">
            <label className="text-textsecondary text-xs mb-2 block">Limit price (USD)</label>
            <Input
              type="number"
              step="0.01"
              placeholder={currentPrice.toFixed(2)}
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
            />
          </motion.div>
        )}

        <div className="flex justify-between items-center mt-4 px-1">
          <span className="text-textmuted text-xs">Current price</span>
          <span className="text-textsecondary text-xs">${currentPrice.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center mt-1.5 px-1">
          <span className="text-textmuted text-xs">Estimated total</span>
          <span className="text-textprimary text-sm font-medium">
            ${estimatedTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex justify-between items-center mt-1.5 px-1 mb-4">
          <span className="text-textmuted text-xs">Available balance</span>
          <span className="text-textsecondary text-xs">₹{balance.toLocaleString()}</span>
        </div>

        <ErrorText>{localError || error}</ErrorText>

        {successMsg && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-successsoft text-xs mb-3"
          >
            {successMsg}
          </motion.p>
        )}

        <Button
          type="submit"
          loading={placingOrder}
          className={cn('w-full', side === 'SELL' && 'bg-danger hover:bg-dangersoft')}
        >
          {side === 'BUY' ? 'Buy' : 'Sell'} {selectedSymbol.replace('USDT', '')}
        </Button>
      </form>
    </motion.div>
  );
};

export default OrderForm;