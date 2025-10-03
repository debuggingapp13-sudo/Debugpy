import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import certifi

load_dotenv()

MONGO_URL = os.getenv("MONGODB_URI")
client = AsyncIOMotorClient(MONGO_URL, tlsCAFile=certifi.where())

db = client["debugpy_db"]
sessions_collection = db["sessions"]