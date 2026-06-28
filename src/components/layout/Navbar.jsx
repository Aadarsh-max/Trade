import { useState, useEffect } from 'react';
import { Bell, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useNotificationsStore } from '../../features/notifications/notificationsSlice';
import NotificationPanel from '../../features/notifications/components/NotificationPanel';

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuth();
  const { unreadCount, fetchNotifications } = useNotificationsStore();
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const initials = user?.fullName
    ? user.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-bordersubtle relative">
      <div />
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            className="w-9 h-9 rounded-full bg-glass border border-bordersubtle flex items-center justify-center text-textsecondary hover:text-textprimary transition-colors relative"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger text-white text-[10px] flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          <NotificationPanel isOpen={panelOpen} onClose={() => setPanelOpen(false)} />
        </div>

        <div className="w-9 h-9 rounded-full bg-success flex items-center justify-center text-white text-xs font-medium">
          {initials}
        </div>

        <button
          onClick={logout}
          className="w-9 h-9 rounded-full bg-glass border border-bordersubtle flex items-center justify-center text-textsecondary hover:text-danger transition-colors"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;