import { forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

const Input = forwardRef(({ className, error, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full h-11 px-4 rounded-control bg-glass border text-textPrimary text-sm placeholder:text-textMuted transition-colors outline-none',
        error ? 'border-danger' : 'border-borderSubtle focus:border-borderStrong',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;