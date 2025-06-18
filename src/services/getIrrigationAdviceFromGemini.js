import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getIrrigationAdviceFromGemini({ 
  cropType, soilType, region, growthStage, soilMoisture, lastIrrigationDate 
}) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Provide irrigation advice:
Crop: ${cropType}
Soil: ${soilType}
Region: ${region}
Growth Stage: ${growthStage}
Soil Moisture: ${soilMoisture}%
Last Irrigation Date: ${lastIrrigationDate}

Respond ONLY with valid JSON, wrapped in triple backticks:
\`\`\`
{
  "waterQuantity": "...",
  "nextDate": "...",
  "confidence": "...",
  "reasoning": "..."
}
\`\`\`
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log("Gemini raw response:", text);

  // Try to extract JSON from triple backticks if present
  let jsonText = text;
  const match = text.match(/```(?:json)?\n?([\s\S]*?)```/i);
  if (match) {
    jsonText = match[1];
  }

  try {
    return JSON.parse(jsonText);
  } catch {
    return {
      waterQuantity: "N/A",
      nextDate: "N/A",
      confidence: "N/A",
      reasoning: "Could not parse Gemini response",
    };
  }
} 