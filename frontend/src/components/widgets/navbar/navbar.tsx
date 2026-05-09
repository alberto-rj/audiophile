import { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Logo, Close, Menu } from '@/assets/icons';
import { cn } from '@/libs/cn';
import { navLinks } from '@/libs/constants';
import { AuthCTA, CartModal } from '@/components/widgets';
import { Separator } from '@/components/ui';

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
    <nav
      className={cn(
        'relative',
        'inline-full',
        'py-8',

        'bg-gray-900',
      )}
    >
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
          <Link
            to='/'
            className={cn(
              'hidden',

              'xs:block',

              'link',
            )}
          >
            <span className={cn('sr-only')}>Audiophile - home</span>
            <Logo
              aria-hidden={true}
              focusable={false}
            />
          </Link>
        </div>

        {/* Mobile menu */}
        <div
          aria-labelledby={menuLabelId}
          id={menuId}
          className={cn(
            'inline-full',
            'absolute',
            'inset-bs-22.25',
            'inset-s-0',
            'z-100',
            'py-8',
            { hidden: !isOpen },

            'lg:hidden',

            'bg-gray-900',
          )}
        >
          <ul
            role='list'
            className={cn('flex', 'flex-col', 'gap-8', 'items-center')}
          >
            {navLinks.map(({ url, text }, i) => (
              <li key={text}>
                <Link
                  ref={i === 0 ? firstMenuItemRef : undefined}
                  to={url}
                  className={cn('link', 'nav-link')}
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>

          <Separator
            className={cn(
              'my-8',

              'bg-white/20',
            )}
          />

          <AuthCTA
            className={cn('flex', 'flex-col', 'items-center', 'gap-8')}
          />
        </div>

        {/* Desktop menu */}
        <div
          aria-labelledby={menuLabelId}
          className={cn(
            'hidden',

            'lg:flex',
            'lg:items-center',
            'lg:gap-24',
          )}
        >
          <ul
            role='list'
            className={cn('flex', 'items-center', 'gap-8')}
          >
            {navLinks.map(({ url, text }) => (
              <li key={text}>
                <NavLink
                  to={url}
                  className={cn('link', 'nav-link')}
                >
                  {text}
                </NavLink>
              </li>
            ))}
          </ul>

          <AuthCTA className={cn('flex', 'items-center', 'gap-8')} />
        </div>

        {/* Cart */}
        <CartModal />
      </div>

      {/* Mobile Decorator */}
      <div
        className={cn(
          'w-full',
          'h-px',
          'absolute',
          'bottom-0',
          'left-0',

          'bg-white/20',

          'lg:hidden',
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

            'bg-white/20',
          )}
        ></div>
      </div>
    </nav>
  );
};

export default Navbar;
