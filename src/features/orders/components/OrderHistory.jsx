import { motion } from 'framer-motion';
import { useOrdersStore } from '../ordersSlice';
import { formatDate } from '../../../utils/formatters';

const statusColors = {
  FILLED: 'text-success',
  PENDING: 'text-warning',
  CANCELLED: 'text-textmuted',
  REJECTED: 'text-danger',
};

const statusBg = {
  FILLED: 'bg-success/12 text-success',
  PENDING: 'bg-warning/12 text-warning',
  CANCELLED: 'bg-glass text-textmuted',
  REJECTED: 'bg-danger/12 text-danger',
};

const OrderHistory = () => {
  const { orders } = useOrdersStore();

  if (orders.length === 0) {
    return <p className="py-10 text-center text-sm text-textmuted">No orders yet</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0 text-sm">
        <thead>
          <tr className="text-xs text-textmuted">
            <th className="border-b border-bordersubtle px-3 py-2.5 text-left font-medium">Symbol</th>
            <th className="border-b border-bordersubtle px-3 py-2.5 text-left font-medium">Side</th>
            <th className="border-b border-bordersubtle px-3 py-2.5 text-left font-medium">Type</th>
            <th className="border-b border-bordersubtle px-3 py-2.5 text-right font-medium">Qty</th>
            <th className="border-b border-bordersubtle px-3 py-2.5 text-right font-medium">Price</th>
            <th className="border-b border-bordersubtle px-3 py-2.5 text-right font-medium">Status</th>
            <th className="border-b border-bordersubtle px-3 py-2.5 text-right font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <motion.tr
              key={order.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.02 }}
              className="group transition-colors hover:bg-glass/60"
            >
              <td className="border-b border-bordersubtle px-3 py-3 font-semibold text-textprimary">{order.symbol.replace('USDT', '')}</td>
              <td className="border-b border-bordersubtle px-3 py-3">
                <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-bold ${order.side === 'BUY' ? 'bg-success/12 text-success' : 'bg-danger/12 text-danger'}`}>
                  {order.side}
                </span>
              </td>
              <td className="border-b border-bordersubtle px-3 py-3 text-textsecondary">{order.type}</td>
              <td className="border-b border-bordersubtle px-3 py-3 text-right tabular-nums text-textsecondary">{Number(order.quantity)}</td>
              <td className="border-b border-bordersubtle px-3 py-3 text-right tabular-nums text-textsecondary">
                {order.filledPrice ? `$${Number(order.filledPrice).toLocaleString()}` : '—'}
              </td>
              <td className="border-b border-bordersubtle px-3 py-3 text-right">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusBg[order.status] || 'bg-glass text-textmuted'}`}>
                  {order.status}
                </span>
              </td>
              <td className="border-b border-bordersubtle px-3 py-3 text-right text-xs tabular-nums text-textmuted">{formatDate(order.createdAt)}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;