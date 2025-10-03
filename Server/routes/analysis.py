from fastapi import APIRouter
from models.schemas import CodeRequest, AnalysisResponse
from services.analyzer import analyze_code

# Create the router
router = APIRouter()

@router.post("/analyze", response_model=AnalysisResponse)
def analyze(request: CodeRequest):
    results, trace, execution_time, rules_applied = analyze_code(request.code)
    return {
        "results": results,
        "trace": trace,
        "execution_time": execution_time,
        "rules_applied": rules_applied
    }
