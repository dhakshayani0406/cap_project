import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, KeyRound, Mail, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('aditya.sharma@example.com');
    setPassword('password123');
    setError('');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ display: 'inline-flex', padding: '10px', backgroundColor: 'var(--secondary)', borderRadius: '50%', color: 'var(--primary)', marginBottom: '12px' }}>
            <KeyRound size={26} />
          </div>
          <h1>Welcome Back</h1>
          <p>Login to access credit assessments and scorecard intelligence</p>
        </div>

        {/* Quick Demo Credentials Helper */}
        <div className="demo-credentials-box">
          <strong>College Presentation Demo:</strong>
          <div>Click below to auto-fill sample analyst credentials:</div>
          <button
            type="button"
            onClick={handleFillDemo}
            style={{ marginTop: '6px', color: 'var(--accent)', fontWeight: 600, fontSize: '0.8rem', textDecoration: 'underline' }}
          >
            Auto-fill demo analyst account
          </button>
        </div>

        {error && (
          <div className="form-error" style={{ marginBottom: '16px', padding: '10px', backgroundColor: 'var(--risk-high-bg)', borderRadius: 'var(--radius-sm)' }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="name@organization.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <a
              href="#forgot"
              onClick={(e) => { e.preventDefault(); alert('Password reset instructions have been dispatched to your email.'); }}
              style={{ fontSize: '0.825rem', color: 'var(--accent)', fontWeight: 500 }}
            >
              Forgot Password?
            </a>
          </div>

          <Button type="submit" variant="primary" block size="lg" disabled={loading} icon={LogIn}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="auth-footer">
          Don't have an account?{' '}
          <Link to="/signup">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};
