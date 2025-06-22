from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import re

from ..utils.pest_disease_gemini import generate_pest_disease_advice

router = APIRouter()

class PestDiseaseInput(BaseModel):
    crop: str
    crop_variety: Optional[str]
    location: str
    season: str
    soil_type: str
    nitrogen: float
    phosphorus: float
    potassium: float
    soil_ph: float
    previous_issues: Optional[str]

def parse_pest_disease_response(response_text: str):
    """
    Parses the raw text from Gemini into a structured dictionary for pest/disease advice.
    Limits each section to 4 paragraphs maximum.
    """
    def limit_to_4_paragraphs(text: str) -> str:
        """Helper function to limit text to 4 paragraphs"""
        paragraphs = [p.strip() for p in text.split('\n') if p.strip()]
        return '\n'.join(paragraphs[:4])

    try:
        cleaned_text = re.sub(r'\*\*', '', response_text)

        response = {
            "likelyPests": "Not specified",
            "symptoms": "No symptoms provided.",
            "preventiveMeasures": "No measures provided."
        }

        pests_match = re.search(r'LIKELY PESTS OR DISEASES:\s*(.*?)(?=SYMPTOMS TO WATCH:|$)', cleaned_text, re.IGNORECASE | re.DOTALL)
        if pests_match:
            response["likelyPests"] = limit_to_4_paragraphs(pests_match.group(1).strip())

        symptoms_match = re.search(r'SYMPTOMS TO WATCH:\s*(.*?)(?=PREVENTIVE MEASURES:|$)', cleaned_text, re.IGNORECASE | re.DOTALL)
        if symptoms_match:
            response["symptoms"] = limit_to_4_paragraphs(symptoms_match.group(1).strip())

        measures_match = re.search(r'PREVENTIVE MEASURES:\s*(.*)', cleaned_text, re.IGNORECASE | re.DOTALL)
        if measures_match:
            response["preventiveMeasures"] = limit_to_4_paragraphs(measures_match.group(1).strip())

        if response["likelyPests"] == "Not specified":
            print(f"Could not parse response. Full Gemini Response:\n{response_text}")
            response["preventiveMeasures"] = "Could not automatically parse the AI's response. The full response has been logged for review."
            response["likelyPests"] = "See Full Response"
            response["symptoms"] = response_text

        return response
    except Exception as e:
        print(f"Error during response parsing: {e}")
        return {
            "likelyPests": "Parsing Error",
            "symptoms": f"An error occurred while parsing the AI's advice: {str(e)}",
            "preventiveMeasures": ""
        }

@router.post("/predict")
def get_pest_disease_prediction(data: PestDiseaseInput):
    try:
        input_data = {
            "crop": data.crop,
            "crop_variety": data.crop_variety or "Not specified",
            "location": data.location,
            "season": data.season,
            "soil_type": data.soil_type,
            "nitrogen": data.nitrogen,
            "phosphorus": data.phosphorus,
            "potassium": data.potassium,
            "soil_ph": data.soil_ph,
            "previous_issues": data.previous_issues or "None"
        }

        gemini_response = generate_pest_disease_advice(input_data)
        
        if "error occurred" in gemini_response.lower():
            raise HTTPException(status_code=500, detail=gemini_response)

        structured_response = parse_pest_disease_response(gemini_response)
        
        return structured_response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
