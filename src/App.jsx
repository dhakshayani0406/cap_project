import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AssessmentProvider } from './context/AssessmentContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
import { RiskAssessment } from './pages/RiskAssessment';
import { RiskResult } from './pages/RiskResult';
import { Explainability } from './pages/Explainability';
import { FairnessAnalysis } from './pages/FairnessAnalysis';
import { Profile } from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <AssessmentProvider>
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/assessment" element={<ProtectedRoute><RiskAssessment /></ProtectedRoute>} />
                <Route path="/result" element={<ProtectedRoute><RiskResult /></ProtectedRoute>} />
                <Route path="/result/:id" element={<ProtectedRoute><RiskResult /></ProtectedRoute>} />
                <Route path="/explainability" element={<ProtectedRoute><Explainability /></ProtectedRoute>} />
                <Route path="/fairness" element={<ProtectedRoute><FairnessAnalysis /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AssessmentProvider>
    </AuthProvider>
  );
}

export default App;
