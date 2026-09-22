import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, Award, Calendar, LogOut, Edit3, Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAssessment } from '../context/AssessmentContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const { stats } = useAssessment();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    department: user?.department || 'Credit Risk & Governance'
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="container page-wrapper">
      <div className="profile-card card">
        {/* Avatar & Header */}
        <div className="profile-avatar-large">
          {user?.fullName ? user.fullName.charAt(0) : 'U'}
        </div>

        <div className="text-center" style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--primary)' }}>
            {user?.fullName || 'Risk Analyst'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2px' }}>
            {user?.email || 'analyst@organization.com'}
          </p>
          <span className="badge badge-neutral" style={{ marginTop: '8px' }}>
            {user?.role || 'Risk Analyst / Reviewer'}
          </span>
        </div>

        {savedSuccess && (
          <div style={{ backgroundColor: 'var(--risk-low-bg)', border: '1px solid rgba(16, 185, 129, 0.3)', color: 'var(--risk-low)', padding: '10px 16px', borderRadius: 'var(--radius-md)', marginBottom: '18px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600 }}>
            Profile details updated successfully!
          </div>
        )}

        {/* Edit Form or Account Info Grid */}
        {isEditing ? (
          <form onSubmit={handleSave} style={{ marginBottom: '24px' }}>
            <Input
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              label="Department / Lab"
              name="department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              required
            />

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} icon={X}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" icon={Check}>
                Save Changes
              </Button>
            </div>
          </form>
        ) : (
          <div className="profile-info-grid">
            <div className="profile-info-item">
              <span>Account Role</span>
              <strong>{user?.role || 'Lead Analyst'}</strong>
            </div>

            <div className="profile-info-item">
              <span>Department</span>
              <strong>{user?.department || 'Credit Analytics & Audit'}</strong>
            </div>

            <div className="profile-info-item">
              <span>Active Since</span>
              <strong>{user?.memberSince || 'Academic Session 2025-26'}</strong>
            </div>

            <div className="profile-info-item">
              <span>Assessments Conducted</span>
              <strong>{stats.total} Applicants</strong>
            </div>
          </div>
        )}

        {/* Project Context Box */}
        <div style={{ backgroundColor: '#F8FAFC', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '28px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
          <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>
            Capstone System Access Level
          </strong>
          Authorised to run predictive credit scoring, inspect model reason codes (Weight of Evidence / SHAP), and perform regulatory fairness evaluations on the Home Credit Default Risk benchmark.
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)} icon={Edit3}>
              Edit Profile
            </Button>
          )}

          <Button variant="outline" onClick={handleLogout} icon={LogOut} style={{ color: 'var(--risk-high)', borderColor: '#fca5a5' }}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};
