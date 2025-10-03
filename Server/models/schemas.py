from pydantic import BaseModel
from typing import List

# Request model (from frontend to backend)
class CodeRequest(BaseModel):
    code: str

# Result model for each issue found
class AnalysisResult(BaseModel):
    line: int
    message: str
    priority: str
    category: str

# Trace model for inference steps
class TraceStep(BaseModel):
    step: int
    rule: str
    action: str
    result: str

# Full response model
class AnalysisResponse(BaseModel):
    results: List[AnalysisResult]
    trace: List[TraceStep]
    execution_time: str
    rules_applied: int
