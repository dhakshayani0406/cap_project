import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, User, LogOut, ArrowRight, LayoutDashboard, FileSpreadsheet, BarChart2, Scale } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo" onClick={closeMenu}>
            <div className="brand-icon">
              <Shield size={20} />
            </div>
            <span>CreditScore</span>
            <span className="brand-badge">Capstone</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav>
            <ul className="nav-links">
              <li className="nav-item">
                <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/assessment" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Risk Assessment
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/explainability" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Explainability
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/fairness" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Fairness
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Profile
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Auth State in Desktop Nav */}
          <div className="nav-auth">
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link to="/profile" className="user-profile-pill">
                  <div className="user-avatar-sm">
                    {user.fullName ? user.fullName.charAt(0) : 'U'}
                  </div>
                  <span>{user.fullName || 'User'}</span>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} icon={LogOut}>
                  Logout
                </Button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li>
            <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/assessment" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
              Risk Assessment
            </NavLink>
          </li>
          <li>
            <NavLink to="/explainability" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
              Explainability
            </NavLink>
          </li>
          <li>
            <NavLink to="/fairness" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
              Fairness
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
              Profile
            </NavLink>
          </li>
        </ul>

        <div className="mobile-auth-section">
          {user ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0' }}>
                <div className="user-avatar-sm">
                  {user.fullName ? user.fullName.charAt(0) : 'U'}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.fullName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
                </div>
              </div>
              <Button variant="outline" block onClick={handleLogout} icon={LogOut}>
                Logout
              </Button>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/login" onClick={closeMenu}>
                <Button variant="outline" block>
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={closeMenu}>
                <Button variant="primary" block>
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
