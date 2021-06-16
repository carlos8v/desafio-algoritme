import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  background?: string;
  color?: string;
  hover?: string;
};

const Button: React.FC<ButtonProps> = ({
  background = 'bg-white',
  color = 'text-black',
  hover = '',
  children,
  ...props
}) => {
  const transition = hover ? 'transition ease-in-out duration-150' : '';

  return (
    <button
      {...props}
      className={`px-5 py-2 rounded block w-full ${color} ${background} ${hover} ${transition}`}
    >
      {children}
    </button>
  );
}

export default Button;
