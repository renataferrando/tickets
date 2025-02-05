import React from "react";
import classNames from "classnames";

interface TextAreaProps {
  id: string;
  name: string;
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  error?: string;
  className?: string;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  name,
  label,
  value,
  placeholder,
  onChange,
  onBlur,
  required = false,
  error,
  className,
  disabled = false,
  rows = 4,
  maxLength,
}) => {
  const textAreaClasses = classNames(
    "w-full px-4 py-2 border rounded-md bg-white text-sm",
    {
      "border-red-500": error, // Highlight error
      "border-gray-300": !error, // Default border color
      "bg-gray-100 cursor-not-allowed": disabled, // Disabled styles
    },
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
      <textarea
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        className={classNames(textAreaClasses, "resize-none")} // Disable resize
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default TextArea;
