import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, CreditCard, DollarSign, Calculator, AlertCircle, Sparkles } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const RiskAssessment = () => {
  const navigate = useNavigate();
  const { submitAssessment } = useAssessment();

  const [formData, setFormData] = useState({
    // Section 1: Personal
    fullName: '',
    age: '',
    gender: 'Female',
    education: 'Higher Education',
    familyStatus: 'Married',

    // Section 2: Employment & Income
    employmentStatus: 'Working',
    income: '',
    experience: '',

    // Section 3: Credit Information
    creditHistory: 'Good',
    existingLoans: '0',
    creditAccounts: '2',

    // Section 4: Loan Information
    loanAmount: '',
    loanTerm: '24',
    loanPurpose: 'Home Renovation'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Quick pre-fill helper for smooth college presentation
  const handlePrefill = (scenario = 'low') => {
    if (scenario === 'low') {
      setFormData({
        fullName: 'Deepak Narang',
        age: '35',
        gender: 'Male',
        education: 'Higher Education',
        familyStatus: 'Married',
        employmentStatus: 'Commercial Associate',
        income: '950000',
        experience: '7',
        creditHistory: 'Good',
        existingLoans: '1',
        creditAccounts: '3',
        loanAmount: '300000',
        loanTerm: '24',
        loanPurpose: 'Home Renovation'
      });
    } else {
      setFormData({
        fullName: 'Kavita Singh',
        age: '23',
        gender: 'Female',
        education: 'Secondary',
        familyStatus: 'Single',
        employmentStatus: 'Working',
        income: '320000',
        experience: '1',
        creditHistory: 'Fair',
        existingLoans: '3',
        creditAccounts: '4',
        loanAmount: '550000',
        loanTerm: '36',
        loanPurpose: 'Personal'
      });
    }
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Applicant full name is required';
    if (!formData.age || Number(formData.age) < 18 || Number(formData.age) > 90) {
      newErrors.age = 'Age must be between 18 and 90';
    }
    if (!formData.income || Number(formData.income) <= 0) {
      newErrors.income = 'Please specify valid annual income';
    }
    if (formData.experience === '' || Number(formData.experience) < 0) {
      newErrors.experience = 'Experience cannot be negative';
    }
    if (formData.existingLoans === '' || Number(formData.existingLoans) < 0) {
      newErrors.existingLoans = 'Cannot be negative';
    }
    if (formData.creditAccounts === '' || Number(formData.creditAccounts) < 0) {
      newErrors.creditAccounts = 'Cannot be negative';
    }
    if (!formData.loanAmount || Number(formData.loanAmount) <= 0) {
      newErrors.loanAmount = 'Please enter valid loan amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await submitAssessment(formData);
      navigate(`/result/${res.assessment.id}`);
    } catch (err) {
      alert('Error calculating credit risk scorecard. Please check input parameters.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container page-wrapper">
      <div className="assessment-form-container">
        {/* Page Title & Helpers */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)' }}>
              Credit Risk Assessment
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
              Enter applicant credentials across the 4 standard regulatory credit appraisal modules.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="secondary" size="sm" onClick={() => handlePrefill('low')} icon={Sparkles}>
              Fill Low Risk Example
            </Button>
            <Button variant="outline" size="sm" onClick={() => handlePrefill('high')}>
              Fill High Risk Example
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Personal Information */}
          <Card className="form-section-card">
            <div className="form-section-header">
              <div className="section-badge">1</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={18} color="var(--primary)" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary)' }}>
                  Personal Information
                </h3>
              </div>
            </div>

            <div className="form-grid-2">
              <Input
                label="Full Name"
                name="fullName"
                placeholder="e.g. Priya Sharma"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                required
              />

              <Input
                label="Age (Years)"
                name="age"
                type="number"
                placeholder="e.g. 32"
                value={formData.age}
                onChange={handleChange}
                error={errors.age}
                required
              />

              <Input
                label="Gender"
                name="gender"
                type="select"
                value={formData.gender}
                onChange={handleChange}
                options={[
                  { value: 'Female', label: 'Female' },
                  { value: 'Male', label: 'Male' },
                  { value: 'Non-Binary', label: 'Non-Binary / Other' }
                ]}
                required
              />

              <Input
                label="Education Level"
                name="education"
                type="select"
                value={formData.education}
                onChange={handleChange}
                options={[
                  { value: 'Higher Education', label: 'Higher Education (Graduate / Post-Grad)' },
                  { value: 'Secondary', label: 'Secondary / High School' },
                  { value: 'Academic Degree', label: 'Academic Degree (PhD / Masters)' },
                  { value: 'Incomplete Higher', label: 'Incomplete Higher Education' }
                ]}
                required
              />

              <Input
                label="Family Status"
                name="familyStatus"
                type="select"
                value={formData.familyStatus}
                onChange={handleChange}
                options={[
                  { value: 'Married', label: 'Married' },
                  { value: 'Single', label: 'Single / Unmarried' },
                  { value: 'Civil Marriage', label: 'Civil Marriage' },
                  { value: 'Separated', label: 'Separated / Divorced' },
                  { value: 'Widow', label: 'Widowed' }
                ]}
                required
              />
            </div>
          </Card>

          {/* Section 2: Employment & Income */}
          <Card className="form-section-card">
            <div className="form-section-header">
              <div className="section-badge">2</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Briefcase size={18} color="var(--primary)" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary)' }}>
                  Employment & Income
                </h3>
              </div>
            </div>

            <div className="form-grid-2">
              <Input
                label="Employment Status"
                name="employmentStatus"
                type="select"
                value={formData.employmentStatus}
                onChange={handleChange}
                options={[
                  { value: 'Working', label: 'Salaried / Private Sector' },
                  { value: 'Commercial Associate', label: 'Commercial Associate / Corporate' },
                  { value: 'State Servant', label: 'State / Government Servant' },
                  { value: 'Self-Employed', label: 'Self-Employed Professional' },
                  { value: 'Retired', label: 'Pensioner / Retired' }
                ]}
                required
              />

              <Input
                label="Annual Income (₹ / INR)"
                name="income"
                type="number"
                placeholder="e.g. 750000"
                value={formData.income}
                onChange={handleChange}
                error={errors.income}
                helper="Gross yearly declared income"
                required
              />

              <Input
                label="Employment Experience (Years)"
                name="experience"
                type="number"
                step="0.5"
                placeholder="e.g. 4.5"
                value={formData.experience}
                onChange={handleChange}
                error={errors.experience}
                helper="Total continuous professional work experience"
                required
              />
            </div>
          </Card>

          {/* Section 3: Credit Information */}
          <Card className="form-section-card">
            <div className="form-section-header">
              <div className="section-badge">3</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CreditCard size={18} color="var(--primary)" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary)' }}>
                  Credit Information
                </h3>
              </div>
            </div>

            <div className="form-grid-2">
              <Input
                label="Credit History Rating"
                name="creditHistory"
                type="select"
                value={formData.creditHistory}
                onChange={handleChange}
                options={[
                  { value: 'Good', label: 'Good (No late payments in past 24 mos)' },
                  { value: 'Fair', label: 'Fair (1-2 isolated 30-day delays)' },
                  { value: 'Poor', label: 'Poor (90+ day default recorded)' },
                  { value: 'No History', label: 'No Prior Credit History' }
                ]}
                required
              />

              <Input
                label="Number of Existing Active Loans"
                name="existingLoans"
                type="number"
                placeholder="e.g. 1"
                value={formData.existingLoans}
                onChange={handleChange}
                error={errors.existingLoans}
                helper="Current loans being actively serviced"
                required
              />

              <Input
                label="Total Number of Credit Accounts"
                name="creditAccounts"
                type="number"
                placeholder="e.g. 3"
                value={formData.creditAccounts}
                onChange={handleChange}
                error={errors.creditAccounts}
                helper="Active credit cards and overdraft facilities"
                required
              />
            </div>
          </Card>

          {/* Section 4: Loan Information */}
          <Card className="form-section-card">
            <div className="form-section-header">
              <div className="section-badge">4</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <DollarSign size={18} color="var(--primary)" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary)' }}>
                  Loan Information
                </h3>
              </div>
            </div>

            <div className="form-grid-2">
              <Input
                label="Requested Loan Amount (₹ / INR)"
                name="loanAmount"
                type="number"
                placeholder="e.g. 400000"
                value={formData.loanAmount}
                onChange={handleChange}
                error={errors.loanAmount}
                required
              />

              <Input
                label="Loan Term (Months)"
                name="loanTerm"
                type="select"
                value={formData.loanTerm}
                onChange={handleChange}
                options={[
                  { value: '12', label: '12 Months (1 Year)' },
                  { value: '24', label: '24 Months (2 Years)' },
                  { value: '36', label: '36 Months (3 Years)' },
                  { value: '48', label: '48 Months (4 Years)' },
                  { value: '60', label: '60 Months (5 Years)' }
                ]}
                required
              />

              <Input
                label="Loan Purpose"
                name="loanPurpose"
                type="select"
                value={formData.loanPurpose}
                onChange={handleChange}
                options={[
                  { value: 'Home Renovation', label: 'Home Renovation / Repair' },
                  { value: 'Vehicle', label: 'Vehicle Purchase' },
                  { value: 'Education', label: 'Education / Higher Studies' },
                  { value: 'Business', label: 'Working Capital / Business Expansion' },
                  { value: 'Personal', label: 'Personal / Medical Discretionary' }
                ]}
                required
              />
            </div>
          </Card>

          {/* Submit Action */}
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              icon={Calculator}
              style={{ minWidth: '260px' }}
            >
              {isSubmitting ? 'Evaluating Scorecard...' : 'Predict Credit Risk'}
            </Button>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Evaluates predictive score, derives reason codes, and applies fairness checks.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
