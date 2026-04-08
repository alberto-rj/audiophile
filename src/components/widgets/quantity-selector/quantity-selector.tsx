import { useState } from 'react';

import { cn } from '@/libs/cn';

interface QuantitySelectorProps {
  initialValue: number;
  onChange: (value: number) => void;
}

const QuantitySelector = ({
  initialValue,
  onChange,
}: QuantitySelectorProps) => {
  const [value, setValue] = useState<number>(() => {
    if (initialValue < 1) {
      return 1;
    }

    return initialValue;
  });

  const handleIncrement = () => {
    const newValue = value + 1;
    setValue(newValue);
    onChange(newValue);
  };

  const handleDecrement = () => {
    let newValue = 1;

    if (value > 1) {
      newValue = value - 1;
    }

    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={cn('inline-flex')}>
      <button onClick={handleIncrement}>
        <span className={cn('sr-only')}>Increment quantity</span>
        <span>+</span>
      </button>
      <label
        htmlFor='quantity'
        className={cn('sr-only')}
      >
        Quantity
      </label>
      <input
        id='quantity'
        type='number'
        value={value}
      />
      <button onClick={handleDecrement}>
        <span className={cn('sr-only')}>Decrement quantity</span>
        <span>-</span>
      </button>
    </div>
  );
};

export default QuantitySelector;
