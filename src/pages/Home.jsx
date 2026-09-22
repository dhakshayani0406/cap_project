import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, BarChart3, Scale, ArrowRight, UserCheck, CheckCircle2, TrendingUp, Sparkles, FileText } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-pill">
            <Sparkles size={14} color="var(--accent)" />
            <span>Explainable & Fair Machine Learning Capstone</span>
          </div>

          <h1 className="hero-title">
            Smarter Credit Risk Assessment
          </h1>

          <p className="hero-subtitle">
            Predict credit risk with transparent scores, understandable explanations, and fairness analysis.
          </p>

          <div className="hero-actions">
            <Link to="/assessment">
              <Button variant="primary" size="lg" icon={ArrowRight}>
                Check Credit Risk
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </a>
          </div>

          {/* Simple Professional Illustration / Stats Bar */}
          <div className="hero-illustration">
            <div className="hero-stat-item">
              <div className="hero-stat-number" style={{ color: 'var(--accent)' }}>850</div>
              <div className="hero-stat-label">Transparent Scorecard</div>
            </div>
            <div style={{ width: '1px', height: '40px', backgroundColor: '#cbd5e1' }} />
            <div className="hero-stat-item">
              <div className="hero-stat-number" style={{ color: 'var(--risk-low)' }}>100%</div>
              <div className="hero-stat-label">Explainable Reason Codes</div>
            </div>
            <div style={{ width: '1px', height: '40px', backgroundColor: '#cbd5e1' }} />
            <div className="hero-stat-item">
              <div className="hero-stat-number" style={{ color: 'var(--primary)' }}>&gt; 0.80</div>
              <div className="hero-stat-label">Disparate Impact Compliant</div>
            </div>
            <div style={{ width: '1px', height: '40px', backgroundColor: '#cbd5e1' }} />
            <div className="hero-stat-item">
              <div className="hero-stat-number" style={{ color: '#0284c7' }}>Home Credit</div>
              <div className="hero-stat-label">Benchmark Verified</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Feature Cards */}
      <section className="features-section">
        <div className="container">
          <div className="section-title-wrap">
            <h2 className="section-title">Core Capabilities</h2>
            <p className="section-desc">
              Designed according to modern regulatory standards requiring transparent, justifiable, and equitable automated lending.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon-box">
                <TrendingUp size={26} />
              </div>
              <h3 className="feature-title">Risk Prediction</h3>
              <p className="feature-body">
                Predict whether an applicant is likely to repay or default based on comprehensive demographic, income, and historical credit behavior.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <BarChart3 size={26} />
              </div>
              <h3 className="feature-title">Explainable Results</h3>
              <p className="feature-body">
                Understand the important factors behind each prediction with granular positive and risk-increasing influence weights.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <Scale size={26} />
              </div>
              <h3 className="feature-title">Fair Assessment</h3>
              <p className="feature-body">
                Analyse predictions across different groups to verify demographic parity and mitigate algorithmic bias across gender and age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container" style={{ marginBottom: '60px' }}>
        <div className="how-it-works-section">
          <div className="section-title-wrap" style={{ marginBottom: '32px' }}>
            <h2 className="section-title">How It Works</h2>
            <p className="section-desc">
              A transparent four-stage pipeline from applicant ingestion to verified decision support.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">Enter Applicant Details</h3>
              <p className="step-text">
                Input basic personal information, employment tenure, income level, and credit details through a clean structured form.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">Analyse Data</h3>
              <p className="step-text">
                The scorecard engine parses key ratios including loan-to-income, repayment track, and debt burdens.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Generate Risk Score</h3>
              <p className="step-text">
                Compute an interpretable score (300 to 850) calibrated to low, medium, or high default likelihood.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <h3 className="step-title">View Explanation</h3>
              <p className="step-text">
                Inspect applicant reason codes and verify fairness audits across protected demographic segments.
              </p>
            </div>
          </div>

          <div className="text-center" style={{ marginTop: '36px' }}>
            <Link to="/assessment">
              <Button variant="primary" size="lg" icon={ArrowRight}>
                Start New Assessment Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
