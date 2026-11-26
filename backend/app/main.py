"""
Credit-Risk Scorecard API
FastAPI Backend implementation for College Capstone Project DSCI-14.
"""

from datetime import date
import random
from typing import List, Dict, Any

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from app.models.schemas import (
    ApplicantData,
    Assessment,
    AssessmentCreateResponse,
    LoginRequest,
    SignupRequest,
    AuthResponse,
    FairnessMetricsResponse
)
from app.ml.scorecard import evaluate_applicant
from app.ml.explainability import generate_reason_codes
from app.ml.fairness import compute_fairness_audit
from app.storage import (
    load_assessments,
    save_assessment,
    get_assessment_by_id,
    authenticate_user,
    create_user,
    UserExistsError
)

app = FastAPI(
    title="Credit-Risk Scorecard with Explainability and Fairness API",
    description="Backend API for B.Tech Capstone Project (KL Capstone Framework DSCI-14)",
    version="1.0.0"
)

# Configure Cross-Origin Resource Sharing (CORS) for React frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "service": "Credit-Risk Scorecard ML Backend",
        "version": "1.0.0",
        "benchmark": "Home Credit Default Risk (DSCI-14)",
        "capabilities": [
            "Calibrated Logistic / WOE Scorecard (300-850)",
            "Explainability Attribution & Adverse Action Reason Codes",
            "Demographic Parity & Disparate Impact Audit (EEOC 80% Rule)"
        ]
    }

# -----------------------------------------------------------------------------
# AUTHENTICATION ENDPOINTS
# -----------------------------------------------------------------------------
@app.post("/api/auth/login", response_model=AuthResponse)
def login(payload: LoginRequest):
    user = authenticate_user(payload.email, payload.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    return {"success": True, "user": user}

@app.post("/api/auth/signup", response_model=AuthResponse)
def signup(payload: SignupRequest):
    try:
        user = create_user(payload.fullName, payload.email, payload.password)
    except UserExistsError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))
    return {"success": True, "user": user}

# -----------------------------------------------------------------------------
# ASSESSMENT & SCORECARD ENDPOINTS
# -----------------------------------------------------------------------------
@app.get("/api/assessments", response_model=List[Assessment])
def get_all_assessments():
    return load_assessments()

@app.get("/api/assessments/{assessment_id}", response_model=Assessment)
def get_single_assessment(assessment_id: str):
    record = get_assessment_by_id(assessment_id)
    if not record:
        raise HTTPException(status_code=404, detail="Assessment record not found")
    return record

@app.post("/api/assessments", response_model=AssessmentCreateResponse)
def create_assessment(applicant: ApplicantData):
    applicant_dict = applicant.model_dump()

    # 1. Run calibrated scorecard ML evaluation
    eval_result = evaluate_applicant(applicant_dict)

    # 2. Extract additive reason codes (explainability)
    reason_codes = generate_reason_codes(applicant_dict, eval_result["contributions"])

    # 3. Construct persistent assessment record
    new_id = f"APP-{random.randint(1000, 9999)}"
    record = {
        "id": new_id,
        "date": date.today().isoformat(),
        "applicant": applicant_dict,
        "riskScore": eval_result["riskScore"],
        "prediction": eval_result["prediction"],
        "defaultProbability": eval_result["defaultProbability"],
        "status": eval_result["status"],
        "factors": reason_codes["factors"],
        "riskIncreasingFactors": reason_codes["riskIncreasingFactors"]
    }

    # 4. Save to persistent storage
    save_assessment(record)

    return {
        "success": True,
        "assessment": record
    }

# -----------------------------------------------------------------------------
# FAIRNESS AUDIT ENDPOINTS
# -----------------------------------------------------------------------------
@app.get("/api/fairness", response_model=FairnessMetricsResponse)
def get_fairness_metrics():
    assessments = load_assessments()
    metrics = compute_fairness_audit(assessments)
    return metrics
