import React from 'react';

interface OptionProps {
  text: string;
  value: string;
  isDefault?: boolean;
  dataTestId?: string;
}

interface ComboBoxProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: OptionProps[],
}

const ComboBox: React.FC<ComboBoxProps> = ({
  children,
  options,
  ...props
}) => {
  return (
    <select
      {...props}
      className="border border-gray-300 rounded-md shadow-sm block mt-1 w-full px-2 py-2 text-gray-500 bg-white"
    >
      {options.map(({ text, value, isDefault = false, dataTestId = '' }) => (
        <option
          key={value}
          value={value}
          defaultChecked={isDefault}
          data-testid={dataTestId}
        >
          {text}
        </option>
      ))}
    </select>
  );
};

export default ComboBox;
