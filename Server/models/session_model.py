from pydantic import BaseModel
from typing import List, Optional

class Result(BaseModel):
    line: int
    message: str
    priority: str
    category: str

class SessionModel(BaseModel):
    id: Optional[str] = None
    code: str
    anon_user_id: str       
    results: List[Result]
    rules_applied: int
    execution_time: float
    timestamp: int
    anon_user_id: str
    user_type: Optional[str] = "anonymous"  # e.g., "anonymous", "registered"
