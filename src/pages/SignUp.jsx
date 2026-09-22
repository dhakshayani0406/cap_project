import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password should be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await signup({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ display: 'inline-flex', padding: '10px', backgroundColor: 'var(--secondary)', borderRadius: '50%', color: 'var(--primary)', marginBottom: '12px' }}>
            <UserPlus size={26} />
          </div>
          <h1>Create Account</h1>
          <p>Join the CreditScore platform for transparent risk evaluation</p>
        </div>

        {error && (
          <div className="form-error" style={{ marginBottom: '16px', padding: '10px', backgroundColor: 'var(--risk-high-bg)', borderRadius: 'var(--radius-sm)' }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="fullName"
            placeholder="e.g. Aditya Sharma"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="aditya@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="At least 6 characters"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <div style={{ marginTop: '24px' }}>
            <Button type="submit" variant="primary" block size="lg" disabled={loading} icon={UserPlus}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <Link to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
