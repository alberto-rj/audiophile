import { useId, type ComponentProps } from 'react';
import { Link } from 'react-router-dom';

import { OrderConfirmation } from '@/assets/icons';
import { Button, Modal } from '@/components/ui';
import { ResponsiveImage } from '@/components/widgets';
import { cn } from '@/libs/cn';
import { toMoney } from '@/libs/helpers';
import type { CartItem } from '@/libs/types';

interface CartItemListingProps extends ComponentProps<'ul'> {
  items: CartItem[];
}

const CartItemListing = ({ items, ...props }: CartItemListingProps) => {
  return (
    <ul
      {...props}
      role='list'
      className={cn(
        'max-block-36',
        'overflow-auto',
        'pe-4',
        'flex',
        'flex-col',
        'gap-4',
      )}
    >
      {items.map(({ id, image, name, price, quantity }) => (
        <li
          key={id}
          className={cn('flex', 'justify-between', 'items-start', 'gap-4')}
        >
          <div className={cn('flex', 'items-center', 'gap-4')}>
            <ResponsiveImage
              className={cn('aspect-50/50', 'object-cover', 'rounded-lg')}
              alt={name}
              image={image}
              width={50}
              height={50}
            />

            <div
              className={cn(
                'flex',
                'flex-col',
                'max-inline-16',

                'xs:max-inline-28',
              )}
            >
              <span
                className={cn(
                  'uppercase',
                  'text-base',
                  'truncate',

                  'text-black',
                  'font-bold',
                )}
              >
                {name}
              </span>
              <span
                className={cn(
                  'text-xs',
                  'truncate',

                  'text-black/50',
                  'font-bold',
                )}
              >
                {toMoney(price)}
              </span>
            </div>
          </div>
          <dl className={cn('sr-only')}>
            <dt>Times</dt>
            <dd>{quantity}</dd>
          </dl>
          <span
            aria-hidden={true}
            className={cn(
              'text-base',

              'text-black/50',
              'font-bold',
            )}
          >
            x{quantity}
          </span>
        </li>
      ))}
    </ul>
  );
};

interface CartItemCardProps {
  items: CartItem[];
}

const CartItemCard = ({ items }: CartItemCardProps) => {
  const grandTotal = 5446;

  return (
    <div className={cn('flex', 'flex-col', 'md:flex-row')}>
      <div
        className={cn(
          'inline-full',
          'p-6',
          'rounded-t-lg',

          'md:rounded-none',
          'md:rounded-tl-lg',
          'md:rounded-bl-lg',

          'bg-gray-400',
        )}
      >
        <CartItemListing items={items} />
      </div>
      <div
        className={cn(
          'p-6',
          'flex',
          'flex-col',
          'justify-end',
          'rounded-b-lg',

          'md:rounded-none',
          'md:rounded-tr-lg',
          'md:rounded-br-lg',

          'bg-black',
        )}
      >
        <dl className={cn('max-inline-60', 'flex', 'flex-col', 'gap-2')}>
          <dt className={cn('uppercase', 'text-base', 'text-white/50')}>
            Grand Total
          </dt>
          <dd
            className={cn(
              'text-md',
              'truncate',

              'text-white',
            )}
          >
            {toMoney(grandTotal)}
          </dd>
        </dl>
      </div>
    </div>
  );
};

interface OrderConfirmationModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  items: CartItem[];
}

const OrderConfirmationModal = ({
  open,
  defaultOpen,
  items,
  onOpenChange,
}: OrderConfirmationModalProps) => {
  const headingId = useId();

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
            'max-inline-145',
            'inset-bs-1/2',
            'inset-s-1/2',
            '-translate-1/2',
            'p-8',

            'md:p-12',
          )}
        >
          <OrderConfirmation
            focusable={false}
            aria-hidden={true}
          />

          <div
            className={cn(
              'max-inline-65.75',
              'flex',
              'flex-col',
              'gap-4',
              'my-8',

              'md:max-inline-80',
              'md:gap-6',
            )}
          >
            <Modal.Title asChild>
              <h3
                id={headingId}
                className={cn(
                  'uppercase',
                  'text-lg',

                  'md:text-2xl',

                  'text-black',
                )}
              >
                Thank you for your order
              </h3>
            </Modal.Title>
            <Modal.Description asChild>
              <p
                className={cn(
                  'text-base',

                  'text-black/50',
                )}
              >
                You will receive an email confirmation shortly.
              </p>
            </Modal.Description>
          </div>

          <CartItemCard items={items} />

          <Button asChild>
            <Link
              to='/'
              onClick={() => onOpenChange?.(false)}
              className={cn(
                'w-full',
                'mbs-6',

                'md:mbs-12',
              )}
            >
              Back to home
            </Link>
          </Button>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
};

export default OrderConfirmationModal;
