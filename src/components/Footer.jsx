import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div className="footer-brand">
              <Shield size={18} color="var(--primary)" />
              <span style={{ fontWeight: 700 }}>CreditScore</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>| College Capstone Project</span>
            </div>
            <p className="footer-note">
              Credit-Risk Scorecard with Explainability and Fairness (Based on Home Credit Default Risk benchmark)
            </p>
          </div>

          <div style={{ display: 'flex', gap: '18px', fontSize: '0.85rem' }}>
            <Link to="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
            <Link to="/dashboard" style={{ color: 'var(--text-muted)' }}>Dashboard</Link>
            <Link to="/assessment" style={{ color: 'var(--text-muted)' }}>Risk Assessment</Link>
            <Link to="/explainability" style={{ color: 'var(--text-muted)' }}>Explainability</Link>
            <Link to="/fairness" style={{ color: 'var(--text-muted)' }}>Fairness</Link>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '20px', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <div>© {new Date().getFullYear()} CreditScore Assessment Portal. Built for Academic Demonstration.</div>
          <div>B.Tech Capstone Project • KL Capstone Framework DSCI-14</div>
        </div>
      </div>
    </footer>
  );
};
