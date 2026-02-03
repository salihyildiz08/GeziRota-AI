
export interface TravelInput {
  departure: string; 
  country: string;
  city: string;
  hotel?: string;
  startDate: string;
  endDate: string;
  transportMode: 'plane' | 'car';
}

export interface Activity {
  placeName: string;
  description: string;
  type: 'airport' | 'hotel' | 'sightseeing' | 'restaurant' | 'other';
  distanceFromPrevious: string;
  estimatedTime: string;
  locationHint: string;
  transportDetail: string;
  transportCost: string; // New field for specific trip cost
}

export interface DayPlan {
  dayNumber: number;
  date: string;
  title: string;
  weatherForecast: string;
  activities: Activity[];
}

// New detailed culinary structures
export interface CulinaryItem {
  name: string;
  description: string;
  bestPlaces: string; // Specific restaurants for this item
  priceRange: string; // e.g. "10-15€ Kişi Başı"
}

export interface CulinaryGuide {
  savoryDelights: CulinaryItem[]; // Yemekler
  sweetTreats: CulinaryItem[];    // Tatlılar
  localDrinks: CulinaryItem[];    // İçecekler
}

export interface Logistics {
  carRentalAdvice: string;
  carRentalCost: string; // Estimated cost
  generalTransportTips: string;
  publicTransportCost: string; // Estimated cost
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
  culinaryGuide: CulinaryGuide; // Renamed from foodGuide to match new structure
  itinerary: DayPlan[];
  nearbyRecommendations: Recommendation[];
}

export interface ApiError {
  message: string;
}
