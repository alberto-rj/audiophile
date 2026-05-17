import { type ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import { selectIsCartModalOpen, setIsCartModalOpen } from '@/app/features/cart';
import {
  useClearCartMutation,
  useGetCartQuery,
  useUpdateCartItemQuantityMutation,
} from '@/app/services/cart-api';
import type { AppDispatch } from '@/app/store';
import { Button, Modal, Spinner } from '@/components/ui';
import {
  QuantitySelector,
  ResponsiveImage,
  StatusVisuallyHidden,
} from '@/components/widgets';
import { APP_ROUTES } from '@/config/app-routes';
import { useToast } from '@/hooks';
import { cn } from '@/libs/cn';
import { getItemsCount, toMoney } from '@/libs/helpers';
import type { Cart, CartItem } from '@/libs/types';

interface BaseCartModalProps {
  children?: ReactNode;
  itemsCount?: number;
}

const BaseCartModal = ({ children }: BaseCartModalProps) => {
  const open = useSelector(selectIsCartModalOpen);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenChange = (open: boolean) => {
    dispatch(setIsCartModalOpen(open));
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content
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
          {children}
        </Modal.Content>
      </Modal.Portal>
    </Modal>
  );
};

const CartModalError = () => {
  return (
    <BaseCartModal>
      <Modal.Title
        asChild
        className={cn('h6')}
      >
        <h2>Cart</h2>
      </Modal.Title>
      <Modal.Description className={cn('text-center', 'my-8')}>
        Failed to load cart. Please try again.
      </Modal.Description>
    </BaseCartModal>
  );
};

const CartModalLoading = () => {
  return (
    <BaseCartModal>
      <StatusVisuallyHidden>
        <Modal.Title asChild>
          <h2>Cart</h2>
        </Modal.Title>
        <Modal.Description>Loading your cart.</Modal.Description>
      </StatusVisuallyHidden>

      <Spinner
        variant={'primary'}
        size={'sm'}
        className={cn('mx-auto', 'my-8')}
      />
    </BaseCartModal>
  );
};

interface SingleCartItemProps {
  item: CartItem;
}

const SingleCartItem = ({
  item: { id, productId, image, name, price, quantity },
}: SingleCartItemProps) => {
  const [updateItemQuantity, { isLoading: isUpdatingItemQuantity }] =
    useUpdateCartItemQuantityMutation();

  const handleQuantityChange = useDebouncedCallback(
    async ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => {
      try {
        await updateItemQuantity({ productId, quantity }).unwrap();
      } catch (error) {
        console.error(`Failed to update quantity for ${id}`, error);
      }
    },
    500,
  );

  return (
    <>
      <div className={cn('flex', 'justify-start', 'items-center', 'gap-4')}>
        <ResponsiveImage
          image={image}
          alt={name}
          width={64}
          height={64}
          loading='lazy'
          className={cn(
            'aspect-64/64',

            'rounded-lg',
          )}
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
          <span className={cn('text-xs', 'truncate')}>{toMoney(price)}</span>
        </div>
      </div>

      <QuantitySelector
        value={quantity}
        label={`Quantity for ${name}`}
        disabled={isUpdatingItemQuantity}
        onChange={(value) =>
          handleQuantityChange({ productId, quantity: value })
        }
        className={cn('max-inline-30')}
      />
    </>
  );
};

interface CartItemListProps {
  items: CartItem[];
}

const CartItemList = ({ items }: CartItemListProps) => {
  return (
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
      {items.map((item) => (
        <li
          key={item.id}
          className={cn('flex', 'justify-between', 'items-center', 'gap-6')}
        >
          <SingleCartItem item={item} />
        </li>
      ))}
    </ul>
  );
};

interface CartModalFilledProps {
  cart: Cart;
}

const CartModalFilled = ({ cart }: CartModalFilledProps) => {
  const toast = useToast();
  const [clearCart, { isLoading: isClearingCart }] = useClearCartMutation();

  const handleClearCart = async () => {
    try {
      await clearCart().unwrap();
      toast.success({
        title: 'Success!',
        description: 'Cart cleared successfully.',
      });
    } catch {
      toast.error({
        title: 'Something went wrong',
        description: 'Failed to clear cart.',
      });
    }
  };

  const { subtotal, items } = cart;
  const itemsCount = getItemsCount(items);

  if (itemsCount === 0) {
    return (
      <BaseCartModal>
        <Modal.Title
          asChild
          className={cn('h6')}
        >
          <h2>Cart</h2>
        </Modal.Title>
        <Modal.Description className={cn('text-center', 'my-8')}>
          Your cart is empty.
        </Modal.Description>
      </BaseCartModal>
    );
  }

  return (
    <BaseCartModal itemsCount={itemsCount}>
      <div className={cn('flex', 'justify-between', 'items-center', 'gap-8')}>
        <Modal.Title
          className={cn('max-inline-50', 'truncate', 'h6')}
          asChild
        >
          <h2>
            <span className={cn('sr-only')}>Cart</span>
            <span aria-hidden={true}>Cart ({itemsCount})</span>
          </h2>
        </Modal.Title>

        <Modal.Description className={cn('sr-only')}>
          Your cart has {itemsCount} item(s).
        </Modal.Description>

        <Button
          type='button'
          variant='link'
          onClick={handleClearCart}
          disabled={isClearingCart}
        >
          <span className={cn('sr-only')}>Remove all cart items</span>
          {isClearingCart ? <>Removing...</> : <>Remove all</>}
        </Button>
      </div>
      <CartItemList items={items} />
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
        <dt className={cn('uppercase')}>Subtotal</dt>
        <dd
          className={cn(
            'max-inline-50',
            'truncate',
            'text-md',

            'text-black',
          )}
        >
          {toMoney(subtotal)}
        </dd>
      </dl>

      <Modal.Close asChild>
        <Button
          variant='primary'
          asChild
        >
          <Link
            to={APP_ROUTES.checkout}
            className={cn('inline-full')}
          >
            Checkout
          </Link>
        </Button>
      </Modal.Close>
    </BaseCartModal>
  );
};

const CartModal = () => {
  const { isLoading, isError, data } = useGetCartQuery();

  if (isLoading) {
    return <CartModalLoading />;
  }

  if (isError) {
    return <CartModalError />;
  }

  return <CartModalFilled cart={data!.cart} />;
};

export default CartModal;
