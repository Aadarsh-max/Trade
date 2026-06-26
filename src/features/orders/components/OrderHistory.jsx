import { motion } from 'framer-motion';
import { useOrdersStore } from '../ordersSlice';
import { formatDate } from '../../../utils/formatters';

const statusColors = {
  FILLED: 'text-success',
  PENDING: 'text-warning',
  CANCELLED: 'text-textmuted',
  REJECTED: 'text-danger',
};

const OrderHistory = () => {
  const { orders } = useOrdersStore();

  if (orders.length === 0) {
    return <p className="text-textmuted text-sm text-center py-8">No orders yet</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-textmuted text-xs border-b border-bordersubtle">
            <th className="text-left py-2 px-2 font-normal">Symbol</th>
            <th className="text-left py-2 px-2 font-normal">Side</th>
            <th className="text-left py-2 px-2 font-normal">Type</th>
            <th className="text-right py-2 px-2 font-normal">Qty</th>
            <th className="text-right py-2 px-2 font-normal">Price</th>
            <th className="text-right py-2 px-2 font-normal">Status</th>
            <th className="text-right py-2 px-2 font-normal">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <motion.tr
              key={order.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.02 }}
              className="border-b border-bordersubtle last:border-0"
            >
              <td className="py-2.5 px-2 text-textprimary">{order.symbol.replace('USDT', '')}</td>
              <td className={`py-2.5 px-2 font-medium ${order.side === 'BUY' ? 'text-success' : 'text-danger'}`}>
                {order.side}
              </td>
              <td className="py-2.5 px-2 text-textsecondary">{order.type}</td>
              <td className="py-2.5 px-2 text-right text-textsecondary">{Number(order.quantity)}</td>
              <td className="py-2.5 px-2 text-right text-textsecondary">
                {order.filledPrice ? `$${Number(order.filledPrice).toLocaleString()}` : '—'}
              </td>
              <td className={`py-2.5 px-2 text-right text-xs ${statusColors[order.status]}`}>{order.status}</td>
              <td className="py-2.5 px-2 text-right text-textmuted text-xs">{formatDate(order.createdAt)}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;