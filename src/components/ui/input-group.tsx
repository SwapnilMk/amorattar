import { cn } from '@/lib/utils';
import React, { InputHTMLAttributes } from 'react';

type InputGroupProps = {
  className?: string;
  children: React.ReactNode;
};

type InputTextProps = InputHTMLAttributes<HTMLInputElement>;

const InputGroup = ({ className, children }: InputGroupProps) => {
  return (
    <div
      className={cn(
        'input-group relative flex w-full items-center overflow-hidden rounded-full pl-4 transition-all focus-within:shadow-lg',
        className ?? ''
      )}
    >
      {children}
    </div>
  );
};

const Input = React.forwardRef<HTMLInputElement, InputTextProps>(
  (props: InputTextProps, ref: any) => {
    const { className, ...rest } = props;

    return (
      <input
        className={cn(
          'input-control w-full py-3 pr-4 outline-none placeholder:text-sm placeholder:font-normal',
          className ?? ''
        )}
        autoComplete='off'
        autoCorrect='off'
        spellCheck='false'
        ref={ref}
        {...rest}
      />
    );
  }
);

const InputGroupText = ({ className, children }: InputGroupProps) => {
  return (
    <div className={cn('input-group-text mr-3', className ?? '')}>
      {children}
    </div>
  );
};

InputGroup.Text = InputGroupText;
InputGroup.Input = Input;

export default InputGroup;
