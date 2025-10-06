from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
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

# -------------------------------------------------
# CORS
# -------------------------------------------------
FRONTEND_ORIGINS = os.getenv("FRONTEND_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
    symptoms: List[str] = Field(..., example=["fever", "cough"])

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
