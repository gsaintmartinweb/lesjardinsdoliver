import React, { MouseEventHandler } from 'react';
import Link from 'next/link';

interface MinimalistButtonProps {
  label: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string; // Allow additional class names if needed
  disabled?: boolean; // Add disabled prop
}

const MinimalistButton: React.FC<MinimalistButtonProps> = ({ label, href, onClick, type = 'button', className = '', disabled = false, ...props }) => {
  const buttonClassNames = `bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out hover:bg-gray-300 hover:shadow-lg mb-4 ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClassNames} {...props}>
        {label}
      </Link>
    );
  }

  return (
    <button type={type} className={buttonClassNames} onClick={onClick} disabled={disabled} {...props}>
      {label}
    </button>
  );
};

export default MinimalistButton;
