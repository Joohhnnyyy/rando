# Disease Prediction Routes 
from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image
import io
import joblib
import os
from ..utils.gemini_tips import get_disease_prevention_tips

router = APIRouter()

# Compute absolute paths for model and class names
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MODEL_PATH = os.path.join(BASE_DIR, "disease_api", "model", "crop_disease_model.h5")
CLASS_NAMES_PATH = os.path.join(BASE_DIR, "disease_api", "model", "class_names.pkl")

# Load model and class names once
model = load_model(MODEL_PATH)
class_names = joblib.load(CLASS_NAMES_PATH)

def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))
    img_array = np.array(img) 
    return np.expand_dims(img_array, axis=0)

def format_disease_name(disease_name):
    """
    Format disease name for better display
    """
    # Convert underscores to spaces and capitalize properly
    formatted = disease_name.replace('_', ' ')
    
    # Handle common disease name patterns
    if 'Late Blight' in formatted:
        return formatted  # Already good
    elif 'Early Blight' in formatted:
        return formatted  # Already good
    elif 'Blight' in formatted:
        return formatted  # Already good
    elif 'Rust' in formatted:
        return formatted  # Already good
    elif 'Mildew' in formatted:
        return formatted  # Already good
    elif 'Spot' in formatted:
        return formatted  # Already good
    elif 'Rot' in formatted:
        return formatted  # Already good
    else:
        # For other cases, just capitalize properly
        return formatted.title()

@router.post("/predict_disease")
async def predict_disease(file: UploadFile = File(...)):
    print("Request received for disease prediction.")
    
    image_data = await file.read()
    print("Image data read.")
    
    processed_img = preprocess_image(image_data)
    print("Image preprocessed.")

    print("Running model prediction...")
    prediction = model.predict(processed_img)
    predicted_index = np.argmax(prediction)
    raw_disease_name = class_names[predicted_index]
    formatted_disease_name = format_disease_name(raw_disease_name)
    confidence = float(np.max(prediction))
    print(f"Model prediction complete. Disease: {formatted_disease_name}, Confidence: {confidence}")

    print("Getting prevention tips from Gemini...")
    tips = get_disease_prevention_tips(formatted_disease_name)
    print("Prevention tips received.")

    # Parse and structure the tips for better frontend display
    structured_tips = parse_disease_tips(tips, formatted_disease_name)

    response_data = {
        "predicted_disease": formatted_disease_name,
        "raw_disease_name": raw_disease_name,
        "confidence": round(confidence * 100, 2),
        "prevention_tips": tips,
        "structured_info": structured_tips
    }
    
    print("Sending response.")
    return JSONResponse(response_data)

def parse_disease_tips(tips_text, disease_name):
    """
    Parse the Gemini response and structure it for better frontend display
    """
    try:
        # Split the text into sections based on common patterns
        sections = {
            "overview": "",
            "immediate_actions": [],
            "cultural_practices": [],
            "chemical_controls": [],
            "monitoring": [],
            "resistant_varieties": []
        }
        
        # Extract overview from Gemini response
        # Look for the first paragraph or section that describes the approach
        lines = tips_text.split('\n')
        overview_lines = []
        
        for line in lines:
            line = line.strip()
            if line and not line.startswith('*') and not line.startswith('1.') and not line.startswith('2.') and not line.startswith('3.') and not line.startswith('4.'):
                # This is likely the overview/introduction
                if 'prevention' in line.lower() or 'guide' in line.lower() or 'approach' in line.lower():
                    overview_lines.append(line)
                    break
                elif len(overview_lines) == 0 and len(line) > 50:  # First substantial paragraph
                    overview_lines.append(line)
                    break
        
        if overview_lines:
            sections["overview"] = overview_lines[0]
        else:
            # Fallback to a simple overview
            sections["overview"] = f"{disease_name}: A comprehensive guide for farmers."
        
        return sections
        
    except Exception as e:
        print(f"Error parsing tips: {e}")
        # Return a basic structure if parsing fails
        return {
            "overview": f"Prevention tips for {disease_name}",
            "immediate_actions": [],
            "cultural_practices": [],
            "chemical_controls": [],
            "monitoring": [],
            "resistant_varieties": []
        } 