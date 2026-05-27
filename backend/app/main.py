from fastapi import FastAPI
from app.database.database import engine,Base
from app.models.user_model import User
from app.api.doctor import router as doctor_router
from app.models.case_model import Case
from app.api.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from app.api.case import router as case_router

app = FastAPI(
    title="TCI Connect API",
    description="Dental Lab Management System",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)
app.include_router(auth_router)
app.include_router(doctor_router)
app.include_router(case_router)

app.include_router(
    case_router,
    prefix="/api",
    tags=["Cases"]
)

@app.get("/")
def home():
    return {"message": "TCI Backend Running"}

