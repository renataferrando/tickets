import React, { useRef } from "react";

interface FileInputProps {
  id?: string;
  label?: string;
  onChange: (file: File | null) => void;
  accept?: string; // File types to accept (e.g., ".png,.jpg,.jpeg")
  error?: string;
  className?: string;
  disabled?: boolean;
}

const FileInput: React.FC<FileInputProps> = ({
  id = "file-input",
  label = "Choose a file",
  onChange,
  accept = "*",
  error,
  className,
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <div className={`flex flex-col gap-2 text-sm font-medium ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`px-2 py-1 rounded-lg text-black ${
          disabled
            ? "bg-gray-300 cursor-not-allowed"
            : "border solid border-black text-black"
        }`}
      >
        {label}
      </button>
      <input
        id={id}
        type="file"
        accept={accept}
        onChange={handleChange}
        ref={fileInputRef}
        className="hidden" // Hide the input
        disabled={disabled}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default FileInput;
