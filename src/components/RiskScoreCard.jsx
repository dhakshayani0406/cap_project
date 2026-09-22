import React from 'react';
import { ShieldCheck, AlertTriangle, XCircle, Info } from 'lucide-react';

export const RiskScoreCard = ({ score = 700, prediction = "Low Risk", defaultProbability = 0.12, status = "Approved" }) => {
  const isLow = prediction === "Low Risk";
  const isMed = prediction === "Medium Risk";
  const isHigh = prediction === "High Risk";

  const colorClass = isLow ? 'low' : isMed ? 'med' : 'high';
  const badgeClass = isLow ? 'badge-low' : isMed ? 'badge-med' : 'badge-high';
  const Icon = isLow ? ShieldCheck : isMed ? AlertTriangle : XCircle;

  // Percentage on 300-850 range
  const percent = Math.min(100, Math.max(0, Math.round(((score - 300) / (850 - 300)) * 100)));

  return (
    <div className="card text-center" style={{ padding: '32px 24px' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span className={`badge ${badgeClass}`} style={{ fontSize: '0.9rem', padding: '6px 14px' }}>
          <Icon size={16} />
          {prediction}
        </span>
      </div>

      <div className={`score-circle-wrap ${colorClass}`}>
        <span className="score-number" style={{ color: isLow ? 'var(--risk-low)' : isMed ? '#b45309' : 'var(--risk-high)' }}>
          {score}
        </span>
        <span className="score-total">out of 850</span>
      </div>

      <div style={{ maxWidth: '400px', margin: '16px auto 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
          <span>Estimated Default Probability:</span>
          <strong style={{ color: 'var(--text-main)' }}>{(defaultProbability * 100).toFixed(1)}%</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
          <span>Decision Recommendation:</span>
          <strong style={{ color: isLow ? 'var(--risk-low)' : isMed ? 'var(--risk-med)' : 'var(--risk-high)' }}>
            {status}
          </strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span>Score Percentile:</span>
          <strong style={{ color: 'var(--text-main)' }}>Top {100 - percent}%</strong>
        </div>
      </div>
    </div>
  );
};
