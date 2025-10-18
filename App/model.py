# model.py
import os
import joblib
import pandas as pd
from difflib import SequenceMatcher

BASE_DIR = os.path.dirname(__file__)
ARTIFACTS_DIR = os.path.join(BASE_DIR, "artifacts")

MODEL_PATH = os.path.join(ARTIFACTS_DIR, "disease_model.pkl")
VECTORIZER_PATH = os.path.join(ARTIFACTS_DIR, "tfidf_vectorizer.pkl")
ENCODER_PATH = os.path.join(ARTIFACTS_DIR, "label_encoder.pkl")
DATA_PATH = os.path.join(BASE_DIR, "dataset.csv")

# Safe load helper
def safe_load(path, name):
    if not os.path.exists(path):
        raise FileNotFoundError(f"{name} not found at {path}. Run train.py first.")
    return joblib.load(path)

# Load artifacts
model = safe_load(MODEL_PATH, "Model")
vectorizer = safe_load(VECTORIZER_PATH, "Vectorizer")
label_encoder = safe_load(ENCODER_PATH, "Label Encoder")

data = pd.read_csv(DATA_PATH)

def similarity(a, b):
    return SequenceMatcher(None, a, b).ratio()

def predict_disease(user_symptoms, top_k=5):
    """Predict disease using ML + fuzzy fallback."""
    if isinstance(user_symptoms, str):
        user_symptoms = [user_symptoms]

    clean_symptoms = [s.lower().strip() for s in user_symptoms if s.strip()]
    if not clean_symptoms:
        return {"error": "No valid symptoms provided."}

    input_text = " ".join(clean_symptoms)
    X_input = vectorizer.transform([input_text])
    y_pred = model.predict(X_input)
    predicted_disease = label_encoder.inverse_transform(y_pred)[0]

    # Rule-based fallback
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
