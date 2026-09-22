import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export const FactorBar = ({ name, impact = 50, type = 'positive', description }) => {
  const isPositive = type === 'positive';

  return (
    <div className="factor-item-bar">
      <div className="factor-bar-info">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isPositive ? (
            <CheckCircle size={16} color="var(--risk-low)" />
          ) : (
            <AlertCircle size={16} color="var(--risk-high)" />
          )}
          <span>{name}</span>
        </div>
        <span style={{ color: isPositive ? 'var(--risk-low)' : 'var(--risk-high)' }}>
          {isPositive ? `+${impact}%` : `-${impact}%`}
        </span>
      </div>

      <div className="progress-track">
        <div
          className={`progress-fill ${isPositive ? 'positive' : 'risk'}`}
          style={{ width: `${Math.min(100, Math.max(15, impact))}%` }}
        />
      </div>

      {description && (
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>
          {description}
        </div>
      )}
    </div>
  );
};
