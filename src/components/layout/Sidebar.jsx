import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, LineChart, Briefcase, Wallet, Sparkles, Settings, Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/trade', label: 'Trade', icon: LineChart },
  { to: '/portfolio', label: 'Portfolio', icon: Briefcase },
  { to: '/wallet', label: 'Wallet', icon: Wallet },
  { to: '/ai', label: 'AI assistant', icon: Sparkles },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const NavLinks = ({ onItemClick }) => (
  <nav className="flex flex-col gap-1">
    {navItems.map(({ to, label, icon: Icon }) => (
      <NavLink
        key={to}
        to={to}
        onClick={onItemClick}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-control text-sm transition-colors',
            isActive
              ? 'bg-glass text-textprimary border border-bordersubtle'
              : 'text-textsecondary hover:text-textprimary hover:bg-glass'
          )
        }
      >
        <Icon size={18} />
        {label}
      </NavLink>
    ))}
  </nav>
);

const Logo = () => (
  <div className="flex items-center gap-2 mb-8 px-2">
    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-accent to-accentstrong flex items-center justify-center">
      <LineChart size={18} className="text-white" />
    </div>
    <span className="text-textprimary font-medium text-base">Tradeflow</span>
  </div>
);

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside className="hidden md:flex flex-col w-60 h-screen sticky top-0 p-4 border-r border-bordersubtle">
        <Logo />
        <NavLinks />
      </aside>

      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 w-9 h-9 rounded-full bg-glass border border-bordersubtle flex items-center justify-center text-textprimary"
      >
        <Menu size={18} />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 z-40"
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="md:hidden fixed top-0 left-0 h-screen w-60 bg-page border-r border-bordersubtle p-4 z-50"
            >
              <div className="flex items-center justify-between mb-4">
                <Logo />
                <button onClick={() => setMobileOpen(false)} className="text-textsecondary">
                  <X size={18} />
                </button>
              </div>
              <NavLinks onItemClick={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;