import React from 'react';
import { Recommendation } from '../types';
import { Compass, MapPin, PlusCircle } from 'lucide-react';

interface NearbyPlacesProps {
  recommendations: Recommendation[];
  onAddToRoute: (placeName: string) => void;
  isUpdating: boolean;
}

const NearbyPlaces: React.FC<NearbyPlacesProps> = ({ recommendations, onAddToRoute, isUpdating }) => {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="bg-slate-50 rounded-xl p-6 mb-12 border border-slate-200 print-break">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Compass className="w-5 h-5 text-brand-600" />
        Alternatif Rota Önerileri
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((place, idx) => (
           <div key={idx} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:border-brand-200 transition-colors flex flex-col">
              <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-slate-800 text-sm">{place.placeName}</h4>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium">
                    {place.distanceFromCenter}
                  </span>
              </div>
              <p className="text-xs text-slate-500 mb-3 line-clamp-3 flex-1">
                {place.description}
              </p>
              
              <div className="mt-auto space-y-3">
                <div className="flex items-start gap-2 pt-3 border-t border-slate-50">
                    <MapPin className="w-3 h-3 text-brand-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-brand-700 font-medium leading-tight">
                        {place.reasonToVisit}
                    </p>
                </div>
                
                <button 
                    onClick={() => onAddToRoute(place.placeName)}
                    disabled={isUpdating}
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <PlusCircle className="w-3 h-3" /> Rotaya Dahil Et
                </button>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyPlaces;