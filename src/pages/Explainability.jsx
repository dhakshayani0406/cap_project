import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, HelpCircle, Shield, Info, ArrowRight, User } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { Card } from '../components/Card';
import { FactorBar } from '../components/FactorBar';
import { Button } from '../components/Button';

export const Explainability = () => {
  const { assessments, currentAssessment, selectAssessment } = useAssessment();
  const [selectedId, setSelectedId] = useState(currentAssessment?.id || assessments[0]?.id);

  const active = assessments.find((a) => a.id === selectedId) || currentAssessment || assessments[0];

  const handleSelectChange = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    selectAssessment(id);
  };

  if (!active) {
    return (
      <div className="container page-wrapper text-center">
        <h2>No Assessments Available</h2>
        <p style={{ color: 'var(--text-muted)', margin: '16px 0' }}>
          Please perform an assessment to view the explainability breakdown.
        </p>
        <Link to="/assessment">
          <Button variant="primary">New Risk Assessment</Button>
        </Link>
      </div>
    );
  }

  const isLow = active.prediction === 'Low Risk';
  const isMed = active.prediction === 'Medium Risk';
  const badgeClass = isLow ? 'badge-low' : isMed ? 'badge-med' : 'badge-high';

  return (
    <div className="container page-wrapper">
      {/* Header with Applicant Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)' }}>
            Why was this prediction made?
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
            Transparent reason codes and factor attribution for regulatory compliance and applicant rights.
          </p>
        </div>

        {/* Applicant Switcher for Demo / Viva */}
        <div style={{ minWidth: '240px' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
            Selected Applicant Record:
          </label>
          <select
            value={selectedId}
            onChange={handleSelectChange}
            className="form-select"
            style={{ fontWeight: 600, color: 'var(--primary)' }}
          >
            {assessments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.id} - {a.applicant?.fullName} ({a.prediction})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview Card */}
      <div className="card" style={{ marginBottom: '28px', backgroundColor: 'var(--secondary)', borderColor: '#b8d6ec' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
              Evaluation Summary
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', marginTop: '2px' }}>
              {active.applicant?.fullName}
            </h2>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Age {active.applicant?.age} • {active.applicant?.gender} • {active.applicant?.employmentStatus}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Scorecard Output
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: isLow ? 'var(--risk-low)' : isMed ? '#b45309' : 'var(--risk-high)' }}>
                {active.riskScore} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/ 850</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Risk Classification
              </div>
              <span className={`badge ${badgeClass}`} style={{ fontSize: '0.9rem', marginTop: '4px' }}>
                {active.prediction}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* College Viva Guide Notice */}
      <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '14px 18px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Info size={20} color="var(--accent)" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
          <strong>Explainability Architecture (DSCI-14 / O3 Contribution):</strong> This module extracts local additive feature contributions (similar to SHAP values and Weight of Evidence scorecard calculations), enabling adverse action notice generation under fair lending guidelines.
        </div>
      </div>

      {/* Two Column Factor Grid: Positive Factors vs Risk-Increasing Factors */}
      <div className="explain-grid">
        {/* Left: Positive Factors (Risk Decreasing) */}
        <Card
          title="Positive Factors (Risk-Decreasing)"
          subtitle="Key attributes that increased the credit score"
          action={
            <span className="badge badge-low">
              {active.factors?.length || 0} Factors
            </span>
          }
        >
          {active.factors && active.factors.length > 0 ? (
            <div className="factors-summary-list">
              {active.factors.map((factor, index) => (
                <div key={index} className="factor-card-item pos">
                  <CheckCircle2 size={20} color="var(--risk-low)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.925rem', color: 'var(--text-main)' }}>{factor.name}</strong>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--risk-low)' }}>
                        +{factor.impact}%
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                      {factor.description}
                    </p>
                    <div className="progress-track" style={{ marginTop: '8px' }}>
                      <div
                        className="progress-fill positive"
                        style={{ width: `${Math.min(100, factor.impact)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', padding: '16px 0' }}>
              No dominant positive factors detected for this risk bracket.
            </p>
          )}
        </Card>

        {/* Right: Risk-Increasing Factors */}
        <Card
          title="Risk-Increasing Factors"
          subtitle="Adverse influences that lowered the credit score"
          action={
            <span className="badge badge-high">
              {active.riskIncreasingFactors?.length || 0} Factors
            </span>
          }
        >
          {active.riskIncreasingFactors && active.riskIncreasingFactors.length > 0 ? (
            <div className="factors-summary-list">
              {active.riskIncreasingFactors.map((factor, index) => (
                <div key={index} className="factor-card-item neg">
                  <AlertTriangle size={20} color="var(--risk-high)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.925rem', color: 'var(--text-main)' }}>{factor.name}</strong>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--risk-high)' }}>
                        -{factor.impact}%
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                      {factor.description}
                    </p>
                    <div className="progress-track" style={{ marginTop: '8px' }}>
                      <div
                        className="progress-fill risk"
                        style={{ width: `${Math.min(100, factor.impact)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <CheckCircle2 size={36} color="var(--risk-low)" style={{ margin: '0 auto 10px' }} />
              <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>No Adverse Risk Factors</div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                This applicant profile demonstrates no major regulatory or leverage warning flags.
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Navigation Footer */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '36px' }}>
        <Link to="/fairness">
          <Button variant="secondary" size="lg" icon={ArrowRight}>
            Proceed to Fairness Analysis
          </Button>
        </Link>
        <Link to="/assessment">
          <Button variant="outline" size="lg">
            Evaluate Another Applicant
          </Button>
        </Link>
      </div>
    </div>
  );
};
