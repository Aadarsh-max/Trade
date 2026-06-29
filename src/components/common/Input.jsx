import { forwardRef } from 'react';
import {cn} from '../../utils/cn'

const Input = forwardRef(({ className, error, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full h-11 px-4 rounded-control bg-glass border text-textprimary text-sm placeholder:text-textmuted transition-all duration-200 outline-none focus:bg-surface',
        error
          ? 'border-danger focus:border-danger focus:ring-2 focus:ring-danger/20'
          : 'border-bordersubtle hover:border-borderstrong focus:border-accent focus:ring-2 focus:ring-accent/20',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;