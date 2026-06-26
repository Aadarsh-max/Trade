import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LineChart, Briefcase, Wallet, Sparkles, Settings } from 'lucide-react';
import { cn } from '../../lib/cn.js';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/trade', label: 'Trade', icon: LineChart },
  { to: '/portfolio', label: 'Portfolio', icon: Briefcase },
  { to: '/wallet', label: 'Wallet', icon: Wallet },
  { to: '/ai', label: 'AI assistant', icon: Sparkles },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-60 h-screen sticky top-0 p-4 border-r border-borderSubtle">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-accent to-accentStrong flex items-center justify-center">
          <LineChart size={18} className="text-white" />
        </div>
        <span className="text-textPrimary font-medium text-base">Tradeflow</span>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-control text-sm transition-colors',
                isActive
                  ? 'bg-glass text-textPrimary border border-borderSubtle'
                  : 'text-textSecondary hover:text-textPrimary hover:bg-glass'
              )
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;