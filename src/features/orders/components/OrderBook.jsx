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
      <div className="rounded-card border border-bordersubtle bg-surface p-5 shadow-sm">
        <h2 className="mb-2 text-base font-semibold tracking-tight text-textprimary">Pending orders</h2>
        <p className="py-6 text-center text-sm text-textmuted">
          No pending orders for {selectedSymbol.replace('USDT', '')}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-bordersubtle bg-surface p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-base font-semibold tracking-tight text-textprimary">Pending orders</h2>
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-glass px-1.5 text-[11px] font-medium text-textmuted">
          {pendingOrders.length}
        </span>
      </div>
      <div className="flex flex-col">
        {pendingOrders.map((order) => {
          const isBuy = order.side === 'BUY';

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="group flex items-center justify-between gap-3 border-b border-bordersubtle py-3 transition-colors last:border-0 hover:bg-glass/60 -mx-2 rounded-control px-2"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-control text-[11px] font-bold ${
                    isBuy ? 'bg-success/12 text-success' : 'bg-danger/12 text-danger'
                  }`}
                >
                  {order.side}
                </span>
                <div>
                  <p className="text-sm font-semibold tabular-nums text-textprimary">
                    {Number(order.quantity)}{' '}
                    <span className="text-textmuted">{selectedSymbol.replace('USDT', '')}</span>
                  </p>
                  <p className="mt-0.5 text-xs tabular-nums text-textsecondary">
                    @ ${Number(order.limitPrice).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => cancelOrder(order.id)}
                aria-label="Cancel order"
                className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-textmuted opacity-0 transition-all duration-200 hover:bg-danger/10 hover:text-danger group-hover:opacity-100 active:scale-95"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderBook;