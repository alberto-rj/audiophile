import { cn } from '@/libs/cn';

interface CartBadgeProps {
  itemsCount: number;
}

const CartBadge = ({ itemsCount }: CartBadgeProps) => {
  return (
    <div
      aria-hidden={true}
      className={cn(
        'block-7',
        'inline-7',
        'absolute',
        '-inset-bs-5',
        '-inset-e-3',
        'flex',
        'items-center',
        'justify-center',
        'text-xs',
        'text-center',
        'truncate',
        'leading-none',

        'bg-primary-700',
        'text-white',
        'rounded-full',
      )}
    >
      {itemsCount}
    </div>
  );
};

export default CartBadge;
