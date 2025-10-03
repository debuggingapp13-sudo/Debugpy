from fastapi import APIRouter, HTTPException, Query
from models.session_model import SessionModel
from services.session_service import save_session, get_recent_sessions

router = APIRouter(tags=["Sessions"])

@router.post("/sessions")
async def create_session(session: SessionModel):
    # anon_user_id is already inside `session` — no need to pass separately
    session_id = await save_session(session)
    return {"inserted_id": session_id}

@router.get("/sessions")
async def recent_sessions(anon_user_id: str = Query(...)):
    sessions = await get_recent_sessions(anon_user_id)
    return sessions
