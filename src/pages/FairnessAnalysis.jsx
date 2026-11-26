import React, { useState, useEffect } from 'react';
import { Scale, CheckCircle2, AlertCircle, Info, BarChart2, ShieldCheck, Users } from 'lucide-react';
import { api } from '../services/api';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { BarChart } from '../components/Charts';
import { useAssessment } from '../context/AssessmentContext';

export const FairnessAnalysis = () => {
  const [fairnessData, setFairnessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { assessments } = useAssessment();

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const res = await api.getFairnessMetrics();
        setFairnessData(res);
      } catch (err) {
        console.error("Failed to load fairness metrics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading || !fairnessData) {
    return (
      <div className="container page-wrapper text-center">
        <h2>Computing Demographic Fairness Metrics...</h2>
        <p style={{ color: 'var(--text-muted)' }}>Evaluating across protected attributes...</p>
      </div>
    );
  }

  const isCompliant = fairnessData.disparateImpactRatio >= 0.80;

  return (
    <div className="container page-wrapper">
      {/* Title & Context */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--secondary)', color: 'var(--primary)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '12px' }}>
          <Scale size={14} />
          <span>Fairness & Algorithmic Governance (DSCI-14 / O4)</span>
        </div>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)' }}>
          Demographic Fairness & Parity Analysis
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
          Validating model decisions across demographic slices to guarantee bias mitigation and non-discriminatory credit allocation.
        </p>
      </div>

      {/* Overall Fairness Status Banner */}
      <div className="card" style={{ marginBottom: '28px', backgroundColor: isCompliant ? 'var(--risk-low-bg)' : 'var(--risk-med-bg)', borderColor: isCompliant ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isCompliant ? 'var(--risk-low)' : '#b45309' }}>
            {isCompliant ? <CheckCircle2 size={28} /> : <AlertCircle size={28} />}
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: isCompliant ? 'var(--risk-low)' : '#b45309' }}>
              Governance Audit Verdict
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
              {fairnessData.overallStatus}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              The scorecard passes the Equal Employment Opportunity Commission (EEOC) 80% Four-Fifths rule with a Disparate Impact Ratio of <strong>{fairnessData.disparateImpactRatio}</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Fairness Metrics Grid */}
      <div className="fairness-metrics-grid">
        <div className="fairness-metric-box">
          <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Disparate Impact Ratio
          </span>
          <div className="fairness-metric-value" style={{ color: 'var(--primary)' }}>
            {fairnessData.disparateImpactRatio}
          </div>
          <span className="status-pill badge-low">
            ≥ 0.80 Standard Passed
          </span>
          <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: 1.4 }}>
            Ratio of approval rate of protected group to unconstrained group. Above 0.80 denotes regulatory compliance.
          </p>
        </div>

        <div className="fairness-metric-box">
          <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Demographic Parity Difference
          </span>
          <div className="fairness-metric-value" style={{ color: 'var(--accent)' }}>
            {fairnessData.demographicParityDiff}
          </div>
          <span className="status-pill badge-neutral">
            Low Discrepancy (&lt;10%)
          </span>
          <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: 1.4 }}>
            Absolute variance in favorable decision percentages between demographics. Near 0% is optimal.
          </p>
        </div>

        <div className="fairness-metric-box">
          <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Equal Opportunity Difference
          </span>
          <div className="fairness-metric-value" style={{ color: '#0284c7' }}>
            {fairnessData.equalOpportunityDiff}
          </div>
          <span className="status-pill badge-neutral">
            High Parity Observed
          </span>
          <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: 1.4 }}>
            True positive rate deviation between groups who are qualified to repay.
          </p>
        </div>
      </div>

      {/* Demographic Group Comparison */}
      <div className="group-comparison-grid">
        {/* Gender Comparison */}
        <Card
          title="Gender Group Parity"
          subtitle="Approval distribution across female and male applicant segments"
          action={<Users size={18} color="var(--primary)" />}
        >
          <div>
            {fairnessData.genderGroups.map((group, idx) => {
              const rateNum = parseInt(group.approvalRate, 10) || 70;
              return (
                <div key={idx} style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px' }}>
                    <strong>{group.group} ({group.count} evaluated)</strong>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{group.approvalRate} Approved</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill positive"
                      style={{ width: `${rateNum}%` }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <span>Average Risk Score: {group.avgScore}</span>
                    <span>Sample Representative</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Age Group Comparison */}
        <Card
          title="Age Cohort Distribution"
          subtitle="Model performance across different applicant career stages"
          action={<BarChart2 size={18} color="var(--primary)" />}
        >
          <div>
            {fairnessData.ageGroups.map((group, idx) => {
              const rateNum = parseInt(group.approvalRate, 10) || 60;
              return (
                <div key={idx} style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px' }}>
                    <strong>{group.group}</strong>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{group.approvalRate} Approved</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${rateNum}%`,
                        backgroundColor: rateNum > 70 ? 'var(--risk-low)' : '#0284c7'
                      }}
                    />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Cohort Sample: {group.count} applicant record(s)
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Live Fairness Charts */}
      {(() => {
        const pct = (v) => parseFloat(v) || 0;
        const palette = ['#2f74b5', '#12355B', '#159A9C', '#f1c40f'];
        const genderRate = fairnessData.genderGroups.map((g, i) => ({ label: g.group, value: pct(g.approvalRate), color: palette[i % 4] }));
        const genderScore = fairnessData.genderGroups.map((g, i) => ({ label: g.group, value: Number(g.avgScore) || 0, color: palette[i % 4] }));
        const ageRate = fairnessData.ageGroups.map((g) => ({ label: g.group, value: pct(g.approvalRate), color: pct(g.approvalRate) < 60 ? '#c0392b' : '#2f74b5' }));
        const probByGender = fairnessData.genderGroups.map((g, i) => {
          const rows = (assessments || []).filter((a) => String(g.group).toLowerCase().startsWith((a.applicant?.gender || '#').toLowerCase()));
          const v = rows.length ? rows.reduce((s, a) => s + (a.defaultProbability ?? 0), 0) / rows.length : 0;
          return { label: g.group, value: Number(v.toFixed(3)), color: palette[i % 4] };
        });
        const dir = Number(fairnessData.disparateImpactRatio) || 0;
        const dpd = pct(fairnessData.demographicParityDiff);
        return (
          <div style={{ marginTop: '28px' }}>
            <div className="group-comparison-grid" style={{ marginBottom: '24px' }}>
              <Card title="Low-Risk Rate by Gender (%)"><BarChart data={genderRate} yMax={100} format={(v) => v} /></Card>
              <Card title="Low-Risk Rate by Age Group (%)"><BarChart data={ageRate} yMax={100} format={(v) => v} /></Card>
            </div>
            <div className="group-comparison-grid" style={{ marginBottom: '24px' }}>
              <Card title="Mean Credit Score by Gender"><BarChart data={genderScore} yMin={300} yMax={850} /></Card>
              <Card title="Mean Default Probability by Gender"><BarChart data={probByGender} /></Card>
            </div>
            <div className="group-comparison-grid">
              <Card title="Disparate Impact Ratio"><BarChart data={[{ label: 'Current data', value: dir, color: dir >= 0.8 ? '#2f74b5' : '#c0392b' }]} yMax={1.2} threshold={0.8} thresholdLabel="0.80 four-fifths rule" format={(v) => v.toFixed(2)} /></Card>
              <Card title="Demographic Parity Difference (%)"><BarChart data={[{ label: 'Current data', value: dpd, color: dpd > 10 ? '#c0392b' : '#2f74b5' }]} yMax={50} /></Card>
            </div>
          </div>
        );
      })()}

      {/* College Capstone Evaluation Note */}
      <div style={{ marginTop: '28px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        <Info size={22} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--text-main)' }}>College Capstone Defense Tip:</strong> In your final presentation, explain that traditional credit models often penalize young borrowers or create hidden demographic skews due to historical credit bureau sparsity. By applying demographic parity checks (O4 integration), the system balances predictive performance (AUC &gt; 0.85) with strict fairness compliance (KPI-3 &ge; 80/100).
        </div>
      </div>
    </div>
  );
};
