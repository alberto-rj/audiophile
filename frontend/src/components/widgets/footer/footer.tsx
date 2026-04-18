import { Link } from 'react-router-dom';

import { Logo } from '@/assets/icons';
import { cn } from '@/libs/cn';
import { navLinks, socialLinks } from '@/libs/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('py-9', 'bg-gray-900')}>
      <div className={cn('relative', 'wrapper', 'grid', 'gap-12')}>
        {/* Decorator */}
        <div
          className={cn(
            'absolute',
            'w-25',
            'h-1',
            '-top-9',
            'left-1/2',
            '-translate-x-1/2',

            'sm:left-5',
            'sm:translate-x-0',

            'md:left-10',

            'bg-primary-400',
          )}
        ></div>

        <div
          className={cn(
            'flex',
            'flex-col',
            'items-center',
            'gap-12',
            'pt-12',

            'sm:items-start',
            'sm:gap-8',

            'md:flex-row',
            'md:justify-between',
          )}
        >
          {/* Logo */}
          <Link
            to='/'
            className={cn('link-focusable')}
          >
            <span className={cn('sr-only')}>Audiophile - home</span>
            <Logo
              aria-hidden={true}
              focusable={false}
            />
          </Link>

          {/* Nav Links */}
          <ul
            role='list'
            className={cn(
              'flex',
              'flex-col',
              'items-center',
              'gap-4',

              'sm:flex-row',
              'sm:gap-8.5',
            )}
          >
            {navLinks.map(({ url, text }) => (
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
        </div>

        <p
          className={cn(
            'max-w-172',
            'text-base',
            'text-center',

            'sm:text-start',

            'md:max-w-135',

            'text-white',
            'opacity-50',
          )}
        >
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we’re open 7 days a week.
        </p>

        <div
          className={cn(
            'flex',
            'flex-col',
            'items-center',
            'justify-between',
            'gap-12',

            'sm:flex-row',
          )}
        >
          <p
            className={cn(
              'text-base',
              'text-center',
              'text-white',
              'sm:text-start',
              'opacity-50',
            )}
          >
            Copyright {currentYear}. All Rights Reserved
          </p>

          {/* Social Links */}
          <ul
            role='list'
            className={cn('flex', 'items-center', 'gap-4')}
          >
            {socialLinks.map(({ url, Icon, text }) => (
              <li key={text}>
                <a
                  href={url}
                  className={cn('link-focusable')}
                >
                  <span className={cn('sr-only')}>{text}</span>
                  {
                    <Icon
                      aria-hidden={true}
                      focusable={false}
                    />
                  }
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
