from db.database import sessions_collection
from models.session_model import SessionModel

async def save_session(session: SessionModel):
    session_dict = session.model_dump(exclude_none=True)
    result = await sessions_collection.insert_one(session_dict)
    return str(result.inserted_id)

async def get_recent_sessions(anon_user_id: str, limit: int = 5):
    cursor = sessions_collection.find({"anon_user_id": anon_user_id}).sort("timestamp", -1).limit(limit)
    sessions = await cursor.to_list(length=limit)
    for s in sessions:
        s["_id"] = str(s["_id"])
    return sessions
