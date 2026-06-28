import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

const Toast = ({ toasts }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40 }}
            className={`flex items-start gap-2.5 px-4 py-3 rounded-control border backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-success/15 border-success/30'
                : 'bg-danger/15 border-danger/30'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 size={16} className="text-successsoft mt-0.5 shrink-0" />
            ) : (
              <XCircle size={16} className="text-dangersoft mt-0.5 shrink-0" />
            )}
            <div>
              <p className={`text-sm font-medium ${toast.type === 'success' ? 'text-successsoft' : 'text-dangersoft'}`}>
                {toast.title}
              </p>
              {toast.message && <p className="text-textsecondary text-xs mt-0.5">{toast.message}</p>}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;