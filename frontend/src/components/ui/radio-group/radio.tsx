import { cn } from '@/libs/cn';

interface RadioProps {
  label: string;
  value: string;
  name: string;
  ariaDescribedby?: string;
  checked?: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const Radio = ({
  ariaDescribedby,
  label,
  value,
  name,
  checked = false,
  disabled,
  onChange,
  className,
}: RadioProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };

  return (
    <label
      className={cn(
        'w-full',
        'flex',
        'items-center',
        'gap-4',
        'px-4',
        'py-4.5',
        'border',
        'border-gray-600',
        'rounded-lg',
        'cursor-pointer',
        'text-form',
        'text-black',

        'hover:border-primary-400',

        'has-checked:border-primary-400',

        'has-focus:border-primary-400',
        'has-focus:outline',
        'has-focus:outline-primary-400',
        'has-focus-visible:outline',
        'has-focus-visible:outline-primary-400',
        'has-focus-visible:border-primary-400',

        'has-disabled:cursor-not-allowed',
        'has-disabled:select-none',
        'has-disabled:pointer-events-none',
        'has-disabled:opacity-50',
        'has-disabled:border-gray-400',
        'has-disabled:text-black-o-50',
        className,
      )}
    >
      <input
        type='radio'
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className='sr-only peer'
        aria-describedby={ariaDescribedby}
      />
      <span
        className={cn(
          'shrink-0',
          'size-5',
          'flex',
          'justify-center ',
          'items-center',
          'rounded-full',
          'border',
          'border-gray-600',

          'peer-checked:[&_span]:bg-primary-400',

          'peer-focus:[&_span]:bg-primary-400',
          'peer-focus-visible:[&_span]:bg-primary-400',
        )}
      >
        <span className={cn('size-2.5', 'rounded-full')} />
      </span>
      <span>{label}</span>
    </label>
  );
};

export default Radio;
