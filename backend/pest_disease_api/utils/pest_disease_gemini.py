import os
from dotenv import load_dotenv
import google.generativeai as genai

dotenv_path = os.path.join(os.path.dirname(__file__), '..', '..', '..', '.env')
load_dotenv(dotenv_path=dotenv_path)

genai.configure(api_key=os.getenv("VITE_GEMINI_API_KEY"))

def generate_pest_disease_advice(data: dict) -> str:
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        prompt = f"""
You're an expert plant health advisor. Based on the provided field conditions and crop information, predict likely pest or disease threats and suggest preventive measures.

**Input Details:**
- Crop: {data['crop']}
- Crop Variety: {data['crop_variety']}
- Region/Location: {data['location']}
- Season: {data['season']}
- Soil Type: {data['soil_type']}
- Nitrogen (N): {data['nitrogen']} mg/kg
- Phosphorus (P): {data['phosphorus']} mg/kg
- Potassium (K): {data['potassium']} mg/kg
- Soil pH: {data['soil_ph']}
- Previous Issues: {data['previous_issues'] or "None"}

**Provide output in this format:**

**LIKELY PESTS OR DISEASES:**  
[List of threats with brief description and risk level]

**SYMPTOMS TO WATCH:**  
[List common early indicators farmers should monitor]

**PREVENTIVE MEASURES:**  
[Bullet points on field practices, natural remedies, and treatments]

Keep the response practical and clear for Indian farmers and extension officers.
        """

        response = model.generate_content(prompt)
        return response.text if hasattr(response, 'text') else "No prediction available at the moment."
    except Exception as e:
        print(f"Gemini Error: {e}")
        return f"An error occurred while generating the prediction: {str(e)}"
