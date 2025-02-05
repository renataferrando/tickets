"use client"
import React from "react";
import classNames from "classnames";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  id: string;
  name: string;
  label?: string;
  options: Option[];
  value?: string | number;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  required?: boolean;
  error?: string;
  className?: string; // Additional styles
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  label,
  options,
  value,
  placeholder = "Select an option",
  onChange,
  onBlur,
  required = false,
  error,
  className,
  disabled = false,
}) => {
  const selectClasses = classNames(
    "w-full px-4 py-2 border rounded-md bg-white appearance-none text-sm",
    {
      "border-red-500": error, // Highlight error
      "border-gray-300": !error, // Default border color
      "bg-gray-100 cursor-not-allowed": disabled, // Disabled styles
    },
    className
  );

  const wrapperClasses = classNames(
    "relative w-full flex items-center",
    className
  );

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div className={wrapperClasses}>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          className={classNames(selectClasses, "pr-8")}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div
          className="absolute inset-y-0 right-2 flex items-center pointer-events-none"
          style={{ marginRight: "8px" }} // Add space between chevron and border
        >
          <svg
            className="w-4 h-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.707a1 1 0 011.414 0L10 11.586l3.293-3.879a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Select;
