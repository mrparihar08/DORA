# app.py
import os
import joblib
import pandas as pd
from difflib import SequenceMatcher
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
import logging
from dotenv import load_dotenv

# ===========================================
# Setup & Logging
# ===========================================
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)
load_dotenv()

BASE_DIR = os.path.dirname(__file__)
ARTIFACTS_DIR = os.path.join(BASE_DIR, "artifacts")
os.makedirs(ARTIFACTS_DIR, exist_ok=True)
DATA_PATH = os.path.join(BASE_DIR, "dataset.csv")

MODEL_PATH = os.path.join(ARTIFACTS_DIR, "disease_model.pkl")
VECTORIZER_PATH = os.path.join(ARTIFACTS_DIR, "tfidf_vectorizer.pkl")
ENCODER_PATH = os.path.join(ARTIFACTS_DIR, "label_encoder.pkl")

# ===========================================
# TRAIN MODEL (if artifacts not present)
# ===========================================
def train_if_needed():
    if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH) and os.path.exists(ENCODER_PATH):
        logger.info("✅ Artifacts already exist. Skipping training.")
        return

    logger.info("🧠 Training model from dataset.csv ...")
    df = pd.read_csv(DATA_PATH)
    df.columns = [c.strip().replace(" ", "_") for c in df.columns]
    df = df.dropna(subset=["Disease"]).fillna("")

    # Handle rare diseases
    value_counts = df["Disease"].value_counts()
    rare_diseases = value_counts[value_counts < 2].index
    df["Disease"] = df["Disease"].apply(lambda x: x if x not in rare_diseases else "Other")

    symptom_cols = [c for c in df.columns if "symptom" in c.lower()]
    X = df[symptom_cols].astype(str)
    y = df["Disease"]

    X_joined = X.apply(lambda x: " ".join(x.astype(str).str.lower()), axis=1)
    vectorizer = TfidfVectorizer()
    X_vectorized = vectorizer.fit_transform(X_joined)

    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_vectorized, y_encoded)

    joblib.dump(model, MODEL_PATH)
    joblib.dump(vectorizer, VECTORIZER_PATH)
    joblib.dump(label_encoder, ENCODER_PATH)

    logger.info(f"✅ Training complete. Artifacts saved in {ARTIFACTS_DIR}")

train_if_needed()

# ===========================================
# Load Model Artifacts
# ===========================================
def safe_load(path, name):
    if not os.path.exists(path):
        raise FileNotFoundError(f"{name} not found at {path}. Run training first.")
    return joblib.load(path)

model = safe_load(MODEL_PATH, "Model")
vectorizer = safe_load(VECTORIZER_PATH, "Vectorizer")
label_encoder = safe_load(ENCODER_PATH, "Label Encoder")

data = pd.read_csv(DATA_PATH)

# ===========================================
# Prediction Logic
# ===========================================
def similarity(a, b):
    return SequenceMatcher(None, a, b).ratio()

def predict_disease(user_symptoms, top_k=5):
    if isinstance(user_symptoms, str):
        user_symptoms = [user_symptoms]

    clean_symptoms = [s.lower().strip() for s in user_symptoms if s.strip()]
    if not clean_symptoms:
        return {"error": "No valid symptoms provided."}

    input_text = " ".join(clean_symptoms)
    X_input = vectorizer.transform([input_text])
    y_pred = model.predict(X_input)
    predicted_disease = label_encoder.inverse_transform(y_pred)[0]

    possible = []
    for _, row in data.iterrows():
        disease_symptoms = [
            str(row.get(f"symptom_{i}", "")).lower()
            for i in range(1, 6)
            if str(row.get(f"symptom_{i}", "")).strip()
        ]
        if not disease_symptoms:
            continue

        score = sum(max(similarity(us, ds) for ds in disease_symptoms)
                    for us in clean_symptoms) / len(clean_symptoms)
        if score > 0.3:
            possible.append({
                "Disease": row["Disease"],
                "Similarity": round(score, 2),
                "Type": row.get("Type", ""),
                "Severity_Level": row.get("Severity_Level", "")
            })

    possible = sorted(possible, key=lambda x: x["Similarity"], reverse=True)[:top_k]

    if predicted_disease not in [d["Disease"] for d in possible]:
        possible.insert(0, {"Disease": predicted_disease, "Similarity": 1.0})

    return {"Input_Symptoms": clean_symptoms, "Predictions": possible}

# ===========================================
# FastAPI App
# ===========================================
app = FastAPI(title="Disease Prediction API (ML)", version="1.0")

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
    user_symptoms = request.symptoms
    if not user_symptoms or not isinstance(user_symptoms, list):
        raise HTTPException(status_code=400, detail="Please provide a valid list of symptoms.")

    try:
        results = predict_disease(user_symptoms, top_k=top_k)
    except Exception as e:
        logger.exception("Prediction error")
        raise HTTPException(status_code=500, detail=str(e))

    if isinstance(results, dict) and results.get("error"):
        raise HTTPException(status_code=400, detail=results["error"])

    input_symptoms = results.get("Input_Symptoms") or []
    predictions = results.get("Predictions") or []
    predicted_disease = predictions[0]["Disease"] if predictions else None

    return {
        "input_symptoms": input_symptoms,
        "predicted_disease": predicted_disease,
        "possible_diseases": predictions
    }

# ===========================================
# Run
# ===========================================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=int(os.getenv("PORT", 8000)), reload=True)
