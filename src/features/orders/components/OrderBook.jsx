import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useOrdersStore } from '../ordersSlice';
import { useMarketStore } from '../../market/marketSlice';

const OrderBook = () => {
  const { orders, cancelOrder } = useOrdersStore();
  const { selectedSymbol } = useMarketStore();

  const pendingOrders = orders.filter((o) => o.symbol === selectedSymbol && o.status === 'PENDING');

  if (pendingOrders.length === 0) {
    return (
      <div className="bg-surface border border-bordersubtle rounded-card p-5">
        <h2 className="text-textprimary text-base font-medium mb-2">Pending orders</h2>
        <p className="text-textmuted text-sm py-4 text-center">No pending orders for {selectedSymbol.replace('USDT', '')}</p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-bordersubtle rounded-card p-5">
      <h2 className="text-textprimary text-base font-medium mb-3">Pending orders</h2>
      <div className="flex flex-col gap-1">
        {pendingOrders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between py-2.5 border-b border-bordersubtle last:border-0"
          >
            <div>
              <p className={`text-sm font-medium ${order.side === 'BUY' ? 'text-success' : 'text-danger'}`}>
                {order.side} {Number(order.quantity)}
              </p>
              <p className="text-textmuted text-xs">@ ${Number(order.limitPrice).toLocaleString()}</p>
            </div>
            <button
              onClick={() => cancelOrder(order.id)}
              className="text-textmuted hover:text-danger transition-colors p-1"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook;