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
      className="rounded-card border border-bordersubtle bg-surface p-5 shadow-sm"
    >
      <h2 className="mb-4 text-base font-semibold tracking-tight text-textprimary">Place order</h2>

      <div className="mb-4 grid grid-cols-2 gap-1 rounded-control bg-glass p-1">
        <button
          onClick={() => setSide('BUY')}
          className={cn(
            'h-9 cursor-pointer rounded-md text-sm font-semibold transition-all duration-200 active:scale-[0.98]',
            side === 'BUY'
              ? 'bg-success text-white shadow-sm shadow-success/25'
              : 'text-textsecondary hover:text-textprimary'
          )}
        >
          Buy
        </button>
        <button
          onClick={() => setSide('SELL')}
          className={cn(
            'h-9 cursor-pointer rounded-md text-sm font-semibold transition-all duration-200 active:scale-[0.98]',
            side === 'SELL'
              ? 'bg-danger text-white shadow-sm shadow-danger/25'
              : 'text-textsecondary hover:text-textprimary'
          )}
        >
          Sell
        </button>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-2">
        <button
          onClick={() => setType('MARKET')}
          className={cn(
            'h-8 cursor-pointer rounded-control border text-xs font-medium transition-all duration-200 active:scale-[0.98]',
            type === 'MARKET'
              ? 'border-accent/40 bg-accent/12 text-accent'
              : 'border-bordersubtle bg-transparent text-textsecondary hover:border-borderstrong hover:text-textprimary'
          )}
        >
          Market
        </button>
        <button
          onClick={() => setType('LIMIT')}
          className={cn(
            'h-8 cursor-pointer rounded-control border text-xs font-medium transition-all duration-200 active:scale-[0.98]',
            type === 'LIMIT'
              ? 'border-accent/40 bg-accent/12 text-accent'
              : 'border-bordersubtle bg-transparent text-textsecondary hover:border-borderstrong hover:text-textprimary'
          )}
        >
          Limit
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="mb-2 block text-xs font-medium text-textsecondary">
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
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 overflow-hidden">
            <label className="mb-2 block text-xs font-medium text-textsecondary">Limit price (USD)</label>
            <Input
              type="number"
              step="0.01"
              placeholder={currentPrice.toFixed(2)}
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
            />
          </motion.div>
        )}

        <div className="mt-4 flex flex-col gap-2 rounded-control border border-bordersubtle bg-glass p-3">
          <div className="flex justify-between items-center mt-4 px-1">
          <span className="text-textmuted text-xs">Current price</span>
          <span className="text-textsecondary text-xs">${currentPrice.toLocaleString()} USD</span>
        </div>

        <div className="flex justify-between items-center mt-1.5 px-1">
          <span className="text-textmuted text-xs">Estimated total (INR)</span>
          <span className="text-textprimary text-sm font-medium">
            ₹{(estimatedTotal * 83.5).toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
        </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-textmuted">Available balance</span>
            <span className="text-xs font-medium tabular-nums text-textsecondary">₹{balance.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-4">
          <ErrorText>{localError || error}</ErrorText>
        </div>

        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 flex items-center gap-2 rounded-control border border-success/25 bg-success/10 px-3 py-2"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
            <p className="text-xs font-medium text-success">{successMsg}</p>
          </motion.div>
        )}

        <Button
          type="submit"
          loading={placingOrder}
          className={cn(
            'mt-1 w-full',
            side === 'BUY'
              ? 'bg-success shadow-success/20 hover:bg-success/90 hover:shadow-success/25'
              : 'bg-danger shadow-danger/20 hover:bg-danger/90 hover:shadow-danger/25'
          )}
        >
          {placingOrder
            ? 'Placing order…'
            : `${side === 'BUY' ? 'Buy' : 'Sell'} ${selectedSymbol.replace('USDT', '')}`}
        </Button>
      </form>
    </motion.div>
  );
};

export default OrderForm;