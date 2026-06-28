import { motion, AnimatePresence } from 'framer-motion';
import { CheckCheck, TrendingUp, TrendingDown, Wallet, XCircle } from 'lucide-react';
import { useNotificationsStore } from '../notificationsSlice';
import EmptyState from '../../../components/common/EmptyState';

const iconMap = {
  ORDER_FILLED: TrendingUp,
  ORDER_REJECTED: XCircle,
  DEPOSIT: Wallet,
  WITHDRAWAL: Wallet,
};

const colorMap = {
  ORDER_FILLED: 'text-success',
  ORDER_REJECTED: 'text-danger',
  DEPOSIT: 'text-success',
  WITHDRAWAL: 'text-textsecondary',
};

const formatTimeAgo = (dateString) => {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
};

const NotificationPanel = ({ isOpen, onClose }) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationsStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 w-80 bg-page border border-bordersubtle rounded-card shadow-lg z-50 max-h-[420px] flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-bordersubtle">
              <p className="text-textprimary text-sm font-medium">Notifications</p>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-accent text-xs flex items-center gap-1 hover:text-accentstrong"
                >
                  <CheckCheck size={12} />
                  Mark all read
                </button>
              )}
            </div>

            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <EmptyState title="No notifications yet" description="You'll see updates here as they happen" />
              ) : (
                notifications.map((n) => {
                  const Icon = iconMap[n.type] || Wallet;
                  const color = colorMap[n.type] || 'text-textsecondary';

                  return (
                    <div
                      key={n._id}
                      onClick={() => !n.read && markAsRead(n._id)}
                      className={`flex items-start gap-3 px-4 py-3 border-b border-bordersubtle last:border-0 cursor-pointer transition-colors ${
                        n.read ? 'opacity-60' : 'hover:bg-glass'
                      }`}
                    >
                      <Icon size={15} className={`${color} mt-0.5 flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-textprimary text-sm">{n.title}</p>
                        <p className="text-textmuted text-xs mt-0.5">{n.message}</p>
                        <p className="text-textmuted text-xs mt-1">{formatTimeAgo(n.createdAt)}</p>
                      </div>
                      {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />}
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;