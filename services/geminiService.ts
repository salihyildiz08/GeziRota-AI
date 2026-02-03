
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { TravelPlan, TravelInput } from "../types";

// Helper function to get a clean, valid API client
const getGenAIClient = () => {
  let apiKey = process.env.API_KEY;

  if (apiKey) {
    apiKey = apiKey.replace(/["']/g, "").trim();
  }

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
        carRentalCost: { type: Type.STRING, description: "Estimated daily cost for renting a standard car (e.g. 'Günlük 40-50€')." },
        generalTransportTips: { type: Type.STRING, description: "General public transport card names, taxi apps, etc." },
        publicTransportCost: { type: Type.STRING, description: "Estimated cost for a single ticket or day pass (e.g. 'Metro 2.50€, Günlük Kart 8€')." },
      },
      required: ["carRentalAdvice", "carRentalCost", "generalTransportTips", "publicTransportCost"]
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
    culinaryGuide: {
      type: Type.OBJECT,
      description: "A detailed guide about what to eat, WHERE to eat it, and how much it costs.",
      properties: {
        savoryDelights: { 
            type: Type.ARRAY, 
            description: "Top 3-4 local main dishes.",
            items: { 
                type: Type.OBJECT, 
                properties: {
                    name: { type: Type.STRING, description: "Local name of the dish" },
                    description: { type: Type.STRING, description: "Short appetizing description of ingredients" },
                    bestPlaces: { type: Type.STRING, description: "Names of 1-2 specific famous restaurants known for THIS dish." },
                    priceRange: { type: Type.STRING, description: "Average price per person for this meal (e.g. '15-20€', '250-300 TL')." }
                } 
            } 
        },
        sweetTreats: { 
            type: Type.ARRAY, 
            description: "Top 2-3 local desserts.",
            items: { 
                type: Type.OBJECT, 
                properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    bestPlaces: { type: Type.STRING },
                    priceRange: { type: Type.STRING }
                } 
            } 
        },
        localDrinks: { 
            type: Type.ARRAY, 
            description: "Top 2 local drinks.",
            items: { 
                type: Type.OBJECT, 
                properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    bestPlaces: { type: Type.STRING },
                    priceRange: { type: Type.STRING }
                } 
            } 
        },
      },
      required: ["savoryDelights", "sweetTreats", "localDrinks"]
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
                    description: "Specific instruction on how to get HERE from the PREVIOUS activity." 
                },
                transportCost: {
                    type: Type.STRING,
                    description: "Estimated cost for this specific leg of the journey (e.g. 'Metro 2.50€', 'Taksi ~15€', 'Yürüyüş - Ücretsiz')."
                }
              },
              required: ["placeName", "description", "type", "distanceFromPrevious", "estimatedTime", "locationHint", "transportDetail", "transportCost"]
            }
          }
        },
        required: ["dayNumber", "date", "title", "weatherForecast", "activities"]
      }
    }
  },
  required: ["destination", "hotel", "logistics", "culinaryGuide", "itinerary", "nearbyRecommendations"]
};

export const generateTravelPlan = async (input: TravelInput): Promise<TravelPlan> => {
  try {
    const ai = getGenAIClient();
    const model = "gemini-3-flash-preview";
    
    // Transport specific instructions
    let transportInstruction = "";
    if (input.transportMode === 'plane') {
      transportInstruction = `User is traveling by PLANE. 
      Day 1 Start: "Arrival at [City Name] Airport". Then "Transfer to Hotel".
      Transport Detail for Day 1: Provide Bus/Metro/Taxi options from Airport to Hotel.`;
    } else {
      transportInstruction = `User is traveling by PERSONAL CAR. 
      Day 1 Start: "Arrival in [City Name]". Then "Check-in at Hotel".
      Transport Detail for Day 1: Parking advice.`;
    }

    const prompt = `
      Create a highly professional, logical travel itinerary.
      
      Departure From: ${input.departure}
      Destination: ${input.city}, ${input.country}
      Dates: ${input.startDate} to ${input.endDate} (Inclusive).
      Accommodation: ${input.hotel ? input.hotel : "City Center (Not specified)"}
      
      Transport Mode: ${input.transportMode.toUpperCase()}
      ${transportInstruction}
      
      CRITICAL ROUTING RULES (The Sandwich Rule):
      1. **Start of Day**: EVERY Day (except Day 1 arrival moment) MUST start with an activity implying leaving the hotel (e.g., "Güne Başlangıç: Otelden Ayrılış" or the first sightseeing spot).
         - IMPORTANT: The 'distanceFromPrevious' for the first activity of the day must be calculated FROM THE HOTEL, not from yesterday's last stop.
         - 'transportDetail' must describe getting from Hotel -> First Stop.
      
      2. **End of Day**: EVERY Day MUST explicitly end with an activity named "Otele Dönüş" (Return to Hotel) or "Akşam Yemeği ve Otele Dönüş".
         - 'transportDetail' must describe getting from the last spot -> Back to Hotel.
         - Type for this activity should be 'hotel'.

      3. **Logic**: Reset the location context every morning. Do not calculate travel time from Day 1 Night to Day 2 Morning. Day 2 Morning starts fresh from the hotel base.

      CRITICAL CULINARY & LOGISTICS RULES:
      1. **Specific Recommendations**: Do NOT just list "Pizza". List "Pizza Margherita" and for 'bestPlaces' provide a REAL, FAMOUS restaurant name in that city (e.g., "L'Antica Pizzeria da Michele").
      2. **Professional Descriptions**: Describe the food appetizingly (ingredients, taste profile).
      3. **Costs**: Include realistic estimated costs for transport (ticket prices, daily rental, specific trip cost) and food (average meal price) in the destination's local currency or Euro/USD.
      
      Requirements:
      1. Language: Turkish (TR).
      2. Route must be logical (minimize travel time).
      3. Tone: Professional, informative, concise.
      4. Weather: Estimate the weather for each day based on historical data for this season/month.
      
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
      1. Update the 'itinerary', 'culinaryGuide', 'nearbyRecommendations' or 'logistics' based on the user request.
      2. If updating food, ensure to provide descriptions and specific restaurant names.
      3. **MAINTAIN THE LOGIC**: Ensure days still start/end at the Hotel.
      4. Language: Turkish.
      
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
