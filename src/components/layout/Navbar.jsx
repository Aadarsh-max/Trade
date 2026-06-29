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
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-bordersubtle bg-page/80 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4">
      <div className="flex min-w-0 flex-col">
        <span className="text-[11px] font-medium uppercase tracking-wider text-textmuted">
          Welcome back
        </span>
        <span className="truncate text-sm font-semibold text-textprimary sm:text-base">
          {user?.fullName || 'Trader'}
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative">
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            className={`group relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition-all duration-200 active:scale-95 sm:h-10 sm:w-10 ${
              panelOpen
                ? 'border-borderstrong bg-surface text-textprimary shadow-sm'
                : 'border-bordersubtle bg-glass text-textsecondary hover:border-borderstrong hover:text-textprimary'
            }`}
          >
            <Bell size={17} className="transition-transform duration-200 group-hover:-rotate-12" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex items-center justify-center">
                <span className="absolute inline-flex h-4 w-4 animate-ping rounded-full bg-danger opacity-60" />
                <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-semibold text-white ring-2 ring-page">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              </span>
            )}
          </button>
          <NotificationPanel isOpen={panelOpen} onClose={() => setPanelOpen(false)} />
        </div>

        <div className="group relative flex h-9 w-9 cursor-default items-center justify-center rounded-full bg-gradient-to-br from-success to-successsoft text-xs font-semibold text-white shadow-sm ring-2 ring-surface transition-transform duration-200 hover:scale-105 sm:h-10 sm:w-10">
          {initials}
        </div>

        <button
          onClick={logout}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-bordersubtle bg-glass text-textsecondary transition-all duration-200 hover:border-danger/40 hover:bg-danger/10 hover:text-danger active:scale-95 sm:h-10 sm:w-10"
        >
          <LogOut size={17} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;