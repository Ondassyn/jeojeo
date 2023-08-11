'use client';

import React from 'react';

interface InputProps {
  value: any;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  id?: string;
  placeholder?: string;
  big?: boolean;
  required?: boolean;
  autoComplete?: string;
  rows?: number;
  className?: string;
}

const TextArea = ({
  value,
  onChange,
  name,
  id,
  placeholder,
  big,
  required,
  autoComplete,
  rows,
  className,
}: InputProps) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      className={`block w-full rounded-md border-0 py-1.5 text-dark shadow-sm ring-1 ring-inset ring-gray-300 
        placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary
        ${className}`}
      rows={rows ?? 3}
    ></textarea>
  );
};

export default TextArea;
