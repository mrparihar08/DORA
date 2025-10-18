# train.py
import pandas as pd
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer

# ============================================================
# Load dataset
# ============================================================
DATA_PATH = "dataset.csv"
df = pd.read_csv(DATA_PATH)

# Clean and prepare
df.columns = [c.strip().replace(" ", "_") for c in df.columns]
df = df.dropna(subset=["Disease"]).fillna("")

# Handle rare diseases
value_counts = df["Disease"].value_counts()
rare_diseases = value_counts[value_counts < 2].index
df["Disease"] = df["Disease"].apply(lambda x: x if x not in rare_diseases else "Other")

# Features & labels
symptom_cols = [c for c in df.columns if "symptom" in c.lower()]
X = df[symptom_cols].astype(str)
y = df["Disease"]

# Combine symptoms text
X_joined = X.apply(lambda x: " ".join(x.astype(str).str.lower()), axis=1)

# TF-IDF Vectorizer
vectorizer = TfidfVectorizer()
X_vectorized = vectorizer.fit_transform(X_joined)

# Encode labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Train model
print("🧠 Training RandomForest model...")
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_vectorized, y_encoded)

# Save artifacts
ARTIFACTS_DIR = "artifacts"
os.makedirs(ARTIFACTS_DIR, exist_ok=True)
joblib.dump(model, f"{ARTIFACTS_DIR}/disease_model.pkl")
joblib.dump(vectorizer, f"{ARTIFACTS_DIR}/tfidf_vectorizer.pkl")
joblib.dump(label_encoder, f"{ARTIFACTS_DIR}/label_encoder.pkl")

print("✅ Training complete! Artifacts saved in:", ARTIFACTS_DIR)
