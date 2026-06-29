import { cn } from '../../utils/cn';

const Skeleton = ({ className }) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-control bg-glass',
        className
      )}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};

export default Skeleton;