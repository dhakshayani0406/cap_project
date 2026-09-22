import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  className = '',
  disabled = false,
  icon: Icon,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const blockClass = block ? 'btn-block' : '';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClass} ${variantClass} ${sizeClass} ${blockClass} ${className}`.trim()}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      <span>{children}</span>
    </button>
  );
};
