import { forwardRef } from "react";
import { cn } from '../../utils/cn'
import { Loader2 } from "lucide-react";

const Button = forwardRef(
  (
    { className, variant = "primary", loading, children, disabled, ...props },
    ref,
  ) => {
    const variants = {
      primary:
        "bg-accent hover:bg-accentstrong text-white shadow-sm shadow-accent/20 hover:shadow-md hover:shadow-accent/25",
      ghost:
        "bg-transparent hover:bg-glass text-textsecondary hover:text-textprimary border border-bordersubtle hover:border-borderstrong",
      danger:
        "bg-danger hover:bg-danger/90 text-white shadow-sm shadow-danger/20 hover:shadow-md hover:shadow-danger/25",
      success:
        "bg-success hover:bg-success/90 text-white shadow-sm shadow-success/20 hover:shadow-md hover:shadow-success/25",
      soft:
        "bg-glass text-textprimary border border-bordersubtle hover:border-borderstrong hover:bg-surface",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "relative h-11 px-4 rounded-control text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-page",
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