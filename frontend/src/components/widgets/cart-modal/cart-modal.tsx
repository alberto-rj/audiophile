import { useId } from 'react';
import { Link } from 'react-router-dom';

import { Button, Modal } from '@/components/ui';
import { QuantitySelector, ResponsiveImage } from '@/components/widgets';
import { cn } from '@/libs/cn';
import { toMoney } from '@/libs/helpers';
import type { CartItem } from '@/libs/types';

interface CartModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClearCart: () => void;
  onQuantityChange: (item: { id: number; value: number }) => void;
  items: CartItem[];
}

const CartModal = ({
  open = false,
  defaultOpen = false,
  onOpenChange,
  onClearCart,
  onQuantityChange,
  items,
}: CartModalProps) => {
  const headingId = useId();
  const totalItems = items.length;
  const total = 5396;

  const handleClearCart = () => {
    onClearCart();
  };

  const handleQuantityChange = (id: number, newValue: number) => {
    onQuantityChange({ id, value: newValue });
  };

  return (
    <Modal
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content
          aria-labelledby={headingId}
          className={cn(
            'inline-[96vw]',
            'max-inline-[600px]',
            'top-1/2',
            'left-1/2',
            '-translate-1/2',
            'px-5',
            'py-5',

            'xs:px-7',
            'xs:py-8',
          )}
        >
          <div className={cn('flex', 'justify-between', 'items-center')}>
            <Modal.Title asChild>
              <h3
                id={headingId}
                className={cn('uppercase', 'text-md')}
              >
                Cart ({totalItems})
              </h3>
            </Modal.Title>

            <Button
              variant='link'
              onClick={handleClearCart}
            >
              Remove all
            </Button>
          </div>

          <ul
            role='list'
            className={cn(
              'inline-full',
              'max-block-90',
              'overflow-y-auto',
              'my-8',
              'flex',
              'flex-col',
              'gap-6',
            )}
          >
            {items.map(({ id, image, name, price, quantity }) => (
              <li
                key={id}
                className={cn(
                  'flex',
                  'justify-between',
                  'items-center',
                  'gap-6',
                )}
              >
                <div className={cn('flex', 'items-center', 'gap-4')}>
                  <ResponsiveImage
                    image={image}
                    alt=''
                    width={64}
                    height={64}
                    className={cn('aspect-64/64', 'rounded-lg')}
                  />

                  <div className={cn('flex', 'flex-col')}>
                    <span
                      className={cn(
                        'uppercase',
                        'text-base',

                        'text-black',
                      )}
                    >
                      {name}
                    </span>
                    <span
                      className={cn(
                        'text-xs',

                        'text-black/50',
                      )}
                    >
                      {toMoney(price)}
                    </span>
                  </div>
                </div>

                <QuantitySelector
                  value={quantity}
                  onChange={(value) => handleQuantityChange(id, value)}
                  className={cn('max-inline-30', 'max-block-[96px]')}
                />
              </li>
            ))}
          </ul>

          <p
            className={cn(
              'inline-full',
              'flex',
              'justify-between',
              'items-center',
              'mbe-6',
            )}
          >
            <strong className={cn('uppercase', 'text-base', 'text-black/50')}>
              Total
            </strong>
            <span className={cn('text-md', 'text-black')}>
              {toMoney(total)}
            </span>
          </p>

          <Button
            variant='primary'
            className={cn('inline-full')}
            asChild
          >
            <Link to='/checkout'>Checkout</Link>
          </Button>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
};

export default CartModal;
