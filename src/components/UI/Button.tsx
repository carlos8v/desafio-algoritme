import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  background?: string;
  color?: string;
  hover?: string;
  customStyle?: string;
};

const Button: React.FC<ButtonProps> = ({
  background = 'bg-white',
  color = 'text-black',
  hover = '',
  customStyle = '',
  children,
  ...props
}) => {
  const transition = hover ? 'transition ease-in-out duration-150' : '';
  const style = customStyle ? customStyle: 'px-5 py-2 rounded block w-full';

  return (
    <button
      {...props}
      className={`${style} ${color} ${background} ${hover} ${transition}`}
    >
      {children}
    </button>
  );
}

export default Button;
