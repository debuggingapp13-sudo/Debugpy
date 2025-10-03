# from fastapi import APIRouter
# from db.database import sessions_collection

# router = APIRouter()

# @router.get("/stats")
# async def get_stats(anon_user_id: str):
#     total_sessions = await sessions_collection.count_documents({"anon_user_id": anon_user_id})
#     error_categories = len(await sessions_collection.distinct("results.category", {"anon_user_id": anon_user_id}))

#     total_rules = 45
#     total_facts = 12
#     error_categories = 5
#     total_sessions = await sessions_collection.count_documents({})

#     return {
#         "total_rules": total_rules,
#         "total_facts": total_facts,
#         "error_categories": error_categories,
#         "total_sessions": total_sessions
#     }

from fastapi import APIRouter
from db.database import sessions_collection

router = APIRouter()

@router.get("/stats")
async def get_stats(anon_user_id: str):
    # Filter everything by anon_user_id
    total_sessions = await sessions_collection.count_documents({"anon_user_id": anon_user_id})
    error_categories = len(await sessions_collection.distinct("results.category", {"anon_user_id": anon_user_id}))

    # If these are static values, keep them as is
    total_rules = 45
    total_facts = 12

    return {
        "total_rules": total_rules,
        "total_facts": total_facts,
        "error_categories": error_categories,
        "total_sessions": total_sessions  # Now correctly filtered
    }