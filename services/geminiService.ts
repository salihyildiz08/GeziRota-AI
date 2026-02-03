
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { TravelPlan, TravelInput } from "../types";

// Helper function to get a clean, valid API client
const getGenAIClient = () => {
  let apiKey = process.env.API_KEY;

  // SANITIZATION:
  // Vercel or .env files might accidentally include quotes or whitespace.
  // We strip them out to ensure a raw key.
  if (apiKey) {
    apiKey = apiKey.replace(/["']/g, "").trim();
  }

  // Check if key is missing or is the dummy placeholder
  if (!apiKey || apiKey === 'dummy-key-for-build' || apiKey.length < 10) {
    throw new Error("API Anahtarı eksik veya hatalı! Vercel panelinde 'API_KEY' değerini kontrol edin. (Tırnak işareti veya boşluk olmamalı)");
  }

  return new GoogleGenAI({ apiKey: apiKey });
};

const travelPlanSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    destination: { type: Type.STRING, description: "Target City, Country" },
    hotel: { type: Type.STRING, description: "The name of the hotel or 'Şehir Merkezi' if not provided" },
    logistics: {
      type: Type.OBJECT,
      properties: {
        carRentalAdvice: { type: Type.STRING, description: "Detailed advice on WHERE and HOW to rent a car if needed, and if it's logical." },
        generalTransportTips: { type: Type.STRING, description: "General public transport card names, taxi apps, etc." },
      },
      required: ["carRentalAdvice", "generalTransportTips"]
    },
    nearbyRecommendations: {
      type: Type.ARRAY,
      description: "List of 3-4 interesting places near the destination.",
      items: {
        type: Type.OBJECT,
        properties: {
          placeName: { type: Type.STRING },
          description: { type: Type.STRING },
          distanceFromCenter: { type: Type.STRING, description: "Distance from the main city center" },
          reasonToVisit: { type: Type.STRING }
        },
        required: ["placeName", "description", "distanceFromCenter", "reasonToVisit"]
      }
    },
    foodGuide: {
      type: Type.OBJECT,
      properties: {
        dishes: { type: Type.ARRAY, items: { type: Type.STRING } },
        desserts: { type: Type.ARRAY, items: { type: Type.STRING } },
        drinks: { type: Type.ARRAY, items: { type: Type.STRING } },
        restaurantRecommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["dishes", "desserts", "drinks", "restaurantRecommendations"]
    },
    itinerary: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          dayNumber: { type: Type.INTEGER },
          date: { type: Type.STRING, description: "The specific date for this day (e.g. '15 Haziran 2024')" },
          title: { type: Type.STRING },
          weatherForecast: { type: Type.STRING, description: "Expected weather condition for this day/season (e.g., 'Güneşli, 25°C')" },
          activities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                placeName: { type: Type.STRING },
                description: { type: Type.STRING, description: "Concise, professional summary (3-4 sentences)." },
                type: { type: Type.STRING, enum: ["airport", "hotel", "sightseeing", "restaurant", "other"] },
                distanceFromPrevious: { type: Type.STRING },
                estimatedTime: { type: Type.STRING },
                locationHint: { type: Type.STRING },
                transportDetail: { 
                    type: Type.STRING, 
                    description: "Specific instruction on how to get HERE from the PREVIOUS activity. If it's the first activity (Airport), describe how to exit. If Hotel, describe Airport->Hotel transfer (Bus numbers, Metro lines, Taxi cost). If Car, describe parking/route." 
                }
              },
              required: ["placeName", "description", "type", "distanceFromPrevious", "estimatedTime", "locationHint", "transportDetail"]
            }
          }
        },
        required: ["dayNumber", "date", "title", "weatherForecast", "activities"]
      }
    }
  },
  required: ["destination", "hotel", "logistics", "foodGuide", "itinerary", "nearbyRecommendations"]
};

export const generateTravelPlan = async (input: TravelInput): Promise<TravelPlan> => {
  try {
    const ai = getGenAIClient();
    const model = "gemini-3-flash-preview";
    
    // Transport specific instructions
    let transportInstruction = "";
    if (input.transportMode === 'plane') {
      transportInstruction = `User is traveling by PLANE. 
      1. The FIRST activity of Day 1 MUST be "Arrival at [City Name] Airport".
      2. Then proceed to the Hotel or City Center.
      3. CRITICAL: In 'transportDetail', provide specific public transport options (Bus number, Metro line name) or Taxi estimate from the Airport to the Hotel.`;
    } else {
      transportInstruction = `User is traveling by PERSONAL CAR. 
      1. They are driving from ${input.departure} directly to ${input.city}.
      2. Do NOT include an Airport stop.
      3. CRITICAL: In 'transportDetail', provide driving directions or parking advice.`;
    }

    const prompt = `
      Create a highly professional, logical travel itinerary.
      
      Departure From: ${input.departure}
      Destination: ${input.city}, ${input.country}
      Dates: ${input.startDate} to ${input.endDate} (Inclusive).
      Accommodation: ${input.hotel ? input.hotel : "Not specified (Plan based on City Center)"}
      
      Transport Mode: ${input.transportMode.toUpperCase()}
      ${transportInstruction}
      
      Requirements:
      1. Language: Turkish (TR).
      2. Route must be logical (minimize travel time).
      3. Tone: Professional, informative, concise.
      4. Focus on 'transportDetail': Give actionable advice (e.g., "Take Metro Line M1A to Yenikapi").
      5. Weather: Estimate the weather for each day based on historical data for this season/month in the destination city.
      
      Response MUST be valid JSON matching the schema.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: travelPlanSchema,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    if (!response.text) {
      throw new Error("No response text from Gemini.");
    }

    const data = JSON.parse(response.text) as TravelPlan;
    return data;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Customize error message for better user experience
    if (error.message?.includes("400") || error.message?.includes("API key not valid")) {
      throw new Error("API Anahtarı Geçersiz (Hata Kodu: 400). Lütfen Vercel ayarlarında API_KEY'in başında/sonunda boşluk veya tırnak işareti olmadığından emin olun.");
    }
    
    throw error;
  }
};

export const updateTravelPlan = async (currentPlan: TravelPlan, userRequest: string): Promise<TravelPlan> => {
  try {
    const ai = getGenAIClient();
    const model = "gemini-3-flash-preview";

    const prompt = `
      You are a professional travel assistant. 
      Current Plan (JSON): ${JSON.stringify(currentPlan)}
      
      User Request to Modify: "${userRequest}"
      
      Task:
      1. Update the 'itinerary', 'foodGuide', 'nearbyRecommendations' or 'logistics' based on the user request.
      2. If the user asks to add a recommendation to the route, insert it into the most logical day and time slot to minimize travel distance.
      3. Keep the existing structure valid.
      4. Ensure new activities have detailed 'transportDetail' (how to get there).
      5. Language: Turkish.
      
      Return the FULL updated JSON matching the original schema.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: travelPlanSchema
      }
    });

    if (!response.text) {
      throw new Error("No response text from Gemini.");
    }

    const data = JSON.parse(response.text) as TravelPlan;
    return data;
  } catch (error: any) {
    console.error("Gemini Update Error:", error);
    if (error.message?.includes("400") || error.message?.includes("API key not valid")) {
       throw new Error("API Anahtarı Geçersiz. Vercel ayarlarını kontrol edin.");
    }
    throw error;
  }
};
