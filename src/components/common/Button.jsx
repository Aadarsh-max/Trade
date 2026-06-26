import { forwardRef } from "react";
import { cn } from '../../utils/cn'
import { Loader2 } from "lucide-react";

const Button = forwardRef(
  (
    { className, variant = "primary", loading, children, disabled, ...props },
    ref,
  ) => {
    const variants = {
      primary: "bg-accent hover:bg-accentStrong text-white",
      ghost:
        "bg-transparent hover:bg-glass text-textSecondary hover:text-textPrimary border border-borderSubtle",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "h-11 px-4 rounded-control text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",
          variants[variant],
          className,
        )}
        {...props}
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
