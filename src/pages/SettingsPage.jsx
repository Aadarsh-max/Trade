import { motion } from 'framer-motion';
import { User, LogOut, Shield, Bell, Mail } from 'lucide-react';
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
    <div className="max-w-2xl">
      <h1 className="text-xl font-medium text-textprimary mb-6">Settings</h1>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface border border-bordersubtle rounded-card p-5 mb-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center text-white font-medium">
            {initials}
          </div>
          <div>
            <p className="text-textprimary text-base font-medium">{user?.fullName || 'User'}</p>
            <p className="text-textmuted text-sm">{user?.email}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-surface border border-bordersubtle rounded-card divide-y divide-bordersubtle mb-4"
      >
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <User size={16} className="text-textsecondary" />
            <span className="text-textprimary text-sm">Account details</span>
          </div>
          <span className="text-textmuted text-xs">Email verified</span>
        </div>

        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <Shield size={16} className="text-textsecondary" />
            <span className="text-textprimary text-sm">Security</span>
          </div>
          <span className="text-textmuted text-xs">2FA not enabled</span>
        </div>

        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <Bell size={16} className="text-textsecondary" />
            <span className="text-textprimary text-sm">Notifications</span>
          </div>
          <span className="text-textmuted text-xs">Enabled</span>
        </div>

        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-textsecondary" />
            <span className="text-textprimary text-sm">Support</span>
          </div>
          <span className="text-textmuted text-xs">support@tradeflow.app</span>
        </div>
      </motion.div>

      <Button variant="ghost" onClick={logout} className="text-danger border-danger/30 hover:bg-danger/10">
        <LogOut size={16} />
        Log out
      </Button>
    </div>
  );
};

export default SettingsPage;