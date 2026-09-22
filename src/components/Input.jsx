import React from 'react';
import { AlertCircle } from 'lucide-react';

export const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  helper,
  required = false,
  options = [], // If provided and type is 'select', renders a select dropdown
  className = '',
  ...props
}) => {
  return (
    <div className={`form-group ${className}`.trim()}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label} {required && <span style={{ color: 'var(--risk-high)' }}>*</span>}
        </label>
      )}

      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`form-select ${error ? 'error' : ''}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`form-input ${error ? 'error' : ''}`}
          {...props}
        />
      )}

      {error && (
        <div className="form-error">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}

      {!error && helper && <div className="form-helper">{helper}</div>}
    </div>
  );
};
