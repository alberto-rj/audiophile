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
        'inline-full',
        'flex',
        'items-center',
        'gap-4',
        'px-4',
        'py-4.5',
        'text-xs',

        'bg-white',
        'border',
        'border-gray-600',
        'cursor-pointer',
        'rounded-lg',
        'text-black',

        'hover:border-primary-700',

        'has-checked:border-primary-700',

        'has-focus:border-primary-700',
        'has-focus-visible:border-primary-700',

        'focus-within',

        'has-disabled:cursor-not-allowed',
        'has-disabled:select-none',
        'has-disabled:pointer-events-none',
        'has-disabled:opacity-50',
        'has-disabled:border-gray-400',
        'has-disabled:text-black/50',

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
        className={cn('sr-only', 'peer')}
        aria-describedby={ariaDescribedby}
      />
      <span
        className={cn(
          'shrink-0',
          'size-5',
          'flex',
          'justify-center ',
          'items-center',

          'border',
          'border-gray-600',
          'rounded-full',

          'peer-checked:[&_span]:bg-primary-700',

          'peer-focus:[&_span]:bg-primary-700',
          'peer-focus-visible:[&_span]:bg-primary-700',
        )}
      >
        <span
          className={cn(
            'size-2.5',

            'rounded-full',
          )}
        />
      </span>
      <span>{label}</span>
    </label>
  );
};

export default Radio;
