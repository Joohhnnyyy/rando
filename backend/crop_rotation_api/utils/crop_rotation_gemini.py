import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variable
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '..', '..', '.env')
load_dotenv(dotenv_path=dotenv_path)

# Configure Gemini API
genai.configure(api_key=os.getenv("VITE_GEMINI_API_KEY"))

def generate_rotation_advice(data: dict) -> str:
    """
    Generates AI-based crop rotation advice using Gemini API
    """
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        prompt = f"""
You're an expert agricultural advisor. Based on the following field and crop parameters, generate an AI-assisted crop rotation plan.

**Input Details:**
- Current Crop: {data.get('current_crop')}
- Previous Crop(s): {', '.join(data.get('previous_crops', []))}
- Soil Type: {data.get('soil_type')}
- Nitrogen (N): {data.get('nitrogen')} mg/kg
- Phosphorus (P): {data.get('phosphorus')} mg/kg
- Potassium (K): {data.get('potassium')} mg/kg
- Soil pH: {data.get('soil_ph')}
- Climate Zone: {data.get('climate_zone')}
- Season: {data.get('season')}
- Water Availability: {data.get('water_availability')}
- Irrigation Type: {data.get('irrigation_type')}
- Pest/Disease History: {data.get('pest_history') or 'None'}
- Target Goal: {data.get('target_goal')}

**Please provide your response in the following structured format:**

**NEXT CROP:** [Name the specific crop you recommend for the next season]

**JUSTIFICATION:** [Explain why this crop is the best choice for the given conditions, considering soil health, nutrient balance, and pest control]

**ADVANTAGES:**
1. [First advantage of choosing this crop]
2. [Second advantage]
3. [Third advantage]
4. [Fourth advantage]

**ROTATION PLAN:**
1. [First year/season recommendation]
2. [Second year/season recommendation]
3. [Third year/season recommendation]

**ADDITIONAL NOTES:** [Any important precautions, soil management tips, or considerations]

Keep the response educational, clear, and easy for farmers to understand. Focus on practical, actionable advice.
        """

        response = model.generate_content(prompt)
        return response.text if hasattr(response, 'text') else "Could not generate a crop rotation plan."
    
    except Exception as e:
        print(f"Gemini Error: {e}")
        return "An error occurred while generating the crop rotation advice."
