# main.py
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
from dotenv import load_dotenv
import logging

from model import predict_disease  # our cleaned model function

# Logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

# Load .env
load_dotenv()

app = FastAPI(title="Disease Prediction API (ML)", version="1.0")

# CORS - allow common dev origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://dora-main-30iw.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SymptomsRequest(BaseModel):
    symptoms: List[str]

@app.get("/")
def root():
    return {"message": "🩺 Disease Prediction API (ML) is running!"}

@app.post("/predict")
def predict(request: SymptomsRequest, top_k: int = Query(5, ge=1, le=20)):
    """
    Predict disease based on user symptoms.
    Query param `top_k` controls how many suggestions to return (default 5).
    """
    user_symptoms = request.symptoms
    if not user_symptoms or not isinstance(user_symptoms, list):
        raise HTTPException(status_code=400, detail="Please provide a valid list of symptoms.")

    try:
        # predict_disease now accepts top_k
        results = predict_disease(user_symptoms, top_k=top_k)
    except Exception as e:
        logger.exception("Prediction error")
        # avoid leaking full trace to clients in production; for dev return message
        raise HTTPException(status_code=500, detail=str(e))

    # Handle function-level error returns
    if isinstance(results, dict) and results.get("error"):
        raise HTTPException(status_code=400, detail=results["error"])

    # Normalize response keys so frontend can rely on them:
    # returned object will contain: input_symptoms, predicted_disease, possible_diseases
    input_symptoms = results.get("input_symptoms") or results.get("Input_Symptoms") or []
    predictions = results.get("predictions") or results.get("Predictions") or results.get("possible_diseases") or []

    predicted_disease = None
    if predictions:
        # If model returned enriched items, prefer first item's Disease
        first = predictions[0]
        predicted_disease = first.get("Disease") or first.get("disease") or None

    return {
        "input_symptoms": input_symptoms,
        "predicted_disease": predicted_disease,
        "possible_diseases": predictions
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=int(os.getenv("PORT", 8000)), reload=True)
