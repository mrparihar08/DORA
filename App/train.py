import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

# ============================================================
# 1️⃣ Load Dataset
# ============================================================
DATA_PATH = r"C:\Users\preet\OneDrive\Desktop\DORA\App\dataset.csv"
df = pd.read_csv(DATA_PATH)

# ============================================================
# 2️⃣ Clean Column Names
# ============================================================
df.columns = [c.strip().replace(" ", "_") for c in df.columns]

# ============================================================
# 3️⃣ Handle Missing Values
# ============================================================
df = df.dropna(subset=["Disease"])
df = df.fillna("")

# ============================================================
# 4️⃣ Merge Rare Diseases (with < 2 records)
# ============================================================
value_counts = df["Disease"].value_counts()
rare_diseases = value_counts[value_counts < 2].index
if len(rare_diseases) > 0:
    print(f"Merging {len(rare_diseases)} rare diseases into 'Other'")
    df["Disease"] = df["Disease"].apply(lambda x: x if x not in rare_diseases else "Other")

# ============================================================
# 5️⃣ Feature & Label Separation
# ============================================================
symptom_cols = [c for c in df.columns if "symptom" in c.lower()]
X = df[symptom_cols].astype(str)
y = df["Disease"]
# ============================================================
# 6️⃣ Encode Text Features (Convert Text → Numbers)
# ============================================================
from sklearn.feature_extraction.text import TfidfVectorizer

X_encoded = X.apply(lambda col: col.astype(str).str.lower())
X_joined = X_encoded.apply(lambda x: " ".join(x), axis=1)

vectorizer = TfidfVectorizer()
X_vectorized = vectorizer.fit_transform(X_joined)

# Encode target labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# ============================================================
# 7️⃣ Train Model
# ============================================================
print("Training model...")
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_vectorized, y_encoded)

# ============================================================
# 8️⃣ Save Model Artifacts
# ============================================================
MODEL_DIR = os.path.join(os.path.dirname(__file__), "artifacts")
os.makedirs(MODEL_DIR, exist_ok=True)

joblib.dump(model, os.path.join(MODEL_DIR, "disease_model.pkl"))
joblib.dump(vectorizer, os.path.join(MODEL_DIR, "tfidf_vectorizer.pkl"))
joblib.dump(label_encoder, os.path.join(MODEL_DIR, "label_encoder.pkl"))

print("✅ Model training complete!")
print("✅ Artifacts saved in:", MODEL_DIR)
