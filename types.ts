export interface TravelInput {
  departure: string; 
  country: string;
  city: string;
  hotel?: string;
  days: number;
  transportMode: 'plane' | 'car';
}

export interface Activity {
  placeName: string;
  description: string;
  type: 'airport' | 'hotel' | 'sightseeing' | 'restaurant' | 'other';
  distanceFromPrevious: string;
  estimatedTime: string;
  locationHint: string;
  transportDetail: string; // New: How to get here from previous location
}

export interface DayPlan {
  dayNumber: number;
  title: string;
  activities: Activity[];
}

export interface FoodGuide {
  dishes: string[];
  desserts: string[];
  drinks: string[];
  restaurantRecommendations: string[];
}

export interface Logistics {
  carRentalAdvice: string;
  generalTransportTips: string;
}

export interface Recommendation {
  placeName: string;
  description: string;
  distanceFromCenter: string;
  reasonToVisit: string;
}

export interface TravelPlan {
  destination: string;
  hotel: string;
  logistics: Logistics;
  foodGuide: FoodGuide;
  itinerary: DayPlan[];
  nearbyRecommendations: Recommendation[];
}

export interface ApiError {
  message: string;
}