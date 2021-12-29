import React from 'react';
import { useField } from 'formik';

type InterfaceProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string;
  error?: string;
  focusOnRender?: boolean;
  inline?: boolean;
  labelClassName?: string;
  helperText?: string;
};

export const InputField: React.FC<InterfaceProps> = (props) => {
  const [field, { error }] = useField(props);
  return (
    <div>
      <input
        {...field}
        className={`p-2 placeholder:text-sm mt-3 bg-[#FAFAFA] focus:border-gray-800 border w-full rounded focus:outline-none ${
          error ? ' border-2 border-red-500' : ''
        }`}
        {...props}
      />
      <small className='text-red-500 mt-0'>{error}</small>
    </div>
  );
};
