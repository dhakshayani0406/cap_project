import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, ShieldCheck, AlertTriangle, AlertOctagon, FileSpreadsheet, ArrowRight, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAssessment } from '../context/AssessmentContext';
import { MetricCard } from '../components/MetricCard';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { BarChart, PieChart, ScatterChart, riskColor } from '../components/Charts';

export const Dashboard = () => {
  const { user } = useAuth();
  const { assessments, stats, selectAssessment, loading } = useAssessment();
  const navigate = useNavigate();

  const handleViewResult = (assessment) => {
    selectAssessment(assessment);
    navigate(`/result/${assessment.id}`);
  };

  const list = assessments || [];
  const riskData = [
    { label: 'Low', value: stats.lowRisk || 0, color: riskColor('Low Risk') },
    { label: 'Medium', value: stats.mediumRisk || 0, color: riskColor('Medium Risk') },
    { label: 'High', value: stats.highRisk || 0, color: riskColor('High Risk') },
  ];
  const bins = [['300-499', 300, 499], ['500-599', 500, 599], ['600-699', 600, 699], ['700-799', 700, 799], ['800-850', 800, 850]];
  const binData = bins.map(([label, lo, hi]) => ({ label, value: list.filter((a) => a.riskScore >= lo && a.riskScore <= hi).length }));
  const perApplicant = list.slice(0, 8).map((a) => ({ label: String(a.id).replace(/^.*?(\d+)$/, '$1'), value: a.riskScore, color: riskColor(a.prediction) }));
  const scatter = list.map((a) => ({ x: a.riskScore, y: a.defaultProbability ?? 0.1, label: String(a.id).replace(/^.*?(\d+)$/, '$1'), color: riskColor(a.prediction) }));

  return (
    <div className="container page-wrapper">
      {/* Top Header */}
      <div className="dashboard-header">
        <div className="dashboard-greeting">
          <h1>Welcome back{user?.fullName ? `, ${user.fullName}` : ''}!</h1>
          <p>Monitor your recent credit risk scorecard evaluations and portfolio risk profile.</p>
        </div>

        <Link to="/assessment">
          <Button variant="primary" size="lg" icon={PlusCircle}>
            + New Risk Assessment
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="metrics-grid">
        <MetricCard
          label="Total Assessments"
          value={stats.total}
          icon={FileSpreadsheet}
          color="var(--primary)"
          bg="var(--secondary)"
          trend="All recorded applicants"
        />
        <MetricCard
          label="Low Risk"
          value={stats.lowRisk}
          icon={ShieldCheck}
          color="var(--risk-low)"
          bg="var(--risk-low-bg)"
          trend={`${stats.total ? Math.round((stats.lowRisk / stats.total) * 100) : 0}% approval rate`}
        />
        <MetricCard
          label="Medium Risk"
          value={stats.mediumRisk}
          icon={AlertTriangle}
          color="#b45309"
          bg="var(--risk-med-bg)"
          trend="Manual review track"
        />
        <MetricCard
          label="High Risk"
          value={stats.highRisk}
          icon={AlertOctagon}
          color="var(--risk-high)"
          bg="var(--risk-high-bg)"
          trend="Elevated default risk"
        />
      </div>

      {/* Live Charts (computed from assessments) */}
      <div className="group-comparison-grid" style={{ marginBottom: '24px' }}>
        <Card title="Records per Risk Category" subtitle="Updates as you add assessments">
          <BarChart data={riskData} yLabel="Records" />
        </Card>
        <Card title="Share of Records" subtitle="Risk category split">
          <PieChart data={riskData} />
        </Card>
      </div>
      <div className="group-comparison-grid" style={{ marginBottom: '24px' }}>
        <Card title="Credit Score Distribution" subtitle="Score intervals (300-850 scale)">
          <BarChart data={binData} yLabel="Records" />
        </Card>
        <Card title="Score per Applicant" subtitle="Latest applicants, colored by risk">
          <BarChart data={perApplicant} yMin={300} yMax={850} />
        </Card>
      </div>
      <Card title="Score vs Estimated Default Probability" subtitle="Each dot is an assessed applicant; dashed line is a logistic trend" style={{ marginBottom: '24px' }}>
        <ScatterChart points={scatter} />
      </Card>

      {/* Recent Assessments Table */}
      <Card
        title="Recent Credit Assessments"
        subtitle="Permanent records evaluated by the transparent credit-risk engine"
        className="table-card"
        action={
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Showing {assessments.length} records
          </span>
        }
      >
        <div className="table-responsive">
          <table className="clean-table">
            <thead>
              <tr>
                <th>Applicant ID</th>
                <th>Applicant Name</th>
                <th>Date</th>
                <th>Risk Score</th>
                <th>Prediction</th>
                <th>Default Prob.</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assessments.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                    No assessments recorded yet. Click <strong>+ New Risk Assessment</strong> to evaluate your first applicant.
                  </td>
                </tr>
              ) : (
                assessments.map((item) => {
                  const isLow = item.prediction === 'Low Risk';
                  const isMed = item.prediction === 'Medium Risk';
                  const badgeClass = isLow ? 'badge-low' : isMed ? 'badge-med' : 'badge-high';

                  return (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.id}</td>
                      <td>
                        <div style={{ fontWeight: 500 }}>{item.applicant?.fullName || 'Anonymous'}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {item.applicant?.gender}, {item.applicant?.age} yrs
                        </div>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.date}</td>
                      <td>
                        <span style={{ fontWeight: 700, fontSize: '1.05rem', color: isLow ? 'var(--risk-low)' : isMed ? '#b45309' : 'var(--risk-high)' }}>
                          {item.riskScore}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}> / 850</span>
                      </td>
                      <td>
                        <span className={`badge ${badgeClass}`}>
                          {item.prediction}
                        </span>
                      </td>
                      <td style={{ fontWeight: 500, color: 'var(--text-main)' }}>
                        {((item.defaultProbability || 0.1) * 100).toFixed(1)}%
                      </td>
                      <td>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewResult(item)}
                          icon={ExternalLink}
                        >
                          View Result
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
