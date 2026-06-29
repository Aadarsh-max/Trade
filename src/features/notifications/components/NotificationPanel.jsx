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

const bgMap = {
  ORDER_FILLED: 'bg-success/12',
  ORDER_REJECTED: 'bg-danger/12',
  DEPOSIT: 'bg-success/12',
  WITHDRAWAL: 'bg-glass',
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
            className="absolute right-0 top-12 z-50 flex max-h-105 w-80 flex-col overflow-hidden rounded-card border border-bordersubtle bg-surface shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-bordersubtle bg-glass px-4 py-3">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-textprimary">Notifications</p>
                {unreadCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-semibold text-white">
                    {unreadCount}
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex cursor-pointer items-center gap-1 rounded-control px-2 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent/10 hover:text-accentstrong active:scale-95"
                >
                  <CheckCheck size={12} />
                  Mark all read
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <EmptyState title="No notifications yet" description="You'll see updates here as they happen" />
              ) : (
                notifications.map((n) => {
                  const Icon = iconMap[n.type] || Wallet;
                  const color = colorMap[n.type] || 'text-textsecondary';
                  const bg = bgMap[n.type] || 'bg-glass';

                  return (
                    <div
                      key={n._id}
                      onClick={() => !n.read && markAsRead(n._id)}
                      className={`group relative flex cursor-pointer items-start gap-3 border-b border-bordersubtle px-4 py-3 transition-colors last:border-0 ${
                        n.read ? 'opacity-55 hover:opacity-80' : 'bg-accent/3 hover:bg-glass'
                      }`}
                    >
                      <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bg}`}>
                        <Icon size={15} className={color} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-textprimary">{n.title}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-textsecondary">{n.message}</p>
                        <p className="mt-1 text-[11px] font-medium text-textmuted">{formatTimeAgo(n.createdAt)}</p>
                      </div>
                      {!n.read && (
                        <span className="relative mt-1.5 flex h-2 w-2 shrink-0">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                        </span>
                      )}
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