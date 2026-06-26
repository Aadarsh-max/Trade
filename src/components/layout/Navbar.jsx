import { Bell } from 'lucide-react';
import { useAuthStore } from '../../store/authStore.js';

const Navbar = () => {
  const user = useAuthStore((state) => state.user);

  const initials = user?.fullName
    ? user.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-borderSubtle">
      <div />
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-full bg-glass border border-borderSubtle flex items-center justify-center text-textSecondary hover:text-textPrimary transition-colors">
          <Bell size={16} />
        </button>
        <div className="w-9 h-9 rounded-full bg-success flex items-center justify-center text-white text-xs font-medium">
          {initials}
        </div>
      </div>
    </header>
  );
};

export default Navbar;