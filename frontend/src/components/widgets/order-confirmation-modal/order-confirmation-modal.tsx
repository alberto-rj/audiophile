import { useId, type ComponentProps } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectGrandTotal, selectItems } from '@/app/features/cart';
import { OrderConfirmation } from '@/assets/icons';
import { Button, Modal } from '@/components/ui';
import { ResponsiveImage } from '@/components/widgets';
import { cn } from '@/libs/cn';
import { toMoney } from '@/libs/helpers';

const CartItemListing = () => {
  const items = useSelector(selectItems);

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

const CartItemCard = () => {
  const grandTotal = useSelector(selectGrandTotal);

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
        <CartItemListing />
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
          <dt className={cn('uppercase', 'text-base', 'text-white/50')}>
            Grand Total
          </dt>
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

type OrderConfirmationModalProps = ComponentProps<typeof Modal>;

const OrderConfirmationModal = ({ ...props }: OrderConfirmationModalProps) => {
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
            <Modal.Title
              id={headingId}
              className={cn(
                'uppercase',
                'text-lg',

                'md:text-2xl',

                'text-black',
              )}
              asChild
            >
              <h3>Thank you for your order</h3>
            </Modal.Title>
            <Modal.Description asChild>
              <p>You will receive an email confirmation shortly.</p>
            </Modal.Description>
          </div>

          <CartItemCard />

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
