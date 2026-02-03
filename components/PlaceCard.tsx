import React from 'react';
import { Activity } from '../types';
import { MapPin, Clock, Navigation, BedDouble, Plane, Utensils, Star, Info, Bus, Car } from 'lucide-react';

interface PlaceCardProps {
  activity: Activity;
  isLast: boolean;
  index: number;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ activity, isLast, index }) => {
  const getIcon = () => {
    switch (activity.type) {
      case 'airport': return <Plane className="w-5 h-5 text-white" />;
      case 'hotel': return <BedDouble className="w-5 h-5 text-white" />;
      case 'restaurant': return <Utensils className="w-5 h-5 text-white" />;
      default: return <Star className="w-5 h-5 text-white" />;
    }
  };

  const getColors = () => {
    switch (activity.type) {
      case 'airport': return { bg: 'bg-slate-600', border: 'border-slate-600', ring: 'ring-slate-100' };
      case 'hotel': return { bg: 'bg-indigo-600', border: 'border-indigo-600', ring: 'ring-indigo-100' };
      case 'restaurant': return { bg: 'bg-orange-500', border: 'border-orange-500', ring: 'ring-orange-100' };
      default: return { bg: 'bg-brand-600', border: 'border-brand-600', ring: 'ring-brand-100' };
    }
  };

  const colors = getColors();

  return (
    <div className="relative pl-10 sm:pl-16 py-2 print-break group">
      {/* Vertical Timeline Line */}
      {!isLast && (
        <div className="absolute left-[19px] sm:left-[43px] top-10 bottom-[-10px] w-0.5 bg-slate-200 group-hover:bg-slate-300 transition-colors" />
      )}

      {/* Node (Circle Icon) */}
      <div className={`absolute left-[3px] sm:left-[27px] top-0 w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center shadow-md ring-4 ring-white z-10`}>
        {getIcon()}
      </div>

      {/* Content Card (Schema Style) */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 hover:border-brand-200 hover:shadow-md transition-all relative">
        
        {/* Transport Detail Banner (Top of card, explaining how we got here) */}
        {activity.transportDetail && (
            <div className="mb-4 pb-3 border-b border-slate-100 flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-md -mx-2 -mt-2">
                <div className="mt-0.5 shrink-0">
                    {activity.type === 'airport' ? <Info className="w-4 h-4 text-slate-400" /> : <Bus className="w-4 h-4 text-brand-600" />}
                </div>
                <div>
                    <span className="font-bold text-slate-700 uppercase block text-[10px] tracking-wider mb-0.5">Ulaşım Bilgisi</span>
                    <span className="leading-relaxed">{activity.transportDetail}</span>
                </div>
            </div>
        )}

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          
          <div className="flex-1">
             <div className="flex items-center gap-3 mb-1">
                <h4 className="text-lg font-bold text-slate-800">{activity.placeName}</h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide border ${colors.bg} bg-opacity-10 text-${colors.bg.replace('bg-', '')}`}>
                    {activity.type === 'other' ? 'Ziyaret' : activity.type}
                </span>
             </div>
             
             <div className="text-xs text-slate-500 font-medium mb-3 flex items-center gap-2">
                <MapPin className="w-3 h-3" /> {activity.locationHint}
             </div>

             <p className="text-slate-600 text-sm leading-relaxed">
                {activity.description}
             </p>
          </div>

          {/* Logistics Box (Right Side) */}
          <div className="flex flex-row md:flex-col gap-3 min-w-[140px] md:border-l md:border-slate-100 md:pl-4">
             {activity.distanceFromPrevious && activity.distanceFromPrevious !== "0 km" && (
                <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                        <Navigation className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-slate-400 font-bold">Mesafe</span>
                        <span className="text-xs font-bold">{activity.distanceFromPrevious}</span>
                    </div>
                </div>
             )}
             
             <div className="flex items-center gap-2 text-slate-600">
                 <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-slate-400" />
                </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-slate-400 font-bold">Süre</span>
                    <span className="text-xs font-bold">{activity.estimatedTime}</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlaceCard;