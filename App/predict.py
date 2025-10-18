import joblib
import os
import pandas as pd
from difflib import SequenceMatcher

# ------------------------------------------------------------
# Load Model Artifacts
# ------------------------------------------------------------
BASE_DIR = os.path.dirname(__file__)
ARTIFACTS_DIR = os.path.join(BASE_DIR, "artifacts")

MODEL_PATH = os.path.join(ARTIFACTS_DIR, "disease_model.pkl")
VECTORIZER_PATH = os.path.join(ARTIFACTS_DIR, "tfidf_vectorizer.pkl")
ENCODER_PATH = os.path.join(ARTIFACTS_DIR, "label_encoder.pkl")
DATA_PATH = os.path.join(BASE_DIR, "dataset.csv")

# Safety checks
def safe_load(path, name):
    if not os.path.exists(path):
        raise FileNotFoundError(f"❌ {name} not found at {path}. Run train.py first.")
    return joblib.load(path)

model = safe_load(MODEL_PATH, "Model")
vectorizer = safe_load(VECTORIZER_PATH, "Vectorizer")
label_encoder = safe_load(ENCODER_PATH, "Label Encoder")

if not os.path.exists(DATA_PATH):
    raise FileNotFoundError("❌ Dataset not found. Please include dataset.csv in the project.")
data = pd.read_csv(DATA_PATH)


# ------------------------------------------------------------
# Helper Function — Fuzzy Similarity
# ------------------------------------------------------------
def similarity(a: str, b: str) -> float:
    """Return a similarity ratio between two strings (0 to 1)."""
    return SequenceMatcher(None, a, b).ratio()


# ------------------------------------------------------------
# Main Prediction Function
# ------------------------------------------------------------
def predict_disease(user_symptoms, top_k: int = 5):
    """
    Predicts the most likely disease using ML model + rule-based fallback.
    Returns a ranked list of possible diseases.
    """
    # 🧹 Step 1: Clean Input
    if isinstance(user_symptoms, str):
        user_symptoms = [user_symptoms]

    clean_symptoms = [s.lower().strip() for s in user_symptoms if s.strip()]
    if not clean_symptoms:
        return {"error": "No valid symptoms provided."}

    # 🧠 Step 2: ML Model Prediction
    input_text = " ".join(clean_symptoms)
    X_input = vectorizer.transform([input_text])
    y_pred = model.predict(X_input)
    predicted_disease = label_encoder.inverse_transform(y_pred)[0]

    # Step 3: Rule-Based Fallback (Fuzzy Matching)
    possible_diseases = []
    for _, row in data.iterrows():
        disease_symptoms = [
            str(row.get(f"symptom_{i}", "")).lower()
            for i in range(1, 5)
            if str(row.get(f"symptom_{i}", "")).strip()
        ]

        # Compute average similarity between user and disease symptoms
        score = sum(
            max(similarity(us, ds) for ds in disease_symptoms)
            for us in clean_symptoms
        ) / len(clean_symptoms)

        if score > 0.3:  # threshold for minimal similarity
            possible_diseases.append({
                "Disease": row["Disease"],
                "Similarity": round(score, 2),
                "Type": row.get("Type", ""),
                "Severity_Level": row.get("Severity_Level", "")
            })

    # Step 4: Sort by similarity
    possible_diseases = sorted(possible_diseases, key=lambda x: x["Similarity"], reverse=True)[:top_k]

    # Step 5: Ensure ML prediction appears at top
    if predicted_disease not in [d["Disease"] for d in possible_diseases]:
        possible_diseases.insert(0, {
            "Disease": predicted_disease,
            "Similarity": 1.0,
            "Type": "",
            "Severity_Level": ""
        })

    return {
        "Input_Symptoms": clean_symptoms,
        "Predictions": possible_diseases
    }


# ------------------------------------------------------------
# Example Test
# ------------------------------------------------------------
if __name__ == "__main__":
    test_input = ["abdominal pain", "nausea", "vomiting"]
    result = predict_disease(test_input)
    print("🧠 Prediction Result:")
    for item in result["Predictions"]:
        print(f"- {item['Disease']} (Similarity: {item['Similarity']})")
