import warnings
warnings.filterwarnings("ignore")

import pandas as pd
import numpy as np
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier

# Define paths for data and model saving
DATA_PATH = os.path.join("..", "..", "Crop_recommendation.csv")
MODELS_DIR = os.path.join("models")
MODEL_PATH = os.path.join(MODELS_DIR, "crop_model.pkl")
ENCODER_PATH = os.path.join(MODELS_DIR, "label_encoder.pkl")

# Ensure the models directory exists
os.makedirs(MODELS_DIR, exist_ok=True)

def train_and_save_model():
    print("Starting model training...")

    # Load Data
    if not os.path.exists(DATA_PATH):
        raise FileNotFoundError(f"Data file not found at: {DATA_PATH}. Please ensure Crop_recommendation.csv is in the project root.")
    data = pd.read_csv(DATA_PATH)
    print("Data Loaded Successfully. Shape:", data.shape)

    # Preprocessing
    X = data.drop("label", axis=1)
    y_text = data["label"]

    le = LabelEncoder()
    y = le.fit_transform(y_text)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)
    print(f"Train Samples: {len(X_train)}, Test Samples: {len(X_test)}")

    # Model Building (Using RandomForestClassifier as it was the 'best_clf' in the original script)
    pipeline = Pipeline([
        ("scaler", StandardScaler()),
        ("classifier", RandomForestClassifier(n_estimators=100, random_state=42)) # Using 100 estimators as a reasonable default
    ])
    
    print("Fitting model...")
    pipeline.fit(X_train, y_train)
    print("Model fitted.")

    # Save trained model
    joblib.dump(pipeline, MODEL_PATH)
    print(f"Trained model saved to: {MODEL_PATH}")

    # Save label encoder
    joblib.dump(le, ENCODER_PATH)
    print(f"Label encoder saved to: {ENCODER_PATH}")
    print("Model training complete.")

if __name__ == "__main__":
    train_and_save_model() 