import { useEffect, useId, useRef, useState } from 'react';

import { Cart, Logo, Close, Menu } from '@/assets/icons';
import { cn } from '@/libs/cn';

const items = [
  {
    url: '#',
    text: 'Home',
  },
  {
    url: '#',
    text: 'Headphones',
  },
  {
    url: '#',
    text: 'Speakers',
  },
  {
    url: '#',
    text: 'Earphones',
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      firstMenuItemRef.current?.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const menuLabelId = useId();
  const menuId = useId();

  const toggleIsOpen = () => {
    setIsOpen((isCurrentlyOpen) => !isCurrentlyOpen);
  };

  return (
    <nav className={cn('relative', 'w-full', 'py-8', 'bg-gray-900')}>
      <div
        className={cn(
          'wrapper',
          'flex',
          'justify-between',
          'items-center',
          'gap-16',
        )}
      >
        <span
          id={menuLabelId}
          className={cn('sr-only')}
        >
          Main menu
        </span>

        <div className={cn('flex', 'items-center', 'gap-8')}>
          <button
            ref={toggleButtonRef}
            type='button'
            aria-expanded={isOpen}
            aria-controls={menuId}
            className={cn(
              '[&_svg]:stroke-white',

              'lg:hidden',
            )}
            onClick={toggleIsOpen}
          >
            <span className={cn('sr-only')}>
              {isOpen ? 'Close main menu' : 'Open main menu'}
            </span>
            {isOpen ? (
              <Close
                aria-hidden={true}
                focusable={false}
              />
            ) : (
              <Menu
                aria-hidden={true}
                focusable={false}
              />
            )}
          </button>

          {/* Logo */}
          <a
            href='#'
            className={cn(
              'hidden',

              'xs:block',

              'link-focusable',
            )}
          >
            <span className={cn('sr-only')}>Audiophile - home</span>
            <Logo
              aria-hidden={true}
              focusable={false}
            />
          </a>
        </div>

        {/* Mobile menu */}
        <ul
          role='list'
          aria-labelledby={menuLabelId}
          id={menuId}
          className={cn(
            'absolute',
            'top-22.25',
            'left-0',
            'z-100',
            'w-full',
            'flex',
            'flex-col',
            'gap-8',
            'items-center',
            'py-8',
            'bg-gray-900',
            !isOpen && 'hidden',

            'lg:hidden',
          )}
        >
          {items.map(({ url, text }, i) => (
            <li key={text}>
              <a
                ref={i === 0 ? firstMenuItemRef : undefined}
                href={url}
                className={cn('nav-link', 'link')}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop menu */}
        <ul
          role='list'
          aria-labelledby={menuLabelId}
          className={cn(
            'hidden',

            'lg:flex',
            'items-center',
            'gap-8',
          )}
        >
          {items.map(({ url, text }) => (
            <li key={text}>
              <a
                href={url}
                className={cn('nav-link', 'link-focusable')}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>

        {/* Cart */}
        <a
          href='#'
          className={cn('link-focusable')}
        >
          <span className={cn('sr-only')}>Cart</span>
          <Cart
            aria-hidden={true}
            focusable={false}
          />
        </a>
      </div>

      {/* Mobile Decorator */}
      <div
        className={cn(
          'w-full',
          'h-px',
          'absolute',
          'bottom-0',
          'left-0',

          'lg:hidden',

          'bg-white',
          'opacity-20',
        )}
      ></div>

      {/* Desktop Decorator */}
      <div
        className={cn(
          'wrapper',
          'relative',
          'hidden',

          'lg:block',
        )}
      >
        <div
          className={cn(
            'w-[calc(100%-5rem)]',
            'h-px',
            'absolute',
            'left-10',
            '-bottom-8',

            'bg-white',
            'opacity-20',
          )}
        ></div>
      </div>
    </nav>
  );
};

export default Navbar;
