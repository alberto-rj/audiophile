import { useId } from 'react';

import { cn } from '@/libs/cn';

type QuantityButtonProps = React.ComponentProps<'button'>;

const QuantityButton = ({ className, ...props }: QuantityButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        'px-4',
        'py-2',
        'cursor-pointer',
        'text-black/50',

        'hover:text-primary-400',

        'focus:text-primary-400',
        'focus:outline',
        'focus:outline-primary-400',
        'focus-visible:text-primary-400',
        'focus-visible:outline',
        'focus-visible:outline-primary-400',
        className,
      )}
    />
  );
};

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  label?: string;
  min?: number;
  name?: string;
  className?: string;
}

const QuantitySelector = ({
  label = 'Quantity',
  value,
  disabled,
  min = 0,
  name,
  className,
  onChange,
}: QuantitySelectorProps) => {
  const inputId = useId();

  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value <= min) return;
    onChange(value - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.currentTarget.value, 10);

    if (isNaN(parsed)) return;

    if (parsed <= min) return;

    onChange(parsed);
  };

  return (
    <div
      className={cn(
        'inline-flex',
        'items-center',
        'text-xs',
        'text-black',
        'bg-gray-400',
        'border',
        'border-gray-600',

        'has-disabled:cursor-not-allowed',
        'has-disabled:select-none',
        'has-disabled:pointer-events-none',
        'has-disabled:opacity-50',
        'has-disabled:border-gray-400',
        'has-disabled:text-black/50',
        className,
      )}
    >
      <QuantityButton
        disabled={disabled}
        type='button'
        onClick={handleDecrement}
      >
        <span className={cn('sr-only')}>Decrease {label}</span>
        <span aria-hidden={true}>-</span>
      </QuantityButton>

      <label
        htmlFor={inputId}
        className={cn('sr-only')}
      >
        {label}
      </label>
      <input
        id={inputId}
        disabled={disabled}
        type='number'
        inputMode='numeric'
        min={min}
        name={name}
        onChange={handleChange}
        value={value}
        className={cn(
          'd-block',
          'w-full',
          'p-2',
          'text-center',
          '[-moz-appearance:textfield]',
          '[appearance:textfield]',
          '[&::-webkit-outer-spin-button]:appearance-none',
          '[&::-webkit-outer-spin-button]:m-0',
          '[&::-webkit-inner-spin-button]:appearance-none',
          '[&::-webkit-inner-spin-button]:m-0',

          'focus:outline',
          'focus:outline-primary-400',
          'focus:caret-primary-400',
          'focus-visible:outline-primary-400',
          'focus-visible:outline-primary-400',
          'focus-visible:caret-primary-400',
        )}
      />
      <QuantityButton
        disabled={disabled}
        type='button'
        onClick={handleIncrement}
      >
        <span className={cn('sr-only')}>Increase {label}</span>
        <span aria-hidden={true}>+</span>
      </QuantityButton>
    </div>
  );
};

export default QuantitySelector;
