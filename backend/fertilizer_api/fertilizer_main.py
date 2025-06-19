"""
Fertilizer recommendation API main file.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
import joblib
import os

router = APIRouter()

# ---------- Load model and utils ----------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model", "a1_fertilizer_model.h5")
UTILS_PATH = os.path.join(BASE_DIR, "model", "a1_fertilizer_utils.pkl")

try:
    model = tf.keras.models.load_model(MODEL_PATH)
    utils = joblib.load(UTILS_PATH)
    scaler = utils["scaler"]
    fertilizer_encoder = utils["fertilizer_encoder"]
except Exception as e:
    raise RuntimeError("Model or utils.pkl not found or invalid.") from e

# ---------- Fertilizer Information ----------
fertilizer_info = {
    "10-26-26": {
        "description": "High phosphorus and potassium mix for flowering and fruiting stages.",
        "tips": "Apply before flowering. Not suitable for early vegetative stages."
    },
    "10-10-10": {
        "description": "Balanced NPK fertilizer suitable for general crop use.",
        "tips": "Great for gardens and lawns. Apply during early stages of plant growth."
    },
    "14-14-14": {
        "description": "Uniform nutrient blend for general purpose use.",
        "tips": "Apply monthly. Water the soil after application."
    },
    "14-35-14": {
        "description": "Promotes blooming and root development.",
        "tips": "Apply before flowering for best results."
    },
    "15-15-15": {
        "description": "Triple mix for balanced crop development.",
        "tips": "Spread evenly and water the plant base after use."
    },
    "17-17-17": {
        "description": "High strength fertilizer for cereals and legumes.",
        "tips": "Use during vegetative stages. Avoid overuse."
    },
    "20-20": {
        "description": "High nitrogen and phosphorus for strong early growth.",
        "tips": "Apply in moist soil. Avoid excessive use."
    },
    "28-28": {
        "description": "Strong NPK mix for rapid plant development.",
        "tips": "Good for fast-growing plants. Use with caution."
    },
    "DAP": {
        "description": "Diammonium phosphate, rich in phosphorus.",
        "tips": "Best used at planting time. Do not mix with urea in storage."
    },
    "Potassium chloride": {
        "description": "Potassium source improving drought resistance.",
        "tips": "Avoid use on chloride-sensitive crops like potatoes."
    },
    "Potassium sulfate": {
        "description": "Chlorine-free potassium, ideal for sensitive crops.",
        "tips": "Use on fruits, vegetables, and high-value crops."
    },
    "Superphosphate": {
        "description": "Enriches soil with phosphorus and calcium.",
        "tips": "Apply during soil preparation. Mix well into soil."
    },
    "TSP": {
        "description": "Triple super phosphate for phosphorus-deficient soils.",
        "tips": "Apply in furrows near the seed. Do not mix with alkaline substances."
    },
    "Urea": {
        "description": "High nitrogen fertilizer for leafy crops.",
        "tips": "Use in moist soil. Split dosage for best results."
    }
}

# ---------- Request body ----------
class FertilizerInput(BaseModel):
    temperature: float
    humidity: float
    moisture: float
    soil_type: int    # already encoded
    crop_type: int    # already encoded
    nitrogen: float
    potassium: float
    phosphorous: float

# ---------- Routes ----------
@router.get("/")
def index():
    return {"msg": "Fertilizer Recommendation API"}

@router.post("/predict")
def predict(data: FertilizerInput):
    try:
        input_data = np.array([[data.temperature, data.humidity, data.moisture,
                                data.soil_type, data.crop_type,
                                data.nitrogen, data.potassium, data.phosphorous]])
        
        scaled_input = scaler.transform(input_data)
        prediction = model.predict(scaled_input)
        
        index = int(np.argmax(prediction[0]))
        confidence = float(np.max(prediction[0]))
        fertilizer = fertilizer_encoder.inverse_transform([index])[0]

        # Get fertilizer information
        info = fertilizer_info.get(fertilizer, {
            "description": "No description available.",
            "tips": "No tips available."
        })

        return {
            "recommended_fertilizer": fertilizer,
            "confidence": confidence,
            "description": info["description"],
            "tips": info["tips"]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
