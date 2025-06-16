from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import numpy as np
import joblib
import os

router = APIRouter()

# Load model and label encoder once
# Adjust path to point from backend/routes to backend/models
model_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "models", "crop_model.pkl")
encoder_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "models", "label_encoder.pkl")

# Check if model files exist before loading
if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model file not found at: {model_path}. Please ensure the model is trained and saved by running train_model.py in the backend directory.")
if not os.path.exists(encoder_path):
    raise FileNotFoundError(f"Label encoder file not found at: {encoder_path}. Please ensure the label encoder is saved by running train_model.py in the backend directory.")

try:
    model = joblib.load(model_path)
    label_encoder = joblib.load(encoder_path)
except Exception as e:
    raise RuntimeError(f"Error loading model or label encoder: {e}")

# Input schema
class CropInput(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

@router.post("/predict-crop")
def predict_crop(data: CropInput):
    try:
        sample = np.array([[data.N, data.P, data.K, data.temperature, data.humidity, data.ph, data.rainfall]])
        prediction = model.predict(sample)
        crop_name = label_encoder.inverse_transform(prediction)[0]
        return {"predicted_crop": crop_name}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
