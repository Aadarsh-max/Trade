import { cn } from '../../utils/cn';

const Skeleton = ({ className }) => {
  return <div className={cn('bg-glass rounded-control animate-pulse', className)} />;
};

export default Skeleton;