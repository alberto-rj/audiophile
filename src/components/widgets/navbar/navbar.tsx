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

    return () => document.removeEventListener('keydown', handleKeyDown);
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
          'gap-16',
          'justify-between',
          'items-center',
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
            className={cn('lg:hidden', '[&_svg]:stroke-white')}
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
            className={cn('link')}
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
            'z-10',
            'w-screen',
            'flex',
            'lg:hidden',
            'flex-col',
            'gap-8',
            'items-center',
            'py-8',
            'bg-gray-900',
            !isOpen && 'hidden',
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
          className={cn('hidden', 'lg:flex', 'gap-8', 'items-center')}
        >
          {items.map(({ url, text }) => (
            <li key={text}>
              <a
                href={url}
                className={cn('nav-link', 'link')}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>

        {/* Cart */}
        <a
          href='#'
          className={cn('link')}
        >
          <span className={cn('sr-only')}>Cart</span>
          <Cart
            aria-hidden={true}
            focusable={false}
          />
        </a>
      </div>

      {/* Mobile Separator */}
      <div
        className={cn(
          'lg:hidden',
          'absolute',
          'bottom-0',
          'left-0',
          'w-full',
          'h-px',
          'bg-white',
          'opacity-20',
        )}
      ></div>

      {/* Desktop separator */}
      <div className={cn('wrapper', 'relative', 'hidden', 'lg:block')}>
        <div
          className={cn(
            'absolute',
            'w-full',
            '-bottom-8',
            'h-px',
            'bg-white',
            'opacity-20',
          )}
        ></div>
      </div>
    </nav>
  );
};

export default Navbar;
