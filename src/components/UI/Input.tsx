import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {};

const Input: React.FC<InputProps> = ({
  children,
  ...props
}) => {
  return (
    <input
      {...props}
      className="border border-gray-300 rounded-md shadow-sm block mt-1 w-full px-2 py-2 text-gray-500"
    >
      {children}
    </input>
  );
};

export default Input;
