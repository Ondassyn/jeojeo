'use client';

import React from 'react';

interface InputProps {
  type: any;
  value: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  placeholder?: string;
  big?: boolean;
  required?: boolean;
  autoComplete?: string;
  pattern?: string;
  maxLength?: number;
}

const Input = ({
  type,
  value,
  onChange,
  name,
  id,
  placeholder,
  big,
  required,
  autoComplete,
  pattern,
  maxLength,
}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      pattern={pattern}
      onChange={onChange}
      name={name}
      id={id}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      maxLength={maxLength}
      className="block w-full rounded-md border-0 py-1.5 text-dark shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
    ></input>
  );
};

export default Input;
