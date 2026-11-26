"""
Interpretable Credit-Risk Scorecard Engine
Based on the Home Credit Default Risk benchmark / KL Capstone Framework DSCI-14.
Implements Logistic Regression log-odds scoring calibrated to standard credit bureau scaling (300-850).
"""

import math
from typing import Dict, Any, Tuple

# Credit Scoring Calibration Parameters
# Base Score = 600 at 20:1 Odds (P(Repay) / P(Default) = 20)
# PDO (Points to Double Odds) = 20
BASE_SCORE = 600.0
BASE_ODDS = 20.0
PDO = 20.0

FACTOR = PDO / math.log(2)  # ~ 28.8539
OFFSET = BASE_SCORE - FACTOR * math.log(BASE_ODDS)  # ~ 513.56

def compute_feature_log_odds(applicant: Dict[str, Any]) -> Tuple[float, Dict[str, float]]:
    """
    Computes total log-odds of repayment vs default, and individual feature contributions.
    Positive log-odds = higher probability of repayment (higher score).
    Negative log-odds = higher probability of default (lower score).
    """
    contributions = {}
    
    # 1. Base log-odds intercept (median population baseline)
    intercept = 2.9957  # ln(20) ~ 20:1 odds
    contributions["baseline"] = intercept

    # 2. Credit History (Weight ~ 25%)
    history = applicant.get("creditHistory", "No History")
    if history == "Good":
        hist_val = 0.95
    elif history == "Fair":
        hist_val = 0.10
    elif history == "Poor":
        hist_val = -1.25
    else:
        hist_val = 0.0
    contributions["credit_history"] = hist_val

    # 3. Debt-to-Income / Leverage Ratio (Weight ~ 30%)
    income = float(applicant.get("income", 400000.0))
    loan_amount = float(applicant.get("loanAmount", 200000.0))
    lti = loan_amount / max(income, 1.0)
    
    if lti < 0.3:
        lti_val = 0.70
    elif lti < 0.6:
        lti_val = 0.35
    elif lti < 1.0:
        lti_val = -0.20
    elif lti < 1.5:
        lti_val = -0.75
    else:
        lti_val = -1.15
    contributions["loan_to_income"] = lti_val

    # 4. Employment Stability (Weight ~ 20%)
    exp = float(applicant.get("experience", 0.0))
    if exp >= 10:
        exp_val = 0.55
    elif exp >= 5:
        exp_val = 0.35
    elif exp >= 2:
        exp_val = 0.15
    elif exp >= 1:
        exp_val = -0.10
    else:
        exp_val = -0.45
    contributions["employment_experience"] = exp_val

    # 5. Existing Liabilities & Open Facilities (Weight ~ 15%)
    existing_loans = int(applicant.get("existingLoans", 0))
    if existing_loans == 0:
        loan_val = 0.40
    elif existing_loans == 1:
        loan_val = 0.15
    elif existing_loans == 2:
        loan_val = -0.20
    else:
        loan_val = -0.65
    contributions["existing_loans"] = loan_val

    # 6. Age & Education Stability (Weight ~ 10%)
    age = int(applicant.get("age", 25))
    if 30 <= age <= 60:
        age_val = 0.25
    elif age > 60:
        age_val = 0.10
    else:
        age_val = -0.15
    contributions["age_stability"] = age_val

    education = applicant.get("education", "Secondary")
    if education in ["Academic Degree", "Higher Education"]:
        edu_val = 0.20
    else:
        edu_val = 0.0
    contributions["education"] = edu_val

    total_log_odds = sum(contributions.values())
    return total_log_odds, contributions

def evaluate_applicant(applicant: Dict[str, Any]) -> Dict[str, Any]:
    """
    Evaluates an applicant through the calibrated Logistic Scorecard.
    Returns credit score (300-850), default probability, prediction, and status.
    """
    total_log_odds, contributions = compute_feature_log_odds(applicant)

    # Calibrate to FICO/CIBIL 300 - 850 score points
    raw_score = OFFSET + FACTOR * total_log_odds
    final_score = int(round(min(850, max(300, raw_score))))

    # Default Probability calculation via Logistic Sigmoid:
    # P(Default) = 1 / (1 + exp(log_odds_repay))
    # Note: if log_odds_repay is high, P(Default) is near 0.
    prob_default = 1.0 / (1.0 + math.exp(min(15.0, max(-15.0, total_log_odds))))
    prob_default = round(float(prob_default), 2)

    # Calibrate risk classification
    if final_score >= 700:
        prediction = "Low Risk"
        status = "Approved"
    elif final_score < 580:
        prediction = "High Risk"
        status = "Review Required"
    else:
        prediction = "Medium Risk"
        status = "Manual Review"

    return {
        "riskScore": final_score,
        "prediction": prediction,
        "defaultProbability": prob_default,
        "status": status,
        "contributions": contributions
    }
