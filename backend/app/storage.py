"""
Persistent JSON Storage for Assessments and Users
Keeps capstone demo data intact across server restarts.
"""

import hmac
import json
import os
from typing import List, Dict, Any, Optional

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
ASSESSMENTS_FILE = os.path.join(DATA_DIR, "assessments.json")
USERS_FILE = os.path.join(DATA_DIR, "users.json")

INITIAL_ASSESSMENTS = [
    {
        "id": "APP-4821",
        "date": "2026-09-18",
        "applicant": {
            "fullName": "Priya Sharma",
            "age": 32,
            "gender": "Female",
            "education": "Higher Education",
            "familyStatus": "Married",
            "employmentStatus": "Commercial Associate",
            "income": 850000.0,
            "experience": 6.0,
            "creditHistory": "Good",
            "existingLoans": 1,
            "creditAccounts": 3,
            "loanAmount": 350000.0,
            "loanTerm": 24,
            "loanPurpose": "Home Renovation"
        },
        "riskScore": 785,
        "prediction": "Low Risk",
        "defaultProbability": 0.08,
        "status": "Approved",
        "factors": [
            { "name": "Stable Income & Low Debt Ratio", "impact": 88, "type": "positive", "description": "Annual income well exceeds monthly obligations." },
            { "name": "Established Good Credit Track", "impact": 82, "type": "positive", "description": "Consistently on-time repayments on existing credit." },
            { "name": "Continuous Employment Experience", "impact": 74, "type": "positive", "description": "6+ years in stable commercial associate role." },
            { "name": "Conservative Loan-to-Income", "impact": 65, "type": "positive", "description": "24-month term presents minimal horizon risk." }
        ],
        "riskIncreasingFactors": [
            { "name": "Multiple Active Loan Liabilities", "impact": 25, "type": "risk", "description": "1 active credit facility currently open." }
        ]
    },
    {
        "id": "APP-4822",
        "date": "2026-09-19",
        "applicant": {
            "fullName": "Rahul Verma",
            "age": 24,
            "gender": "Male",
            "education": "Secondary",
            "familyStatus": "Single",
            "employmentStatus": "Working",
            "income": 380000.0,
            "experience": 1.5,
            "creditHistory": "Fair",
            "existingLoans": 3,
            "creditAccounts": 4,
            "loanAmount": 600000.0,
            "loanTerm": 36,
            "loanPurpose": "Vehicle"
        },
        "riskScore": 540,
        "prediction": "High Risk",
        "defaultProbability": 0.42,
        "status": "Review Required",
        "factors": [
            { "name": "Standard Demographic Profile", "impact": 52, "type": "positive", "description": "Applicant currently has active income stream." }
        ],
        "riskIncreasingFactors": [
            { "name": "High Loan-to-Income Ratio", "impact": 85, "type": "risk", "description": "Loan amount exceeds 1.5x annual income." },
            { "name": "Multiple Active Loan Liabilities", "impact": 78, "type": "risk", "description": "3 concurrent existing loans increase debt burden." },
            { "name": "Limited Work Experience", "impact": 68, "type": "risk", "description": "Under 2 years at current organization." },
            { "name": "Suboptimal Credit History", "impact": 60, "type": "risk", "description": "Past late payment instances detected in records." }
        ]
    },
    {
        "id": "APP-4823",
        "date": "2026-09-20",
        "applicant": {
            "fullName": "Ananya Deshmukh",
            "age": 41,
            "gender": "Female",
            "education": "Academic Degree",
            "familyStatus": "Married",
            "employmentStatus": "State Servant",
            "income": 1200000.0,
            "experience": 12.0,
            "creditHistory": "Good",
            "existingLoans": 0,
            "creditAccounts": 2,
            "loanAmount": 500000.0,
            "loanTerm": 12,
            "loanPurpose": "Education"
        },
        "riskScore": 820,
        "prediction": "Low Risk",
        "defaultProbability": 0.04,
        "status": "Approved",
        "factors": [
            { "name": "Zero Existing Active Debt", "impact": 92, "type": "positive", "description": "No current active liabilities or open lines." },
            { "name": "Stable Employment Tenure", "impact": 89, "type": "positive", "description": "High stability in public administration service." },
            { "name": "Conservative Loan-to-Income", "impact": 85, "type": "positive", "description": "Loan size easily covered by disposable cashflow." },
            { "name": "Established Good Credit Track", "impact": 80, "type": "positive", "description": "History of zero 30+ day delinquencies." }
        ],
        "riskIncreasingFactors": [
            { "name": "Macroeconomic Sensitivity", "impact": 15, "type": "risk", "description": "Standard baseline sensitivity." }
        ]
    },
    {
        "id": "APP-4824",
        "date": "2026-09-20",
        "applicant": {
            "fullName": "Karthik Nair",
            "age": 29,
            "gender": "Male",
            "education": "Higher Education",
            "familyStatus": "Single",
            "employmentStatus": "Working",
            "income": 720000.0,
            "experience": 4.5,
            "creditHistory": "Good",
            "existingLoans": 1,
            "creditAccounts": 3,
            "loanAmount": 280000.0,
            "loanTerm": 24,
            "loanPurpose": "Personal"
        },
        "riskScore": 720,
        "prediction": "Low Risk",
        "defaultProbability": 0.12,
        "status": "Approved",
        "factors": [
            { "name": "Stable Employment Tenure", "impact": 72, "type": "positive", "description": "4.5 years of continuous employment indicates reliable earnings." },
            { "name": "Established Good Credit Track", "impact": 80, "type": "positive", "description": "Good repayment track record without defaults." },
            { "name": "Conservative Loan-to-Income", "impact": 75, "type": "positive", "description": "Loan is modest relative to annual income." }
        ],
        "riskIncreasingFactors": [
            { "name": "Multiple Active Loan Liabilities", "impact": 20, "type": "risk", "description": "1 active installment loan open." }
        ]
    },
    {
        "id": "APP-4825",
        "date": "2026-09-21",
        "applicant": {
            "fullName": "Siddharth Mehta",
            "age": 52,
            "gender": "Male",
            "education": "Higher Education",
            "familyStatus": "Married",
            "employmentStatus": "Commercial Associate",
            "income": 1600000.0,
            "experience": 18.0,
            "creditHistory": "Good",
            "existingLoans": 1,
            "creditAccounts": 5,
            "loanAmount": 750000.0,
            "loanTerm": 36,
            "loanPurpose": "Business"
        },
        "riskScore": 760,
        "prediction": "Low Risk",
        "defaultProbability": 0.09,
        "status": "Approved",
        "factors": [
            { "name": "High Income Capacity", "impact": 86, "type": "positive", "description": "Top quartile earnings in peer applicant pool." },
            { "name": "Stable Employment Tenure", "impact": 84, "type": "positive", "description": "18 years of continuous verified experience." },
            { "name": "Established Good Credit Track", "impact": 75, "type": "positive", "description": "Consistent credit accounts maintenance." }
        ],
        "riskIncreasingFactors": [
            { "name": "Multiple Active Loan Liabilities", "impact": 35, "type": "risk", "description": "5 credit lines active simultaneously." }
        ]
    },
    {
        "id": "APP-4826",
        "date": "2026-09-21",
        "applicant": {
            "fullName": "Meera Sen",
            "age": 26,
            "gender": "Female",
            "education": "Secondary",
            "familyStatus": "Single",
            "employmentStatus": "Working",
            "income": 410000.0,
            "experience": 2.0,
            "creditHistory": "Fair",
            "existingLoans": 2,
            "creditAccounts": 3,
            "loanAmount": 380000.0,
            "loanTerm": 36,
            "loanPurpose": "Personal"
        },
        "riskScore": 615,
        "prediction": "Medium Risk",
        "defaultProbability": 0.24,
        "status": "Manual Review",
        "factors": [
            { "name": "Active Employment", "impact": 55, "type": "positive", "description": "Active salary stream meets minimum threshold." }
        ],
        "riskIncreasingFactors": [
            { "name": "Suboptimal Credit History", "impact": 58, "type": "risk", "description": "Isolated late payment observed in credit bureau records." },
            { "name": "Multiple Active Loan Liabilities", "impact": 50, "type": "risk", "description": "2 existing loan accounts." }
        ]
    }
]

INITIAL_USERS = [
    {
        "id": "USR-101",
        "fullName": "Aditya Sharma",
        "email": "aditya.sharma@example.com",
        "password": "password123",
        "role": "Risk Analyst / Capstone Reviewer",
        "memberSince": "July 2025",
        "department": "Credit Analytics & Governance"
    }
]

def ensure_data_files():
    os.makedirs(DATA_DIR, exist_ok=True)
    if not os.path.exists(ASSESSMENTS_FILE):
        with open(ASSESSMENTS_FILE, "w", encoding="utf-8") as f:
            json.dump(INITIAL_ASSESSMENTS, f, indent=2)
    if not os.path.exists(USERS_FILE):
        with open(USERS_FILE, "w", encoding="utf-8") as f:
            json.dump(INITIAL_USERS, f, indent=2)

def load_assessments() -> List[Dict[str, Any]]:
    ensure_data_files()
    try:
        with open(ASSESSMENTS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return INITIAL_ASSESSMENTS

def save_assessment(assessment_data: Dict[str, Any]) -> Dict[str, Any]:
    ensure_data_files()
    assessments = load_assessments()
    assessments.insert(0, assessment_data)
    with open(ASSESSMENTS_FILE, "w", encoding="utf-8") as f:
        json.dump(assessments, f, indent=2)
    return assessment_data

def get_assessment_by_id(assessment_id: str) -> Optional[Dict[str, Any]]:
    assessments = load_assessments()
    for a in assessments:
        if a.get("id") == assessment_id:
            return a
    return assessments[0] if assessments else None

def load_users() -> List[Dict[str, Any]]:
    ensure_data_files()
    try:
        with open(USERS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return INITIAL_USERS

def _public_user(u: Dict[str, Any]) -> Dict[str, Any]:
    """Return user profile WITHOUT the password."""
    return {
        "id": u["id"],
        "fullName": u["fullName"],
        "email": u["email"],
        "role": u.get("role", "Risk Analyst / Reviewer"),
        "memberSince": u.get("memberSince", "July 2025"),
        "department": u.get("department", "Credit Risk & Governance")
    }

def authenticate_user(email: str, password: str) -> Optional[Dict[str, Any]]:
    """Return the user only if the email exists AND the password matches."""
    email = (email or "").strip().lower()
    for u in load_users():
        if u.get("email", "").strip().lower() == email:
            if hmac.compare_digest(str(u.get("password", "")), str(password or "")):
                return _public_user(u)
            return None  # wrong password
    return None  # unknown email

class UserExistsError(Exception):
    pass

def create_user(full_name: str, email: str, password: str) -> Dict[str, Any]:
    users = load_users()
    clean_email = (email or "").strip()
    for u in users:
        if u.get("email", "").strip().lower() == clean_email.lower():
            raise UserExistsError("An account with this email already exists")
    new_user = {
        "id": f"USR-{len(users) + 101}",
        "fullName": full_name,
        "email": clean_email,
        "password": password,
        "role": "Risk Analyst / Reviewer",
        "memberSince": "October 2026",
        "department": "Credit Risk & Governance"
    }
    users.append(new_user)
    with open(USERS_FILE, "w", encoding="utf-8") as f:
        json.dump(users, f, indent=2)
    return _public_user(new_user)
