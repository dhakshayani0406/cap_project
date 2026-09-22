import React from 'react';

export const MetricCard = ({ label, value, icon: Icon, color = 'var(--primary)', bg = 'var(--secondary)', trend }) => {
  return (
    <div className="metric-card">
      <div className="metric-icon-wrap" style={{ backgroundColor: bg, color: color }}>
        {Icon && <Icon size={24} />}
      </div>
      <div className="metric-info">
        <span className="metric-label">{label}</span>
        <span className="metric-value">{value}</span>
        {trend && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};
