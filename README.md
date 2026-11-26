# Credit-Risk Scorecard with Explainability and Fairness

### B.Tech College Capstone Project — Full-Stack Application
**Capstone Track:** Data Science & Big Data Analytics / FinTech AI  
**Benchmark Reference:** Home Credit Default Risk Public Dataset (KL Capstone Framework DSCI-14)  
**Palette:** Deep Navy Blue (`#12355B`), Soft Blue (`#EAF2F8`), Teal Accent (`#159A9C`)  
**Stack:** React 18 + Vite (Frontend) & Python 3.14 + FastAPI + Scikit-Learn (Backend)

---

## 📌 Project Overview
Lending decisions must be accurate, explainable, and fair. This application provides an integrated full-stack system that:
1. **Predicts Credit Risk:** Implements an interpretable Logistic Regression and Weight-of-Evidence (WOE) scorecard that calculates calibrated credit scores (300–850) and estimated default probabilities.
2. **Explains Predictions:** Decomposes predictions into granular positive factors (risk-decreasing) and risk-increasing factors (adverse action reason codes under FCRA/ECOA regulations).
3. **Audits Fairness:** Evaluates disparate impact across demographic segments (gender and age cohorts) to enforce the EEOC 80% Four-Fifths rule and ensure non-discriminatory lending.

---

## 🚀 How to Run in VS Code

### Step 1: Start the Python ML Backend
Open a terminal in VS Code (`Ctrl + ~`) in the project root directory and run:

```bash
python run_backend.py
```

* Backend server will start at: **`http://localhost:5000`**
* Interactive Swagger API documentation: **`http://localhost:5000/docs`**

*(If needed, install backend dependencies first: `pip install -r backend/requirements.txt`)*

---

### Step 2: Start the React Frontend
Open a **second terminal** in VS Code (click the `+` button in the terminal panel) and run:

```bash
npm install
npm run dev
```

* Frontend application will open at: **`http://localhost:3000`** (or `http://localhost:5173`)

---

## 🏗️ Project Architecture

```
credit-risk-scorecard/
├── backend/
│   ├── app/
│   │   ├── main.py               # FastAPI application, CORS middleware, and API routes
│   │   ├── storage.py            # JSON-based persistent storage for assessments & users
│   │   ├── models/
│   │   │   └── schemas.py        # Pydantic schemas for request/response validation
│   │   ├── ml/
│   │   │   ├── scorecard.py      # Calibrated Logistic / WOE Scorecard (300-850 scale)
│   │   │   ├── explainability.py # Feature attribution & adverse action reason codes
│   │   │   └── fairness.py       # Demographic parity & EEOC 80% Four-Fifths audit
│   │   └── data/
│   │       ├── assessments.json  # Persistent applicant evaluation records
│   │       └── users.json        # Analyst user accounts
│   ├── run_backend.py            # Backend runner script
│   └── requirements.txt          # Python dependencies
├── src/
│   ├── components/               # Reusable UI components (Navbar, Footer, RiskScoreCard, etc.)
│   ├── context/                  # AuthContext & AssessmentContext for React state management
│   ├── pages/                    # 9 full-featured application pages
│   ├── services/
│   │   └── api.js                # Integrated API service connected to http://127.0.0.1:5000/api
│   └── styles/                   # Modern CSS styling with project color tokens
├── run_backend.py                # 1-click launcher in root folder
├── package.json
└── README.md
```

---

## 🧭 Page Map & Frontend Features

| Page | URL Path | Key Capabilities |
| :--- | :--- | :--- |
| **Home** | `/` | Hero section, core feature cards, 4-step "How It Works" workflow, and benchmark metrics. |
| **Login** | `/login` | Centered card, validation, password recovery, and 1-click "Auto-fill demo analyst account". |
| **Sign Up** | `/signup` | Registration form with real-time password matching validation. |
| **Dashboard** | `/dashboard` | 4 KPI summary cards (Total, Low, Medium, High Risk), `+ New Risk Assessment`, and recent applicants table. |
| **Risk Assessment** | `/assessment` | Clean 4-module appraisal form (Personal, Employment, Credit History, Loan Details) with instant sample pre-fill buttons. |
| **Risk Result** | `/result/:id` | Circular score meter (300-850), risk classification badge, default probability, and top 4 factor bars. |
| **Explainability** | `/explainability` | Interactive "Why was this prediction made?" dashboard with positive vs. risk-increasing factor breakdowns. |
| **Fairness Analysis** | `/fairness` | Audit dashboard displaying Disparate Impact Ratio, Demographic Parity Difference, and demographic group charts. |
| **Profile** | `/profile` | User profile avatar, role badge, session metadata, editable information, and secure logout. |

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check & model capability metadata |
| `POST` | `/api/auth/login` | Authenticate analyst user |
| `POST` | `/api/auth/signup` | Register new analyst account |
| `GET` | `/api/assessments` | Retrieve all historical credit assessments |
| `GET` | `/api/assessments/{id}` | Retrieve single assessment record by ID |
| `POST` | `/api/assessments` | Submit applicant details $\rightarrow$ run ML scorecard $\rightarrow$ return score & reason codes |
| `GET` | `/api/fairness` | Compute live Disparate Impact Ratio & Demographic Parity |

---

## 🎓 Capstone Viva Presentation Guide

1. **Interpretability (Objective O3):**  
   Explain that the model uses additive log-odds decomposition:
   $$\text{Score} = \text{Offset} + \text{Factor} \times \sum_{i} w_i \cdot x_i$$
   Every point change is directly attributed to specific financial behaviors (e.g. debt-to-income ratio, tenure), fulfilling regulatory adverse action requirements under the Equal Credit Opportunity Act (ECOA).

2. **Fairness Audit (Objective O4):**  
   Explain that the system monitors the **Disparate Impact Ratio**:
   $$\text{DIR} = \frac{\min(\text{Approval Rate}_{\text{Protected}}, \text{Approval Rate}_{\text{Unconstrained}})}{\max(\text{Approval Rate}_{\text{Protected}}, \text{Approval Rate}_{\text{Unconstrained}})}$$
   A DIR $\ge 0.80$ demonstrates that the automated lending process is legally compliant with the EEOC Four-Fifths benchmark.
