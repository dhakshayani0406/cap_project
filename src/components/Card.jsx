import React from 'react';

export const Card = ({
  children,
  title,
  subtitle,
  action,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  ...props
}) => {
  return (
    <div className={`card ${className}`.trim()} {...props}>
      {(title || subtitle || action) && (
        <div className={`card-header ${headerClassName}`.trim()} style={action ? { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } : {}}>
          <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
};
