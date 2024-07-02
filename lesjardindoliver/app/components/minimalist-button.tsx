// components/MinimalistButton.tsx
import React, { MouseEventHandler } from 'react';
import Link from 'next/link';

interface MinimalistButtonProps {
  label: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string; // Allow additional class names if needed
}

const MinimalistButton: React.FC<MinimalistButtonProps> = ({ label, href, onClick, type = 'button', className = '', ...props }) => {
  const buttonClassNames = `bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out hover:bg-gray-300 hover:shadow-lg mb-4 ${className}`;

  if (href) {
    return (
      <Link href={href}>
        <a className={buttonClassNames} {...props}>
          {label}
        </a>
      </Link>
    );
  }

  return (
    <button type={type} className={buttonClassNames} onClick={onClick} {...props}>
      {label}
    </button>
  );
};

export default MinimalistButton;
