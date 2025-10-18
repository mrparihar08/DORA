# model.py
import os
import joblib
import pandas as pd
from difflib import SequenceMatcher
from typing import List, Dict, Any

BASE_DIR = os.path.dirname(__file__)
ARTIFACTS_DIR = os.path.join(BASE_DIR, "artifacts")

MODEL_PATH = os.path.join(ARTIFACTS_DIR, "disease_model.pkl")
VECTORIZER_PATH = os.path.join(ARTIFACTS_DIR, "tfidf_vectorizer.pkl")
ENCODER_PATH = os.path.join(ARTIFACTS_DIR, "label_encoder.pkl")
DATA_PATH = os.path.join(BASE_DIR, "dataset.csv")

def safe_load(path, name):
    if not os.path.exists(path):
        raise FileNotFoundError(f"{name} not found at {path}")
    return joblib.load(path)

# Load artifacts (will raise if missing)
model = safe_load(MODEL_PATH, "Model")
vectorizer = safe_load(VECTORIZER_PATH, "Vectorizer")
label_encoder = safe_load(ENCODER_PATH, "Label Encoder")

if not os.path.exists(DATA_PATH):
    raise FileNotFoundError("Dataset not found. Please include dataset.csv in the project root.")
data = pd.read_csv(DATA_PATH)

def similarity(a: str, b: str) -> float:
    if not a or not b:
        return 0.0
    return SequenceMatcher(None, a, b).ratio()

def fallback_match(user_symptoms: List[str], top_k: int = 5) -> List[Dict[str, Any]]:
    """Rule-based fuzzy fallback returning a list of candidate diseases."""
    user_symptoms = [s.lower().strip() for s in user_symptoms if s and str(s).strip()]
    possible = []

    for _, row in data.iterrows():
        disease_symptoms = [
            str(row.get(f"symptom_{i}", "")).lower()
            for i in range(1, 6)  # pick up to 5 symptom columns if available
            if str(row.get(f"symptom_{i}", "")).strip()
        ]
        if not disease_symptoms:
            continue

        # compute average best-match score (0..1)
        scores = []
        for us in user_symptoms:
            best = max((similarity(us, ds) for ds in disease_symptoms), default=0.0)
            scores.append(best)
        avg_score = sum(scores) / len(scores) if scores else 0.0

        if avg_score > 0.15:  # permissive threshold
            possible.append({
                "Disease": row.get("Disease", ""),
                "Score": round(avg_score, 3),
                "Type": row.get("Type", ""),
                "Severity_Level": row.get("Severity_Level", ""),
                "Matches": int(len([s for s in disease_symptoms if any(similarity(s, us) > 0.3 for us in user_symptoms)]))
            })

    possible_sorted = sorted(possible, key=lambda x: x["Score"], reverse=True)
    # Map Score to Probability-like value for frontend convenience (0..1)
    results = []
    for item in possible_sorted[:top_k]:
        results.append({
            "Disease": item["Disease"],
            "Probability": round(item["Score"], 3),
            "Matches": item.get("Matches", 0),
            "Type": item.get("Type", ""),
            "Severity_Level": item.get("Severity_Level", "")
        })
    return results

def predict_disease(user_symptoms: List[str], top_k: int = 5) -> Dict[str, Any]:
    """
    Predicts likely diseases.
    Returns dict:
    {
      "input_symptoms": [...],
      "predictions": [ { "Disease":..., "Probability":..., "Matches":..., ... }, ... ]
    }
    """
    try:
        if isinstance(user_symptoms, str):
            user_symptoms = [user_symptoms]

        clean_symptoms = [s.lower().strip() for s in user_symptoms if s and str(s).strip()]
        if not clean_symptoms:
            return {"error": "No valid symptoms provided."}

        # Vectorize input
        input_text = " ".join(clean_symptoms)
        X_input = vectorizer.transform([input_text])

        # Prediction + probabilities (if model supports predict_proba)
        try:
            y_pred = model.predict(X_input)
            proba = model.predict_proba(X_input)
            top_idx = proba[0].argmax()
            predicted_label = label_encoder.inverse_transform([y_pred[0]])[0]
            confidence = float(round(max(proba[0]), 3))
        except Exception:
            # If model doesn't have predict_proba or fails, fallback to ML label only
            y_pred = model.predict(X_input)
            predicted_label = label_encoder.inverse_transform([y_pred[0]])[0]
            confidence = None

        # Rule-based fallback suggestions
        fallback = fallback_match(clean_symptoms, top_k=top_k)

        # Ensure ML predicted disease appears first in the list (if not present)
        if predicted_label and not any(d["Disease"] == predicted_label for d in fallback):
            ml_entry = {
                "Disease": predicted_label,
                "Probability": confidence if confidence is not None else 1.0,
                "Matches": 0
            }
            # prefer placing ML at front
            predictions = [ml_entry] + fallback[: max(0, top_k - 1)]
        else:
            predictions = fallback[:top_k]

        return {
            "input_symptoms": clean_symptoms,
            "predictions": predictions
        }

    except Exception as e:
        # on error return error and fallback attempt
        return {"error": str(e), "predictions": fallback_match(user_symptoms, top_k=top_k)}
