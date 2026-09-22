# Credit-Risk Scorecard with Explainability and Fairness

### B.Tech College Capstone Project — Frontend Portal
**Capstone Track:** Data Science & Big Data Analytics / FinTech AI  
**Benchmark Reference:** Home Credit Default Risk Public Dataset (KL Capstone Framework DSCI-14)  
**Palette:** Deep Navy Blue (`#12355B`), Soft Blue (`#EAF2F8`), Teal Accent (`#159A9C`)

---

## 📌 Project Overview
Lending decisions must be accurate, explainable, and fair. This application provides a modern, clean, and accessible frontend interface for a credit-risk scorecard system that:
1. **Predicts Risk:** Accurately calculates credit scores (300–850) and default probabilities across four core financial modules.
2. **Explains Decisions:** Produces human-readable reason codes (positive and risk-increasing factors) analogous to Weight of Evidence (WOE) and SHAP values.
3. **Guarantees Fairness:** Audits predictions across demographic slices (gender, age cohorts) to comply with the EEOC 80% Four-Fifths rule and demographic parity standards.

---

## 🚀 Quick Start Guide (VS Code)

### 1. Prerequisites
Ensure you have **Node.js** installed on your system (v18 or higher recommended). Check via terminal:
```bash
node -v
npm -v
```

### 2. Installation
Open the project directory in VS Code or your terminal:
```bash
cd credit-risk-scorecard
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to the local server URL (usually **`http://localhost:3000`** or **`http://localhost:5173`**).

### 4. Build for Production
```bash
npm run build
```

---

## 🧭 Page Map & Features

| Page | URL Path | Key Capabilities |
| :--- | :--- | :--- |
| **Home** | `/` | Hero section, core feature cards, 4-step "How It Works" workflow, and benchmark metrics. |
| **Login** | `/login` | Centered card, validation, password recovery, and 1-click "Auto-fill demo analyst account". |
| **Sign Up** | `/signup` | Registration form with instant password match validation. |
| **Dashboard** | `/dashboard` | 4 KPI summary cards (Total, Low, Medium, High Risk), `+ New Risk Assessment`, and recent applicants table. |
| **Risk Assessment** | `/assessment` | Clean 4-module appraisal form (Personal, Employment, Credit History, Loan Details) with instant sample pre-fill buttons. |
| **Risk Result** | `/result/:id` | Circular score meter (300-850), risk classification badge, default probability, and top 4 factor bars. |
| **Explainability** | `/explainability` | Interactive "Why was this prediction made?" dashboard with positive vs. risk-increasing factor breakdowns. |
| **Fairness Analysis** | `/fairness` | Audit dashboard displaying Disparate Impact Ratio, Demographic Parity Difference, and demographic group charts. |
| **Profile** | `/profile` | User profile avatar, role badge, session metadata, editable information, and secure logout. |

---

## 🔌 Backend Integration Guide

The application comes pre-equipped with an isolated **API Service Layer** located at `src/services/api.js`.

### How to Connect Your Python Backend:
1. Open `src/services/api.js`.
2. Set `USE_MOCK = false`.
3. Set your Python backend server URL:
   ```javascript
   export const USE_MOCK = false;
   export const API_BASE_URL = 'http://localhost:5000/api'; // or 8000 for FastAPI
   ```
4. Endpoints expected by the frontend:
   - `POST /api/auth/login`
   - `POST /api/auth/signup`
   - `GET /api/assessments`
   - `POST /api/assessments`
   - `GET /api/assessments/:id`
   - `GET /api/fairness`

When `USE_MOCK = true`, the application runs completely standalone using high-fidelity simulated credit scoring logic that mimics a Logistic Regression / WOE model.

---

## 🎓 Viva & Presentation Talking Points

1. **Why an interpretable scorecard?**  
   Under the Fair Credit Reporting Act (FCRA) and Equal Credit Opportunity Act (ECOA), automated lending algorithms cannot operate as opaque black boxes; every rejected applicant has the right to receive an adverse action notice listing the principal reasons.
2. **What is the Disparate Impact Ratio?**  
   It is calculated as:
   $$\text{Disparate Impact Ratio} = \frac{\text{Approval Rate}_{\text{Protected Group}}}{\text{Approval Rate}_{\text{Unconstrained Group}}}$$
   Values $\ge 0.80$ demonstrate compliance with the standard 80% Four-Fifths rule.
3. **What dataset was referenced?**  
   The **Home Credit Default Risk** benchmark, which evaluates repayment capacity for underbanked applicants.
