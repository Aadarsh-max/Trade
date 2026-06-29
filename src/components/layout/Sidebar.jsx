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
  <nav className="flex flex-col gap-1.5">
    {navItems.map(({ to, label, icon: Icon }) => (
      <NavLink
        key={to}
        to={to}
        onClick={onItemClick}
        className={({ isActive }) =>
          cn(
            'group relative flex items-center gap-3 rounded-control px-3 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer',
            isActive
              ? 'bg-surface text-textprimary shadow-sm ring-1 ring-bordersubtle'
              : 'text-textsecondary hover:bg-glass hover:text-textprimary'
          )
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={cn(
                'absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-accent transition-all duration-200',
                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
              )}
            />
            <Icon
              size={18}
              className={cn(
                'shrink-0 transition-colors duration-200',
                isActive ? 'text-accent' : 'text-textmuted group-hover:text-textprimary'
              )}
            />
            <span className="truncate">{label}</span>
          </>
        )}
      </NavLink>
    ))}
  </nav>
);

const Logo = () => (
  <div className="mb-8 flex items-center gap-2.5 px-2">
    <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-accent to-accentstrong shadow-md shadow-accent/20">
      <LineChart size={18} className="text-white" />
      <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-base font-semibold tracking-tight text-textprimary">Tradeflow</span>
      <span className="text-[10px] font-medium uppercase tracking-wider text-textmuted">Markets</span>
    </div>
  </div>
);

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-60 flex-col border-r border-bordersubtle bg-page/50 p-4 backdrop-blur-sm md:flex">
        <Logo />
        <NavLinks />
        <div className="mt-auto rounded-card border border-bordersubtle bg-glass p-3">
          <p className="text-xs font-medium text-textprimary">Markets open</p>
          <p className="mt-0.5 text-[11px] text-textsecondary">Live data streaming</p>
          <span className="mt-2 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="text-[11px] font-medium text-success">Connected</span>
          </span>
        </div>
      </aside>

      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-bordersubtle bg-surface text-textprimary shadow-sm transition-all duration-200 hover:border-borderstrong active:scale-95 md:hidden"
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
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="fixed left-0 top-0 z-50 h-screen w-60 border-r border-bordersubtle bg-page p-4 shadow-2xl md:hidden"
            >
              <div className="mb-4 flex items-start justify-between">
                <Logo />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-textsecondary transition-colors hover:bg-glass hover:text-textprimary"
                >
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