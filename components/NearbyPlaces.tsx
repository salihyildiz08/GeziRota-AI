
import React from 'react';
import { Recommendation } from '../types';
import { Compass, MapPin, Plus, ArrowUpRight } from 'lucide-react';

interface NearbyPlacesProps {
  recommendations: Recommendation[];
  onAddToRoute: (placeName: string) => void;
  isUpdating: boolean;
}

const NearbyPlaces: React.FC<NearbyPlacesProps> = ({ recommendations, onAddToRoute, isUpdating }) => {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="bg-slate-50/50 rounded-3xl p-8 mb-12 border border-slate-200 print-break relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 via-brand-500 to-indigo-500 opacity-30"></div>
      
      <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
             <Compass className="w-6 h-6 text-brand-600" />
          </div>
          <div>
              <h3 className="text-xl font-bold text-slate-900">Alternatif Rota Önerileri</h3>
              <p className="text-sm text-slate-500">Zamanınız kalırsa bu noktaları değerlendirebilirsiniz.</p>
          </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((place, idx) => (
           <div key={idx} className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
              
              <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-brand-50 transition-colors">
                      <MapPin className="w-5 h-5 text-slate-400 group-hover:text-brand-500" />
                  </div>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200">
                    {place.distanceFromCenter}
                  </span>
              </div>

              <h4 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-brand-600 transition-colors">
                  {place.placeName}
              </h4>
              
              <p className="text-sm text-slate-500 mb-6 leading-relaxed flex-1">
                {place.description}
              </p>
              
              <div className="mt-auto pt-4 border-t border-dashed border-slate-200">
                 <div className="mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Neden Gitmeli?</span>
                    <p className="text-xs text-slate-700 font-medium">{place.reasonToVisit}</p>
                 </div>
                
                <button 
                    onClick={() => onAddToRoute(place.placeName)}
                    disabled={isUpdating}
                    className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-xl transition-all border border-slate-200 hover:border-slate-900 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                >
                    <Plus className="w-3.5 h-3.5" /> Rotaya Ekle
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </button>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyPlaces;
