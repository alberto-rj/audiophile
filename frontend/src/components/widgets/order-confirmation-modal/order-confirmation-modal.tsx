import { useId, type ComponentProps } from 'react';
import { Link } from 'react-router-dom';

import { OrderConfirmation } from '@/assets/icons';
import { Button, Modal } from '@/components/ui';
import { cn } from '@/libs/cn';
import { toMoney } from '@/libs/helpers';
import type { Order, OrderItem } from '@/libs/types';

interface CartItemListingProps {
  items: OrderItem[];
}

const CartItemListing = ({ items }: CartItemListingProps) => {
  return (
    <ul
      role='list'
      className={cn(
        'inline-full',
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
            <img
              alt={name}
              src={image}
              width={50}
              height={50}
              loading='lazy'
              className={cn(
                'aspect-50/50',

                'object-cover',
                'rounded-lg',
              )}
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
            className={cn('font-bold')}
          >
            x{quantity}
          </span>
        </li>
      ))}
    </ul>
  );
};

interface CartItemCardProps {
  order: Order;
}

const CartItemCard = ({ order }: CartItemCardProps) => {
  const { grandTotal, items } = order;

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
        <CartItemListing items={items!} />
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
        <dl className={cn('flex', 'flex-col', 'gap-2')}>
          <dt className={cn('text-white/75', 'uppercase')}>Grand Total</dt>
          <dd
            className={cn(
              'text-md',
              'truncate',
              'max-inline-40',

              'md:max-inline-30',

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

interface OrderConfirmationModalProps extends ComponentProps<typeof Modal> {
  order: Order;
}

const OrderConfirmationModal = ({
  order,
  ...props
}: OrderConfirmationModalProps) => {
  const headingId = useId();

  return (
    <Modal {...props}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content
          aria-describedby={headingId}
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
            aria-hidden={true}
            focusable={false}
            className={cn('text-primary-700')}
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
            <Modal.Title
              id={headingId}
              className={cn(
                'text-lg',

                'md:text-2xl',

                'text-black',
                'uppercase',
              )}
              asChild
            >
              <h3>Thank you for your order</h3>
            </Modal.Title>
            <Modal.Description asChild>
              <p>You will receive an email confirmation shortly.</p>
            </Modal.Description>
          </div>

          <CartItemCard order={order} />

          <Modal.Close asChild>
            <Button
              className={cn(
                'inline-full',
                'mbs-6',

                'md:mbs-12',
              )}
              asChild
            >
              <Link to='/'>Back to home</Link>
            </Button>
          </Modal.Close>
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
};

export default OrderConfirmationModal;
