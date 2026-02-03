
import React from 'react';
import { Activity } from '../types';
import { MapPin, Clock, Navigation, BedDouble, Plane, Utensils, Star, Info, Bus, ArrowDown } from 'lucide-react';

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
      case 'sightseeing': return <Star className="w-5 h-5 text-white" />;
      default: return <MapPin className="w-5 h-5 text-white" />;
    }
  };

  const getTypeStyle = () => {
    switch (activity.type) {
      case 'airport': return { 
          bg: 'bg-slate-600', 
          gradient: 'from-slate-600 to-slate-700',
          light: 'bg-slate-50 text-slate-700',
          shadow: 'shadow-slate-200'
      };
      case 'hotel': return { 
          bg: 'bg-indigo-600', 
          gradient: 'from-indigo-500 to-violet-600',
          light: 'bg-indigo-50 text-indigo-700',
          shadow: 'shadow-indigo-200'
      };
      case 'restaurant': return { 
          bg: 'bg-orange-500', 
          gradient: 'from-orange-400 to-red-500',
          light: 'bg-orange-50 text-orange-700',
          shadow: 'shadow-orange-200'
      };
      case 'sightseeing': return { 
          bg: 'bg-emerald-500', 
          gradient: 'from-emerald-400 to-teal-500',
          light: 'bg-emerald-50 text-emerald-700',
          shadow: 'shadow-emerald-200'
      };
      default: return { 
          bg: 'bg-blue-500', 
          gradient: 'from-blue-400 to-cyan-500',
          light: 'bg-blue-50 text-blue-700',
          shadow: 'shadow-blue-200'
      };
    }
  };

  const styles = getTypeStyle();

  return (
    <div className="relative pl-8 sm:pl-12 py-3 print-break group">
      
      {/* Timeline Line (Modernized) */}
      {!isLast && (
        <div className="absolute left-[15px] sm:left-[23px] top-12 bottom-[-12px] w-0.5 bg-slate-200 group-hover:bg-slate-300 transition-colors">
            {/* Optional arrows or dots on the line could go here */}
        </div>
      )}

      {/* Node (Icon) */}
      <div className={`absolute left-0 sm:left-1 top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${styles.gradient} flex items-center justify-center shadow-lg shadow-black/10 ring-4 ring-white z-20`}>
        {getIcon()}
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 p-0 transition-all duration-300 overflow-hidden print:shadow-none print:border-slate-300">
        
        {/* Transport Connector (Header of Card) */}
        {activity.transportDetail && (
            <div className="bg-slate-50 border-b border-slate-100 px-5 py-3 flex items-start gap-3">
                <div className="p-1.5 bg-white rounded-lg shadow-sm border border-slate-100 shrink-0 mt-0.5">
                   {activity.type === 'airport' ? <Info className="w-3.5 h-3.5 text-slate-400" /> : <Bus className="w-3.5 h-3.5 text-brand-500" />}
                </div>
                <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Oraya Nasıl Gidilir?</span>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{activity.transportDetail}</p>
                </div>
            </div>
        )}

        <div className="p-5 sm:p-6 flex flex-col md:flex-row gap-6">
          
          {/* Main Info */}
          <div className="flex-1">
             <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${styles.light}`}>
                    {activity.type === 'other' ? 'Ziyaret' : activity.type === 'sightseeing' ? 'Gezilecek Yer' : activity.type}
                </span>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {activity.locationHint}
                </span>
             </div>
             
             <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 leading-tight">{activity.placeName}</h4>

             <p className="text-slate-600 text-sm leading-relaxed font-normal">
                {activity.description}
             </p>
          </div>

          {/* Metrics Column (Time/Distance) */}
          <div className="flex flex-row md:flex-col gap-3 min-w-[140px] md:border-l md:border-slate-100 md:pl-6 md:justify-center">
             {activity.distanceFromPrevious && activity.distanceFromPrevious !== "0 km" && (
                <div className="flex items-center gap-3 group/metric">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover/metric:bg-blue-50 group-hover/metric:text-blue-500 transition-colors">
                        <Navigation className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-slate-400 font-bold">Mesafe</span>
                        <span className="text-sm font-bold text-slate-700">{activity.distanceFromPrevious}</span>
                    </div>
                </div>
             )}
             
             <div className="flex items-center gap-3 group/metric">
                 <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover/metric:bg-orange-50 group-hover/metric:text-orange-500 transition-colors">
                    <Clock className="w-4 h-4" />
                </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-slate-400 font-bold">Süre</span>
                    <span className="text-sm font-bold text-slate-700">{activity.estimatedTime}</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
