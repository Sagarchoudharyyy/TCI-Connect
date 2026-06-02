from fastapi import FastAPI
from app.database.database import engine,Base
from app.models.user_model import User
from app.api.doctor import router as doctor_router
from app.models.case_model import Case
from app.api import chat
from app.api.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from app.api.case import router as case_router
from app.models.case_file_model import CaseFile
from fastapi.staticfiles import StaticFiles
from app.models.pricing_model import Pricing
from app.api.pricing import router as pricing_router
from app.models.blacklist_model import Blacklist
from app.models.category_model import Category
from app.api.category_route import router as category_router
from app.models.material_model import Material
from app.api.material_route import router as material_router


app = FastAPI(
    title="TCI Connect API",
    description="Dental Lab Management System",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)
app.include_router(auth_router)
app.include_router(doctor_router)
app.include_router(case_router)
app.include_router(chat.router)
app.include_router(pricing_router)
app.include_router(category_router)
app.include_router(material_router)


app.include_router(
    case_router,
    prefix="/api",
    tags=["Cases"]
)
app.mount(
    "/uploads",
    StaticFiles(
        directory="uploads"
    ),
    name="uploads"
)

@app.get("/")
def home():
    return {"message": "TCI Backend Running"}

