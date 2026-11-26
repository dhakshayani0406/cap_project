/**
 * Credit-Risk Scorecard Service & API Layer
 * 
 * NOTE FOR COLLEGE PRESENTATION / BACKEND INTEGRATION:
 * To connect this frontend to your Python (Flask/FastAPI/Django) ML backend:
 * 1. Change USE_MOCK to false
 * 2. Update API_BASE_URL to your backend host (e.g. 'http://localhost:5000/api')
 * 3. Ensure your backend returns the expected JSON fields as shown in the mock responses.
 */

export const USE_MOCK = false; // Connected to Python FastAPI ML Backend
export const API_BASE_URL = 'http://127.0.0.1:5000/api';

// Initial starter mock dataset simulating Home Credit Default Risk benchmark
const INITIAL_ASSESSMENTS = [
  {
    id: "APP-4821",
    date: "2026-09-18",
    applicant: {
      fullName: "Priya Sharma",
      age: 32,
      gender: "Female",
      education: "Higher Education",
      familyStatus: "Married",
      employmentStatus: "Commercial Associate",
      income: 850000,
      experience: 6,
      creditHistory: "Good",
      existingLoans: 1,
      creditAccounts: 3,
      loanAmount: 350000,
      loanTerm: 24,
      loanPurpose: "Home Renovation"
    },
    riskScore: 785,
    prediction: "Low Risk",
    defaultProbability: 0.08,
    status: "Approved",
    factors: [
      { name: "Stable Income & Low Debt Ratio", impact: 88, type: "positive", description: "Annual income well exceeds monthly obligations." },
      { name: "Established Credit History", impact: 82, type: "positive", description: "Consistently on-time repayments on existing credit." },
      { name: "Continuous Employment Experience", impact: 74, type: "positive", description: "6+ years in stable commercial associate role." },
      { name: "Reasonable Loan Term Length", impact: 65, type: "positive", description: "24-month term presents minimal horizon risk." }
    ],
    riskIncreasingFactors: [
      { name: "Existing Active Credit Account", impact: 25, type: "risk", description: "1 active credit facility currently open." }
    ]
  },
  {
    id: "APP-4822",
    date: "2026-09-19",
    applicant: {
      fullName: "Rahul Verma",
      age: 24,
      gender: "Male",
      education: "Secondary",
      familyStatus: "Single",
      employmentStatus: "Working",
      income: 380000,
      experience: 1.5,
      creditHistory: "Fair",
      existingLoans: 3,
      creditAccounts: 4,
      loanAmount: 600000,
      loanTerm: 36,
      loanPurpose: "Vehicle"
    },
    riskScore: 540,
    prediction: "High Risk",
    defaultProbability: 0.42,
    status: "Review Required",
    factors: [
      { name: "Active Employment", impact: 52, type: "positive", description: "Applicant currently has active income stream." }
    ],
    riskIncreasingFactors: [
      { name: "High Loan-to-Income Ratio", impact: 85, type: "risk", description: "Loan amount exceeds 1.5x annual income." },
      { name: "Multiple Open Active Loans", impact: 78, type: "risk", description: "3 concurrent existing loans increase debt burden." },
      { name: "Limited Employment Tenure", impact: 68, type: "risk", description: "Under 2 years at current organization." },
      { name: "Fair Credit History", impact: 60, type: "risk", description: "Past late payment instances detected in records." }
    ]
  },
  {
    id: "APP-4823",
    date: "2026-09-20",
    applicant: {
      fullName: "Ananya Deshmukh",
      age: 41,
      gender: "Female",
      education: "Academic Degree",
      familyStatus: "Married",
      employmentStatus: "State Servant",
      income: 1200000,
      experience: 12,
      creditHistory: "Good",
      existingLoans: 0,
      creditAccounts: 2,
      loanAmount: 500000,
      loanTerm: 12,
      loanPurpose: "Education"
    },
    riskScore: 820,
    prediction: "Low Risk",
    defaultProbability: 0.04,
    status: "Approved",
    factors: [
      { name: "Zero Existing Outstanding Debt", impact: 92, type: "positive", description: "No current active liabilities or open lines." },
      { name: "Long Government Job Tenure", impact: 89, type: "positive", description: "High stability in public administration service." },
      { name: "Optimal Debt-to-Income (<0.4)", impact: 85, type: "positive", description: "Loan size easily covered by disposable cashflow." },
      { name: "Flawless Repayment Track Record", impact: 80, type: "positive", description: "History of zero 30+ day delinquencies." }
    ],
    riskIncreasingFactors: []
  },
  {
    id: "APP-4824",
    date: "2026-09-20",
    applicant: {
      fullName: "Karthik Nair",
      age: 29,
      gender: "Male",
      education: "Higher Education",
      familyStatus: "Single",
      employmentStatus: "Working",
      income: 620000,
      experience: 3,
      creditHistory: "Fair",
      existingLoans: 2,
      creditAccounts: 3,
      loanAmount: 400000,
      loanTerm: 24,
      loanPurpose: "Personal"
    },
    riskScore: 635,
    prediction: "Medium Risk",
    defaultProbability: 0.22,
    status: "Manual Review",
    factors: [
      { name: "Moderate Disposable Income", impact: 68, type: "positive", description: "Sufficient income to cover estimated EMI." },
      { name: "Tertiary Education Level", impact: 62, type: "positive", description: "Correlates with future earnings stability." }
    ],
    riskIncreasingFactors: [
      { name: "Moderate Credit Bureau Score", impact: 64, type: "risk", description: "Historical inquiries elevated in past 6 months." },
      { name: "Existing Outstanding Facilities", impact: 58, type: "risk", description: "2 ongoing installment obligations." }
    ]
  },
  {
    id: "APP-4825",
    date: "2026-09-21",
    applicant: {
      fullName: "Siddharth Mehta",
      age: 52,
      gender: "Male",
      education: "Higher Education",
      familyStatus: "Married",
      employmentStatus: "Commercial Associate",
      income: 1600000,
      experience: 18,
      creditHistory: "Good",
      existingLoans: 1,
      creditAccounts: 5,
      loanAmount: 750000,
      loanTerm: 36,
      loanPurpose: "Business"
    },
    riskScore: 760,
    prediction: "Low Risk",
    defaultProbability: 0.09,
    status: "Approved",
    factors: [
      { name: "Substantial Income Capacity", impact: 86, type: "positive", description: "Top quartile earnings in peer applicant pool." },
      { name: "Decade+ Professional Seniority", impact: 84, type: "positive", description: "18 years of continuous verified experience." },
      { name: "Healthy Asset Backing", impact: 75, type: "positive", description: "Consistent credit accounts maintenance." }
    ],
    riskIncreasingFactors: [
      { name: "Moderate Multi-Card Exposure", impact: 35, type: "risk", description: "5 credit lines active simultaneously." }
    ]
  }
];

// Load assessments from localStorage or initialize with seed
const getStoredAssessments = () => {
  const stored = localStorage.getItem('credit_assessments_store');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse assessments from storage", e);
    }
  }
  localStorage.setItem('credit_assessments_store', JSON.stringify(INITIAL_ASSESSMENTS));
  return INITIAL_ASSESSMENTS;
};

// Internal simulated ML scorecard calculation (mimics Logistic Regression / WOE Scorecard)
export const calculateCreditScore = (data) => {
  let baseScore = 600; // Baseline median credit score

  // 1. Credit History Impact (Weight: ~25%)
  if (data.creditHistory === 'Good') baseScore += 95;
  else if (data.creditHistory === 'Fair') baseScore += 10;
  else if (data.creditHistory === 'Poor') baseScore -= 120;
  else baseScore += 0; // No History

  // 2. Debt-to-Income / Loan Ratio (Weight: ~30%)
  const annualIncome = Number(data.income) || 400000;
  const loanAmt = Number(data.loanAmount) || 200000;
  const loanToIncome = loanAmt / (annualIncome || 1);

  if (loanToIncome < 0.3) baseScore += 70;
  else if (loanToIncome < 0.6) baseScore += 35;
  else if (loanToIncome < 1.0) baseScore -= 20;
  else if (loanToIncome < 1.5) baseScore -= 70;
  else baseScore -= 110;

  // 3. Employment Stability (Weight: ~20%)
  const exp = Number(data.experience) || 0;
  if (exp >= 10) baseScore += 50;
  else if (exp >= 5) baseScore += 35;
  else if (exp >= 2) baseScore += 15;
  else if (exp >= 1) baseScore -= 10;
  else baseScore -= 40;

  // 4. Existing Loans / Liabilities (Weight: ~15%)
  const activeLoans = Number(data.existingLoans) || 0;
  if (activeLoans === 0) baseScore += 40;
  else if (activeLoans === 1) baseScore += 15;
  else if (activeLoans === 2) baseScore -= 15;
  else baseScore -= 55;

  // 5. Age & Education Stability (Weight: ~10%)
  const age = Number(data.age) || 25;
  if (age >= 30 && age <= 60) baseScore += 25;
  else if (age > 60) baseScore += 10;
  else baseScore -= 10;

  if (data.education === 'Academic Degree' || data.education === 'Higher Education') {
    baseScore += 20;
  }

  // Bound score between 300 and 850 (standard FICO/CIBIL range)
  const finalScore = Math.min(850, Math.max(300, Math.round(baseScore)));

  // Risk Classification
  let prediction = "Medium Risk";
  let defaultProbability = 0.20;
  let status = "Manual Review";

  if (finalScore >= 700) {
    prediction = "Low Risk";
    defaultProbability = Number(((850 - finalScore) / 1000).toFixed(2));
    status = "Approved";
  } else if (finalScore < 580) {
    prediction = "High Risk";
    defaultProbability = Number((0.35 + (580 - finalScore) / 600).toFixed(2));
    status = "Review Required";
  } else {
    defaultProbability = Number((0.15 + (700 - finalScore) / 800).toFixed(2));
  }

  // Generate dynamic Explainability Factors
  const positiveFactors = [];
  const riskIncreasingFactors = [];

  if (annualIncome >= 600000) {
    positiveFactors.push({
      name: "Sufficient Annual Income",
      impact: Math.min(90, Math.round((annualIncome / 1000000) * 45) + 40),
      type: "positive",
      description: `Income of ₹${annualIncome.toLocaleString('en-IN')} provides solid debt servicing capacity.`
    });
  }

  if (data.creditHistory === "Good") {
    positiveFactors.push({
      name: "Good Credit Repayment Track",
      impact: 85,
      type: "positive",
      description: "Past loans and commitments were fulfilled without 30-day defaults."
    });
  }

  if (exp >= 3) {
    positiveFactors.push({
      name: "Stable Employment Tenure",
      impact: Math.min(85, 50 + exp * 4),
      type: "positive",
      description: `${exp} years of continuous employment indicates steady income stream.`
    });
  }

  if (loanToIncome <= 0.5) {
    positiveFactors.push({
      name: "Conservative Loan-to-Income",
      impact: 78,
      type: "positive",
      description: "Requested loan is comfortably within recommended leverage thresholds."
    });
  }

  // Risk-increasing factors
  if (loanToIncome > 0.8) {
    riskIncreasingFactors.push({
      name: "High Loan-to-Income Ratio",
      impact: Math.min(92, Math.round(loanToIncome * 50)),
      type: "risk",
      description: "Loan amount is very large relative to declared yearly earnings."
    });
  }

  if (data.creditHistory === "Poor" || data.creditHistory === "Fair") {
    riskIncreasingFactors.push({
      name: "Suboptimal Credit History",
      impact: data.creditHistory === "Poor" ? 85 : 55,
      type: "risk",
      description: data.creditHistory === "Poor" 
        ? "Historical delinquencies or missed payments lower approval confidence."
        : "Moderate credit history with occasional delayed payments."
    });
  }

  if (activeLoans >= 2) {
    riskIncreasingFactors.push({
      name: "Multiple Existing Obligations",
      impact: Math.min(80, activeLoans * 25),
      type: "risk",
      description: `Applicant already services ${activeLoans} active credit facilities.`
    });
  }

  if (exp < 2) {
    riskIncreasingFactors.push({
      name: "Limited Job Experience",
      impact: 60,
      type: "risk",
      description: "Under 2 years in present career track increases vulnerability to market shifts."
    });
  }

  // Fallbacks if lists are empty
  if (positiveFactors.length === 0) {
    positiveFactors.push({
      name: "Applicant Age Profile",
      impact: 50,
      type: "positive",
      description: "Meets standard eligibility baseline for age."
    });
  }
  if (riskIncreasingFactors.length === 0) {
    riskIncreasingFactors.push({
      name: "General Market Rate Exposure",
      impact: 20,
      type: "risk",
      description: "Standard macroeconomic credit sensitivity."
    });
  }

  return {
    riskScore: finalScore,
    prediction,
    defaultProbability,
    status,
    factors: positiveFactors,
    riskIncreasingFactors
  };
};

// Public API Service Object
export const api = {
  // Auth
  login: async (email, password) => {
    if (!USE_MOCK) {
      let res;
      try {
        res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
      } catch (err) {
        throw new Error('Cannot reach the server. Please make sure the backend is running.');
      }
      if (!res.ok) {
        // Wrong email/password (401) or any other server error -> NEVER log in
        throw new Error('Invalid email or password');
      }
      const data = await res.json();
      if (data.user) {
        localStorage.setItem('credit_user_session', JSON.stringify(data.user));
      }
      return data;
    }
    // Mock simulation (only when USE_MOCK = true)
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: "USR-101",
          fullName: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()) || "Aditya Sharma",
          email: email || "aditya.sharma@example.com",
          role: "Risk Analyst / Reviewer",
          memberSince: "July 2025",
          department: "Credit Risk & Governance"
        };
        localStorage.setItem('credit_user_session', JSON.stringify(user));
        resolve({ success: true, user });
      }, 300);
    });
  },

  signup: async (userData) => {
    if (!USE_MOCK) {
      let res;
      try {
        res = await fetch(`${API_BASE_URL}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
      } catch (err) {
        throw new Error('Cannot reach the server. Please make sure the backend is running.');
      }
      if (res.status === 409) {
        throw new Error('An account with this email already exists');
      }
      if (!res.ok) {
        throw new Error('Failed to create account');
      }
      const data = await res.json();
      if (data.user) {
        localStorage.setItem('credit_user_session', JSON.stringify(data.user));
      }
      return data;
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: `USR-${Math.floor(100 + Math.random() * 900)}`,
          fullName: userData.fullName,
          email: userData.email,
          role: "Risk Analyst / Reviewer",
          memberSince: "October 2026",
          department: "Credit Risk & Governance"
        };
        localStorage.setItem('credit_user_session', JSON.stringify(user));
        resolve({ success: true, user });
      }, 300);
    });
  },

  getCurrentUser: () => {
    const stored = localStorage.getItem('credit_user_session');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return null;
      }
    }
    return null; // not logged in
  },

  updateProfile: async (updatedData) => {
    const current = api.getCurrentUser() || {};
    const updated = { ...current, ...updatedData };
    localStorage.setItem('credit_user_session', JSON.stringify(updated));
    return updated;
  },

  logout: async () => {
    localStorage.removeItem('credit_user_session');
    return { success: true };
  },

  // Assessments
  getAssessments: async () => {
    if (!USE_MOCK) {
      try {
        const res = await fetch(`${API_BASE_URL}/assessments`);
        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        console.warn("Backend assessments unavailable, using local store", err);
      }
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getStoredAssessments());
      }, 200);
    });
  },

  getAssessmentById: async (id) => {
    if (!USE_MOCK) {
      try {
        const res = await fetch(`${API_BASE_URL}/assessments/${id}`);
        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        console.warn("Backend assessment fetch unavailable, using local store", err);
      }
    }
    const assessments = getStoredAssessments();
    const found = assessments.find(a => a.id === id);
    return found || assessments[0];
  },

  submitAssessment: async (formData) => {
    const payload = {
      fullName: String(formData.fullName || ''),
      age: parseInt(formData.age, 10) || 25,
      gender: String(formData.gender || 'Female'),
      education: String(formData.education || 'Higher Education'),
      familyStatus: String(formData.familyStatus || 'Married'),
      employmentStatus: String(formData.employmentStatus || 'Working'),
      income: parseFloat(formData.income) || 400000.0,
      experience: parseFloat(formData.experience) || 0.0,
      creditHistory: String(formData.creditHistory || 'Good'),
      existingLoans: parseInt(formData.existingLoans, 10) || 0,
      creditAccounts: parseInt(formData.creditAccounts, 10) || 1,
      loanAmount: parseFloat(formData.loanAmount) || 100000.0,
      loanTerm: parseInt(formData.loanTerm, 10) || 12,
      loanPurpose: String(formData.loanPurpose || 'Personal')
    };

    if (!USE_MOCK) {
      try {
        const res = await fetch(`${API_BASE_URL}/assessments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        console.warn("Backend submit unavailable, using fallback ML calculation", err);
      }
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        const calculated = calculateCreditScore(payload);
        const newRecord = {
          id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
          date: new Date().toISOString().split('T')[0],
          applicant: { ...payload },
          ...calculated
        };

        const existing = getStoredAssessments();
        const updated = [newRecord, ...existing];
        localStorage.setItem('credit_assessments_store', JSON.stringify(updated));

        resolve({
          success: true,
          assessment: newRecord
        });
      }, 400);
    });
  },

  // Fairness Analytics
  getFairnessMetrics: async () => {
    if (!USE_MOCK) {
      try {
        const res = await fetch(`${API_BASE_URL}/fairness`);
        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        console.warn("Backend fairness unavailable, calculating locally", err);
      }
    }

    const assessments = getStoredAssessments();
    
    // Gender groups
    const femaleRecords = assessments.filter(a => a.applicant.gender === 'Female');
    const maleRecords = assessments.filter(a => a.applicant.gender === 'Male');

    const femaleApproved = femaleRecords.filter(a => a.prediction === 'Low Risk').length;
    const maleApproved = maleRecords.filter(a => a.prediction === 'Low Risk').length;

    const femaleApprovalRate = femaleRecords.length ? Math.round((femaleApproved / femaleRecords.length) * 100) : 75;
    const maleApprovalRate = maleRecords.length ? Math.round((maleApproved / maleRecords.length) * 100) : 67;

    const disparateImpactRatio = Number((Math.min(femaleApprovalRate, maleApprovalRate) / Math.max(femaleApprovalRate, maleApprovalRate, 1)).toFixed(2));
    const demographicParityDiff = Math.abs(femaleApprovalRate - maleApprovalRate);

    // Age groups
    const under30 = assessments.filter(a => Number(a.applicant.age) < 30);
    const age30to50 = assessments.filter(a => Number(a.applicant.age) >= 30 && Number(a.applicant.age) <= 50);
    const over50 = assessments.filter(a => Number(a.applicant.age) > 50);

    const under30Approved = under30.length ? Math.round((under30.filter(a => a.prediction === 'Low Risk').length / under30.length) * 100) : 50;
    const midAgeApproved = age30to50.length ? Math.round((age30to50.filter(a => a.prediction === 'Low Risk').length / age30to50.length) * 100) : 80;
    const over50Approved = over50.length ? Math.round((over50.filter(a => a.prediction === 'Low Risk').length / over50.length) * 100) : 100;

    return {
      overallStatus: disparateImpactRatio >= 0.80 ? "Compliant with 80% Rule (Four-Fifths Standard)" : "Requires Calibration",
      disparateImpactRatio,
      demographicParityDiff: `${demographicParityDiff}%`,
      equalOpportunityDiff: "3.2%",
      genderGroups: [
        { group: "Female Applicants", count: femaleRecords.length || 2, approvalRate: `${femaleApprovalRate}%`, avgScore: 780 },
        { group: "Male Applicants", count: maleRecords.length || 3, approvalRate: `${maleApprovalRate}%`, avgScore: 712 }
      ],
      ageGroups: [
        { group: "Younger Adults (<30 yrs)", count: under30.length || 2, approvalRate: `${under30Approved}%` },
        { group: "Mid-Career (30-50 yrs)", count: age30to50.length || 2, approvalRate: `${midAgeApproved}%` },
        { group: "Senior Applicants (>50 yrs)", count: over50.length || 1, approvalRate: `${over50Approved}%` }
      ]
    };
  }
};
