from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
import re

from ..utils.crop_rotation_gemini import generate_rotation_advice

router = APIRouter()

class RotationInput(BaseModel):
    currentCrop: str
    previousCrops: List[str]
    soilType: str
    nitrogen: float
    phosphorus: float
    potassium: float
    soilpH: float
    climateZone: str
    season: str
    waterAvailability: str
    irrigationType: str
    pestDiseaseHistory: List[str]
    targetGoal: str

def parse_gemini_response(response_text: str):
    """
    Parses the raw text from Gemini into a structured dictionary.
    """
    try:
        response = {
            "nextCrop": "Not specified",
            "justification": "No justification provided.",
            "advantages": [],
            "rotationPlan": []
        }

        # Extract next crop
        next_crop_match = re.search(r'\*\*NEXT CROP:\*\*\s*(.*?)(?=\n\*\*|$)', response_text, re.IGNORECASE | re.DOTALL)
        if next_crop_match:
            response["nextCrop"] = next_crop_match.group(1).strip()

        # Extract justification
        justification_match = re.search(r'\*\*JUSTIFICATION:\*\*\s*(.*?)(?=\n\*\*|$)', response_text, re.IGNORECASE | re.DOTALL)
        if justification_match:
            response["justification"] = justification_match.group(1).strip()

        # Extract advantages
        advantages_match = re.search(r'\*\*ADVANTAGES:\*\*\s*\n(.*?)(?=\n\*\*|$)', response_text, re.IGNORECASE | re.DOTALL)
        if advantages_match:
            advantages_text = advantages_match.group(1).strip()
            advantages_list = re.findall(r'\d+\.\s*(.*?)(?=\n\d+\.|\n*$)', advantages_text, re.DOTALL)
            if advantages_list:
                # Clean up formatting by removing ** markers and extra whitespace
                cleaned_advantages = []
                for adv in advantages_list:
                    cleaned_adv = adv.strip()
                    # Remove ** markers
                    cleaned_adv = re.sub(r'\*\*', '', cleaned_adv)
                    # Remove extra whitespace and newlines
                    cleaned_adv = re.sub(r'\s+', ' ', cleaned_adv).strip()
                    if cleaned_adv:
                        cleaned_advantages.append(cleaned_adv)
                response["advantages"] = cleaned_advantages

        # Extract rotation plan
        rotation_match = re.search(r'\*\*ROTATION PLAN:\*\*\s*\n(.*?)(?=\n\*\*|$)', response_text, re.IGNORECASE | re.DOTALL)
        if rotation_match:
            rotation_text = rotation_match.group(1).strip()
            rotation_list = re.findall(r'\d+\.\s*(.*?)(?=\n\d+\.|\n*$)', rotation_text, re.DOTALL)
            if rotation_list:
                # Clean up formatting for rotation plan
                cleaned_rotation = []
                for plan in rotation_list:
                    cleaned_plan = plan.strip()
                    # Remove ** markers
                    cleaned_plan = re.sub(r'\*\*', '', cleaned_plan)
                    # Remove extra whitespace and newlines
                    cleaned_plan = re.sub(r'\s+', ' ', cleaned_plan).strip()
                    if cleaned_plan:
                        cleaned_rotation.append(cleaned_plan)
                response["rotationPlan"] = cleaned_rotation

        # Fallback if parsing failed
        if response["nextCrop"] == "Not specified":
            print(f"Could not parse response. Full Gemini Response:\n{response_text}")
            response["justification"] = "Could not automatically parse the AI's response. The full response has been logged for review."
            response["nextCrop"] = "See Full Response"
            response["advantages"] = [response_text]

        return response
    except Exception as e:
        print(f"Error during response parsing: {e}")
        return {
            "nextCrop": "Parsing Error",
            "justification": f"An error occurred while parsing the AI's advice: {str(e)}",
            "advantages": [],
            "rotationPlan": []
        }


@router.post("/generate-advice")
async def get_rotation_advice(data: RotationInput):
    try:
        input_data = {
            'current_crop': data.currentCrop,
            'previous_crops': data.previousCrops,
            'soil_type': data.soilType,
            'nitrogen': data.nitrogen,
            'phosphorus': data.phosphorus,
            'potassium': data.potassium,
            'soil_ph': data.soilpH,
            'climate_zone': data.climateZone,
            'season': data.season,
            'water_availability': data.waterAvailability,
            'irrigation_type': data.irrigationType,
            'pest_history': ", ".join(data.pestDiseaseHistory) if data.pestDiseaseHistory else "None",
            'target_goal': data.targetGoal,
        }
        
        advice_text = generate_rotation_advice(input_data)
        
        if "error occurred" in advice_text.lower() or "could not generate" in advice_text.lower():
            raise HTTPException(status_code=500, detail=advice_text)

        structured_response = parse_gemini_response(advice_text)
        
        return structured_response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
