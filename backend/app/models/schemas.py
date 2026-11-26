from typing import List, Optional, Any, Dict
from pydantic import BaseModel, Field

class ApplicantData(BaseModel):
    fullName: str
    age: int = Field(..., ge=18, le=100)
    gender: str
    education: str
    familyStatus: str
    employmentStatus: str
    income: float = Field(..., gt=0)
    experience: float = Field(..., ge=0)
    creditHistory: str
    existingLoans: int = Field(..., ge=0)
    creditAccounts: int = Field(..., ge=0)
    loanAmount: float = Field(..., gt=0)
    loanTerm: int = Field(..., gt=0)
    loanPurpose: str

class FactorItem(BaseModel):
    name: str
    impact: int
    type: str  # "positive" or "risk"
    description: str

class Assessment(BaseModel):
    id: str
    date: str
    applicant: ApplicantData
    riskScore: int
    prediction: str
    defaultProbability: float
    status: str
    factors: List[FactorItem] = []
    riskIncreasingFactors: List[FactorItem] = []

class AssessmentCreateResponse(BaseModel):
    success: bool
    assessment: Assessment

class LoginRequest(BaseModel):
    email: str
    password: str

class SignupRequest(BaseModel):
    fullName: str
    email: str
    password: str

class UserProfile(BaseModel):
    id: str
    fullName: str
    email: str
    role: str
    memberSince: str
    department: str

class AuthResponse(BaseModel):
    success: bool
    user: UserProfile

class DemographicGroupStat(BaseModel):
    group: str
    count: int
    approvalRate: str
    avgScore: Optional[int] = None

class FairnessMetricsResponse(BaseModel):
    overallStatus: str
    disparateImpactRatio: float
    demographicParityDiff: str
    equalOpportunityDiff: str
    genderGroups: List[DemographicGroupStat]
    ageGroups: List[DemographicGroupStat]
