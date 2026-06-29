import { motion } from 'framer-motion';
import { User, LogOut, Shield, Bell, Mail, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useAuth } from '../features/auth/hooks/useAuth';
import Button from '../components/common/Button';

const SettingsPage = () => {
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuth();

  const initials = user?.fullName
    ? user.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <div className="max-w-2xl animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-textprimary">Settings</h1>
        <p className="mt-0.5 text-xs text-textsecondary">Manage your account and preferences</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-4 overflow-hidden rounded-card border border-bordersubtle bg-surface p-5 shadow-sm"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-success to-successsoft text-lg font-semibold text-white shadow-sm ring-2 ring-surface">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-textprimary">{user?.fullName || 'User'}</p>
            <p className="truncate text-sm text-textmuted">{user?.email}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-4 divide-y divide-bordersubtle overflow-hidden rounded-card border border-bordersubtle bg-surface shadow-sm"
      >
        <div className="group flex items-center justify-between px-5 py-4 transition-colors hover:bg-glass/60">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-glass">
              <User size={16} className="text-textsecondary" />
            </span>
            <span className="text-sm font-medium text-textprimary">Account details</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-success/12 px-2 py-0.5 text-[11px] font-medium text-success">Email verified</span>
            <ChevronRight size={15} className="text-textmuted transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        </div>

        <div className="group flex items-center justify-between px-5 py-4 transition-colors hover:bg-glass/60">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-glass">
              <Shield size={16} className="text-textsecondary" />
            </span>
            <span className="text-sm font-medium text-textprimary">Security</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-warning/12 px-2 py-0.5 text-[11px] font-medium text-warning">2FA not enabled</span>
            <ChevronRight size={15} className="text-textmuted transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        </div>

        <div className="group flex items-center justify-between px-5 py-4 transition-colors hover:bg-glass/60">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-glass">
              <Bell size={16} className="text-textsecondary" />
            </span>
            <span className="text-sm font-medium text-textprimary">Notifications</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-success/12 px-2 py-0.5 text-[11px] font-medium text-success">Enabled</span>
            <ChevronRight size={15} className="text-textmuted transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        </div>

        <div className="group flex items-center justify-between px-5 py-4 transition-colors hover:bg-glass/60">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-glass">
              <Mail size={16} className="text-textsecondary" />
            </span>
            <span className="text-sm font-medium text-textprimary">Support</span>
          </div>
          <span className="text-xs text-textmuted">support@tradeflow.app</span>
        </div>
      </motion.div>

      <Button variant="ghost" onClick={logout} className="border-danger/30 text-danger hover:bg-danger/10 hover:border-danger/50">
        <LogOut size={16} />
        Log out
      </Button>
    </div>
  );
};

export default SettingsPage;