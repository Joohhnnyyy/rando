# Gemini Tips Utilities 

import os
import google.generativeai as genai
from dotenv import load_dotenv

# Construct the absolute path to the .env file
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '..', '..', '.env')
load_dotenv(dotenv_path=dotenv_path)

# Set your API key
genai.configure(api_key=os.getenv("VITE_GEMINI_API_KEY"))

def get_disease_overview(disease_name):
    """
    Generates a detailed and structured overview of the disease or a healthy crop status.
    """
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')

        if disease_name.lower() == "healthy":
            prompt = """
The uploaded plant image has been identified as **Healthy**.

Please provide clear and practical guidelines for maintaining healthy crops. Structure the response with the following:

**Healthy Crop Guidelines:**
- Best cultural practices (watering, pruning, etc.)
- Recommended fertilizers and nutrient tips
- Pest and disease prevention (even in healthy crops)
- Seasonal care advice
- Monitoring methods to ensure crops remain healthy

Keep the tone supportive, concise, and suitable for farmers and agriculturists.
"""
        else:
            prompt = f"""
Analyze the plant disease **"{disease_name}"** and provide a comprehensive, well-structured overview.

**Disease Profile:**
- What is this disease and which crops are commonly affected?
- Visual signs: What does infection look like on leaves, stems, or fruits?
- Early-stage symptoms vs advanced-stage symptoms
- Causes: Pathogens, pests, weather conditions, etc.

**Impact on Crops:**
- Effects on growth, yield, and marketability
- Long-term consequences if not treated

**General Awareness:**
- How to detect the disease early
- Similar diseases that could be mistaken

Be precise, clear, and farmer-friendly in tone.
"""

        response = model.generate_content(prompt)
        return response.text.strip() if hasattr(response, 'text') else f"Overview not available for {disease_name}."
    except Exception as e:
        print(f"Error generating overview: {e}")
        return f"Overview unavailable for {disease_name} due to a technical issue."

def get_disease_recommendations(disease_name):
    """
    Provides actionable recommendations depending on whether crop is healthy or infected.
    """
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')

        if disease_name.lower() == "healthy":
            prompt = """
Since the crop is classified as **Healthy**, provide preventive strategies and sustainability tips.

**Preventive Measures:**
- How to avoid disease or pest infestation
- Seasonal risk precautions
- Crop rotation and field hygiene practices

**Soil and Water Management:**
- How to maintain optimal moisture and pH
- Irrigation techniques

**Fertilization Tips:**
- Balanced usage of organic and inorganic fertilizers
- Nutrient monitoring strategies

Focus on maintaining optimal health and avoiding common mistakes.
"""
        else:
            prompt = f"""
Provide detailed and stage-wise management strategies for the crop disease **"{disease_name}"**.

**1. Immediate Action Plan:**
- What should farmers do right now upon identifying early signs?

**2. Treatment Guidance:**
- Effective chemical treatments (mention product types, dosage, safety)
- Organic or biological alternatives
- How to apply (spraying, drenching, etc.)

**3. Prevention Plan:**
- Field sanitation and crop spacing
- Resistant crop varieties
- Crop rotation strategies

**4. Ongoing Monitoring:**
- Weekly visual inspection checklist
- Triggers for next treatment round

Write in simple language for rural farmers and agronomists.
"""

        response = model.generate_content(prompt)
        return response.text.strip() if hasattr(response, 'text') else f"Recommendations not available for {disease_name}."
    except Exception as e:
        print(f"Error generating recommendations: {e}")
        return f"Recommendations unavailable for {disease_name} due to a technical issue."

def get_disease_prevention_tips(disease_name):
    """
    Generates AI-powered tips based on whether the crop is healthy or infected.
    Distinguishes clearly between healthy crops and actual diseases.
    """
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')

        if disease_name.lower() == "healthy":
            prompt = """
The uploaded plant image has been classified as **Healthy**.

You are an expert agronomist assistant helping farmers maintain healthy crops. Provide valuable tips and preventive measures in the following format:

 **Crop Status: Healthy**

**1. General Tips to Maintain Healthy Plants:**
- Best practices for watering, sunlight, and ventilation
- How to monitor leaf color, shape, and moisture

**2. Soil & Fertilizer Management:**
- Recommended NPK ratios for general crop health
- Organic practices to enrich soil over time

**3. Pest & Disease Prevention:**
- Natural barriers or companion plants to prevent pests
- How to spot early signs of common infections

**4. Seasonal Care & Monitoring:**
- What to watch for in different seasons
- Tools or schedules for weekly plant health checks

Format the response in farmer-friendly language with bullet points. Keep it clear, short, and immediately actionable.
"""
        else:
            prompt = f"""
The uploaded image has been classified as infected with the plant disease: **{disease_name}**.

You are an expert agricultural AI. Provide a structured, useful guide for farmers. Follow this format:

 **Detected Disease: {disease_name}**

**1. Disease Overview:**
- What is {disease_name} and which crops are usually affected?
- Early symptoms, mid-stage signs, and advanced-stage damage
- Common causes (weather, pests, fungi, bacteria, etc.)

**2. Immediate Actions (What to do NOW):**
- Steps to prevent spread
- Isolation, pruning, or crop removal if necessary

**3. Treatment Recommendations:**
- Chemical and organic treatments with usage tips
- Application method and safety warnings

**4. Long-term Prevention Plan:**
- Soil, spacing, and rotation tips
- Using resistant varieties and hygiene practices

**5. Monitoring & Follow-up:**
- What signs to look for each week
- How to track recovery or reinfection

The tone should be clear, confident, and actionable for real farmers. Avoid academic jargon. Bullet-point formatting preferred.
"""

        response = model.generate_content(prompt)
        return response.text.strip() if hasattr(response, 'text') else f"Tips not available for {disease_name}."
    
    except Exception as e:
        print(f"Error generating tips: {e}")
        return f"Unable to generate tips for {disease_name} due to technical issues." 