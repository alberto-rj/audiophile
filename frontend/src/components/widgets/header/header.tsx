import { cn } from '@/libs/cn';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header
      className={cn(
        'w-full',
        'flex',
        'justify-center',
        'items-center',
        'py-8',

        'lg:py-24.5',

        'bg-black',
        'text-white',
      )}
    >
      <h1
        className={cn(
          'text-xl',

          'md:text-3xl',

          'uppercase',
        )}
      >
        {title}
      </h1>
    </header>
  );
};

export default Header;
