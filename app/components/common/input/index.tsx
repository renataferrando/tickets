import React from "react";
import classNames from "classnames";

interface InputProps {
  id: string;
  name: string;
  label?: string;
  type?: string; // e.g., "text", "email", "password"
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  className?: string; // To customize styles if needed
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  onBlur,
  required = false,
  error,
  className,
  disabled = false,
}) => {
  const inputClasses = classNames(
    "w-full px-4 py-2 border rounded-md appearance-none text-sm",
    {
      "border-red-500": error, // Highlight error
      "border-gray-300": !error, // Default border color
      "bg-gray-100 cursor-not-allowed": disabled, // Disabled styles
    },

    className // Allow for external customization
  );

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        className={inputClasses}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
