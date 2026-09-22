import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart3, Scale, PlusCircle, CheckCircle, AlertTriangle, FileText, User } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { RiskScoreCard } from '../components/RiskScoreCard';
import { FactorBar } from '../components/FactorBar';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const RiskResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { assessments, currentAssessment, selectAssessment } = useAssessment();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      const found = assessments.find((a) => a.id === id);
      if (found) {
        setData(found);
        selectAssessment(found);
        return;
      }
    }
    if (currentAssessment) {
      setData(currentAssessment);
    } else if (assessments.length > 0) {
      setData(assessments[0]);
    }
  }, [id, currentAssessment, assessments]);

  if (!data) {
    return (
      <div className="container page-wrapper text-center">
        <h2>No Assessment Selected</h2>
        <p style={{ color: 'var(--text-muted)', margin: '16px 0' }}>
          Please complete a new assessment or select an applicant from the dashboard.
        </p>
        <Link to="/assessment">
          <Button variant="primary">Start Assessment</Button>
        </Link>
      </div>
    );
  }

  // Combine top factors (positive + risk) for summary view
  const topFactors = [
    ...(data.factors || []).slice(0, 3),
    ...(data.riskIncreasingFactors || []).slice(0, 2)
  ];

  return (
    <div className="container page-wrapper">
      <div className="result-container">
        {/* Navigation Bar / Breadcrumb */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>

          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Assessment Record: <strong>{data.id}</strong> • Evaluated on {data.date}
          </span>
        </div>

        {/* Applicant Header Badge Card */}
        <div className="card" style={{ marginBottom: '24px', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <User size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>
                {data.applicant?.fullName || 'Applicant Details'}
              </h2>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                {data.applicant?.gender} • {data.applicant?.age} Years • {data.applicant?.employmentStatus}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Requested Loan
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)' }}>
              ₹{Number(data.applicant?.loanAmount || 0).toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {data.applicant?.loanTerm} Months • {data.applicant?.loanPurpose}
            </div>
          </div>
        </div>

        {/* Primary Result Score Card */}
        <RiskScoreCard
          score={data.riskScore}
          prediction={data.prediction}
          defaultProbability={data.defaultProbability}
          status={data.status}
        />

        {/* Prediction Explanation Section */}
        <div style={{ marginTop: '28px' }}>
          <Card
            title="Prediction Explanation"
            subtitle="Top influential factors driving this applicant's scorecard assessment"
          >
            <div className="factors-summary-list">
              {topFactors.map((factor, index) => (
                <FactorBar
                  key={index}
                  name={factor.name}
                  impact={factor.impact}
                  type={factor.type}
                  description={factor.description}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '36px', flexWrap: 'wrap' }}>
          <Link to="/explainability">
            <Button variant="primary" size="lg" icon={BarChart3}>
              View Explanation
            </Button>
          </Link>

          <Link to="/fairness">
            <Button variant="secondary" size="lg" icon={Scale}>
              View Fairness Analysis
            </Button>
          </Link>

          <Link to="/assessment">
            <Button variant="outline" size="lg" icon={PlusCircle}>
              New Assessment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
