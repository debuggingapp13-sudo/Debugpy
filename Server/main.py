from fastapi import FastAPI
from routes import analysis, sessions, knowledge_base, dashboard
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Python Debugger API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://pythondebugger.netlify.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# register routes
app.include_router(analysis.router, prefix="/api", tags=["Analysis"])
app.include_router(sessions.router, prefix="/api", tags=["Sessions"])
app.include_router(knowledge_base.router, prefix="/api", tags=["Knowledge Base"])
app.include_router(dashboard.router, prefix="/api", tags=["Dashboard"])

@app.get("/")
def root():
    return {"message": "Backend running successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)