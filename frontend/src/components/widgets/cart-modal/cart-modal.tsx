import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import type { AppDispatch, RootState } from '@/app/store';
import {
  clearCart,
  selectGrandTotal,
  selectItems,
  selectItemsCount,
  updateQuantity,
} from '@/app/features/cart';
import { Button, Modal } from '@/components/ui';
import { QuantitySelector, ResponsiveImage } from '@/components/widgets';
import { cn } from '@/libs/cn';
import { toMoney } from '@/libs/helpers';
import type { CartItem } from '@/libs/types';
import { Cart } from '@/assets/icons';

interface CartModalProps {
  onOpenChange?: (open: boolean) => void;
}

const CartModal = ({ onOpenChange }: CartModalProps) => {
  const items = useSelector<RootState, CartItem[]>(selectItems);
  const itemsCount = useSelector<RootState, number>(selectItemsCount);
  const grandTotal = useSelector<RootState, number>(selectGrandTotal);

  const dispatch = useDispatch<AppDispatch>();

  const headingId = useId();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleQuantityChange = ({
    id,
    quantity,
  }: {
    id: number;
    quantity: number;
  }) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <Modal onOpenChange={onOpenChange}>
      <Modal.Trigger asChild>
        <button
          type='button'
          className={cn('relative', 'link-focusable')}
        >
          <span className={cn('sr-only')}>
            View cart - {itemsCount} item(s)
          </span>
          {itemsCount > 0 && (
            <span
              aria-hidden={true}
              className={cn(
                'size-7',
                'absolute',
                '-inset-bs-5',
                '-inset-e-3',
                'flex',
                'items-center',
                'justify-center',
                'text-xs',
                'text-center',
                'leading-none',
                'truncate',

                'text-white',
                'bg-primary-400',
                'rounded-full',
              )}
            >
              {itemsCount}
            </span>
          )}
          <Cart
            aria-hidden={true}
            focusable={false}
          />
        </button>
      </Modal.Trigger>

      <Modal.Portal>
        <Modal.Overlay />

        <Modal.Content
          aria-labelledby={headingId}
          className={cn(
            'inline-[96vw]',
            'max-inline-120',
            'inset-bs-1/2',
            'inset-s-1/2',
            '-translate-1/2',
            'px-5',
            'py-5',

            'xs:px-7',
            'xs:py-8',
          )}
        >
          {itemsCount === 0 ? (
            <>
              <Modal.Title asChild>
                <h3
                  id={headingId}
                  className={cn('uppercase', 'text-md')}
                >
                  Cart
                </h3>
              </Modal.Title>
              <Modal.Description asChild>
                <p
                  className={cn(
                    'text-base',
                    'text-center',
                    'my-8',
                    'text-black/50',
                  )}
                >
                  Your cart is empty.
                </p>
              </Modal.Description>
            </>
          ) : (
            <>
              <div
                className={cn(
                  'flex',
                  'justify-between',
                  'items-center',
                  'gap-8',
                )}
              >
                <Modal.Title asChild>
                  <h3
                    id={headingId}
                    className={cn(
                      'max-inline-50',
                      'truncate',
                      'uppercase',
                      'text-md',
                    )}
                  >
                    <span className={cn('sr-only')}>
                      Cart - {itemsCount} item(s)
                    </span>
                    <span aria-hidden={true}>Cart ({itemsCount})</span>
                  </h3>
                </Modal.Title>

                <Button
                  variant='link'
                  onClick={handleClearCart}
                >
                  <span className={cn('sr-only')}>Remove all cart items</span>
                  <span aria-hidden={true}>Remove all</span>
                </Button>
              </div>
              <ul
                role='list'
                className={cn(
                  'inline-full',
                  'max-block-70',
                  'overflow-auto',
                  'flex',
                  'flex-col',
                  'gap-6',
                  'my-8',
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
                    <div
                      className={cn(
                        'flex',
                        'justify-start',
                        'items-center',
                        'gap-4',
                      )}
                    >
                      <ResponsiveImage
                        className={cn('aspect-64/64', 'rounded-lg')}
                        image={image}
                        alt={name}
                        width={64}
                        height={64}
                      />

                      <div
                        className={cn(
                          'max-inline-10',
                          'flex',
                          'flex-col',

                          'xs:max-inline-15',

                          'sm:max-inline-30',

                          'md:max-inline-40',
                        )}
                      >
                        <span
                          className={cn(
                            'uppercase',
                            'text-base',
                            'truncate',

                            'text-black',
                          )}
                        >
                          {name}
                        </span>
                        <span
                          className={cn(
                            'text-xs',
                            'truncate',

                            'text-black/50',
                          )}
                        >
                          {toMoney(price)}
                        </span>
                      </div>
                    </div>

                    <QuantitySelector
                      value={quantity}
                      label={`Quantity for ${name}`}
                      onChange={(value) =>
                        handleQuantityChange({ id, quantity: value })
                      }
                      className={cn('max-inline-30')}
                    />
                  </li>
                ))}
              </ul>

              <dl
                className={cn(
                  'inline-full',
                  'flex',
                  'justify-between',
                  'items-center',
                  'gap-8',
                  'mbe-6',
                )}
              >
                <dt
                  className={cn(
                    'uppercase',
                    'text-base',

                    'text-black/50',
                  )}
                >
                  Total
                </dt>
                <dd
                  className={cn(
                    'max-inline-50',
                    'truncate',
                    'text-md',

                    'text-black',
                  )}
                >
                  {toMoney(grandTotal)}
                </dd>
              </dl>

              <Button
                variant='primary'
                asChild
              >
                <Link
                  to='/checkout'
                  className={cn('inline-full')}
                  onClick={() => onOpenChange?.(false)}
                >
                  Checkout
                </Link>
              </Button>
            </>
          )}
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
};

export default CartModal;
