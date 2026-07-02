import { motion } from 'framer-motion';

const Loader = ({ fullPage = false, size = 'md', text = '' }) => {
  const sizes = {
    sm: { outer: 36, ring: 28, dot: 3 },
    md: { outer: 56, ring: 44, dot: 4 },
    lg: { outer: 76, ring: 60, dot: 5 },
  };

  const s = sizes[size] || sizes.md;

  const ring = (
    <div className="relative flex items-center justify-center" style={{ width: s.outer, height: s.outer }}>
      <motion.div
        className="absolute rounded-full bg-accent/10"
        style={{ width: s.outer, height: s.outer }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute rounded-full border-2 border-bordersubtle"
        style={{ width: s.ring, height: s.ring }}
      />

      <motion.div
        className="absolute rounded-full border-2 border-transparent"
        style={{ width: s.ring, height: s.ring, borderTopColor: 'var(--color-accent)', borderRightColor: 'var(--color-accent)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute rounded-full border-2 border-transparent"
        style={{ width: s.ring * 0.62, height: s.ring * 0.62, borderBottomColor: 'var(--color-accentstrong)' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 1.3, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="rounded-full bg-accent"
        style={{ width: s.dot, height: s.dot }}
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );

  if (fullPage) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-page/80 backdrop-blur-md"
      >
        {ring}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col items-center gap-1"
        >
          <p className="text-sm font-semibold tracking-tight text-textprimary">{text || 'Loading'}</p>
          <span className="flex items-center gap-1">
            <span className="h-1 w-1 animate-bounce rounded-full bg-textmuted [animation-delay:-0.3s]" />
            <span className="h-1 w-1 animate-bounce rounded-full bg-textmuted [animation-delay:-0.15s]" />
            <span className="h-1 w-1 animate-bounce rounded-full bg-textmuted" />
          </span>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      {ring}
      {text && <p className="text-sm font-medium text-textsecondary">{text}</p>}
    </div>
  );
};

export default Loader;