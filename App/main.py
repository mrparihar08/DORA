from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
from pydantic import BaseModel, EmailStr
import jwt, os
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from typing import List
import os
import pickle
import logging

# -------------------------------------------------
# Logging
# -------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger(__name__)

# -------------------------------------------------
# Initialize App
# -------------------------------------------------
app = FastAPI(
    title="Disease Prediction API",
    description="Predict diseases from symptoms using ML",
    version="1.0.0"
)
# ============================================================
# CONFIG & DATABASE SETUP
# ============================================================
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY", "fallback-dev-secret")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'zaki.db')}"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()

pwd_context = CryptContext(schemes=["pbkdf2_sha256", "scrypt"], deprecated="auto")



# CORS
origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # Allow all origins for dev (or replace with your frontend URL)
    allow_credentials=True,
    allow_methods=["*"],       # Allow all methods (POST, GET, OPTIONS, etc.)
    allow_headers=["*"],       # Allow all headers
)


# -------------------------------------------------
# Load Models
# -------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def load_pickle(filename: str):
    path = os.path.join(BASE_DIR, filename)
    if not os.path.exists(path):
        logger.error(f"Missing model file: {filename}")
        raise FileNotFoundError(f"{filename} not found in {BASE_DIR}")
    with open(path, "rb") as f:
        logger.info(f"Loaded {filename}")
        return pickle.load(f)

try:
    model = load_pickle("disease_model.pkl")
    mlb = load_pickle("mlb.pkl")
    le = load_pickle("label_encoder.pkl")
except Exception as e:
    logger.exception("Failed to load models")
    raise e

# -------------------------------------------------
# Pydantic Schemas
# -------------------------------------------------
class Symptoms(BaseModel):
    symptoms: List[str] = Field()

# -------------------------------------------------
# Routes
# -------------------------------------------------
@app.get("/", tags=["Health Check"])
def home():
    """Check if API is running"""
    return {"message": "Disease Prediction API is up and running 🚀"}

@app.get("/symptoms", tags=["Metadata"])
def get_symptoms():
    """Get all possible symptoms for frontend dropdown"""
    return {"symptoms": mlb.classes_.tolist()}

@app.post("/predict", tags=["Prediction"])
def predict(data: Symptoms):
    try:
        logger.info(f"Received prediction request: {data.symptoms}")

        # Encode symptoms
        example_encoded = mlb.transform([data.symptoms])

        # Predict
        pred = model.predict(example_encoded)
        disease = le.inverse_transform(pred)[0]

        return {"predicted_disease": disease}

    except Exception as e:
        logger.exception("Prediction failed")
        raise HTTPException(status_code=500, detail=str(e))
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=int(os.getenv("PORT", 10000)), reload=True)
