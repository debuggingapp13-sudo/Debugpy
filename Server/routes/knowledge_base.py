from fastapi import APIRouter
from services.knowledge_base_service import get_all_facts, get_all_rules

router = APIRouter()

@router.get("/facts")
async def get_facts():
    return await get_all_facts()

@router.get("/rules")
async def get_rules():
    return await get_all_rules()
