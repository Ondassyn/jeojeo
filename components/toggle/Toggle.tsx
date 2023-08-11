'use client';

import React from 'react';

interface ToggleProps {
  value: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}

const Toggle = ({ value, onClick, className }: ToggleProps) => {
  const toggleClass = 'transform translate-x-5';
  return (
    <div
      className={
        'md:w-12 md:h-6 w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ' +
        (value ? 'bg-primary ' : 'bg-gray-500 ') +
        className
      }
      onClick={onClick}
    >
      <div
        className={
          'bg-white md:w-5 md:h-5 h-5 w-5  rounded-full shadow-md transform duration-300 ease-in-out ' +
          (value ? toggleClass : null)
        }
      ></div>
    </div>
  );
};

export default Toggle;
