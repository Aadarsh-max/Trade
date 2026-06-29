import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

const Toast = ({ toasts }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex max-w-sm flex-col gap-2.5">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative flex items-start gap-3 overflow-hidden rounded-card border border-bordersubtle bg-surface/90 py-3 pl-4 pr-5 shadow-lg backdrop-blur-md"
          >
            <span
              className={`absolute inset-y-0 left-0 w-1 ${
                toast.type === 'success' ? 'bg-success' : 'bg-danger'
              }`}
            />
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                toast.type === 'success'
                  ? 'bg-success/12 text-success'
                  : 'bg-danger/12 text-danger'
              }`}
            >
              {toast.type === 'success' ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-textprimary">{toast.title}</p>
              {toast.message && (
                <p className="mt-0.5 text-xs leading-relaxed text-textsecondary">{toast.message}</p>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;