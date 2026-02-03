
import React, { useState } from 'react';
import { TravelPlan } from '../types';
import PlaceCard from './PlaceCard';
import Logistics from './Logistics';
import NearbyPlaces from './NearbyPlaces';
import { Printer, RefreshCw, Send, Plus, Calendar, Map, CloudSun } from 'lucide-react';

interface ItineraryViewProps {
  plan: TravelPlan;
  onUpdate: (request: string) => Promise<void>;
  isUpdating: boolean;
}

const ItineraryView: React.FC<ItineraryViewProps> = ({ plan, onUpdate, isUpdating }) => {
  const [updateRequest, setUpdateRequest] = useState('');
  const [showUpdateInput, setShowUpdateInput] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateRequest.trim()) return;
    await onUpdate(updateRequest);
    setUpdateRequest('');
    setShowUpdateInput(false);
  };

  const handleAddRecommendation = async (placeName: string) => {
    const prompt = `Lütfen önerilenlerden "${placeName}" mekanını bu plana, coğrafi olarak ve zaman açısından en uygun güne ve saate ekle. Ayrıca ulaşım detaylarını güncelle.`;
    await onUpdate(prompt);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-12">
      
      {/* Header Summary Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
                <div className="flex items-center gap-2 text-brand-600 text-sm font-bold uppercase tracking-wider mb-1">
                    <Map className="w-4 h-4" /> Seyahat Planı
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900">{plan.destination}</h1>
                <p className="text-slate-500 mt-1 flex items-center gap-2">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-medium text-slate-600">Konaklama</span> 
                    {plan.hotel || 'Belirtilmedi'}
                </p>
            </div>
            <div className="flex items-center gap-3 no-print">
                <button 
                    onClick={() => setShowUpdateInput(!showUpdateInput)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-100 transition-colors text-sm"
                >
                    <Plus className="w-4 h-4" /> Düzenle
                </button>
                <button 
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 text-sm"
                >
                    <Printer className="w-4 h-4" /> PDF / Yazdır
                </button>
            </div>
        </div>

        {/* Update Input */}
        {(showUpdateInput || isUpdating) && (
            <div className="bg-brand-50 border border-brand-100 p-4 rounded-lg mb-4 no-print">
                <form onSubmit={handleUpdateSubmit} className="flex gap-3">
                    <input 
                        type="text" 
                        value={updateRequest}
                        onChange={(e) => setUpdateRequest(e.target.value)}
                        placeholder="Plan üzerinde yapmak istediğiniz değişikliği yazın..."
                        className="flex-1 px-4 py-2 rounded-md border border-brand-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500 placeholder:text-slate-400"
                        disabled={isUpdating}
                    />
                    <button 
                        type="submit" 
                        disabled={isUpdating || !updateRequest.trim()}
                        className="bg-brand-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-brand-700 transition-colors flex items-center gap-2"
                    >
                        {isUpdating ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                        {isUpdating ? '...' : 'Uygula'}
                    </button>
                </form>
            </div>
        )}
        
        {/* Logistics Summary */}
        <Logistics logistics={plan.logistics} food={plan.foodGuide} />
      </div>

      {/* Main Timeline Itinerary */}
      <div className="space-y-12">
        {plan.itinerary.map((day) => (
          <div key={day.dayNumber} className="relative">
            
            {/* Day Header - Sticky for web, static for print */}
            <div className="sticky top-16 z-30 bg-slate-50/95 backdrop-blur py-4 border-b border-slate-200 mb-8 print:static print:bg-white print:border-b-2 print:mb-4">
               <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex flex-col items-center justify-center shadow-lg shrink-0 print:border print:border-black">
                          <span className="text-[10px] font-medium uppercase opacity-60">Gün</span>
                          <span className="text-xl font-bold leading-none">{day.dayNumber}</span>
                      </div>
                      <div>
                          <h2 className="text-xl font-bold text-slate-800">{day.title}</h2>
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> {day.date || 'Tarih Belirtilmedi'}
                          </p>
                      </div>
                   </div>

                   {/* Weather Badge */}
                   {day.weatherForecast && (
                       <div className="flex flex-col items-end justify-center px-4 border-l border-slate-200 hidden sm:flex print:flex">
                           <div className="flex items-center gap-1.5 text-brand-600 font-bold text-sm">
                               <CloudSun className="w-4 h-4" />
                               <span>Hava Durumu</span>
                           </div>
                           <span className="text-xs text-slate-600 font-medium">{day.weatherForecast}</span>
                       </div>
                   )}
               </div>
               
               {/* Mobile Weather (visible only on small screens) */}
               {day.weatherForecast && (
                  <div className="mt-3 flex items-center gap-2 sm:hidden text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 inline-flex print:hidden">
                      <CloudSun className="w-3 h-3 text-brand-500" />
                      {day.weatherForecast}
                  </div>
               )}
            </div>

            {/* Activities Timeline */}
            <div className="">
               {day.activities.map((activity, index) => (
                 <PlaceCard 
                    key={index} 
                    index={index}
                    activity={activity} 
                    isLast={index === day.activities.length - 1} 
                 />
               ))}
            </div>
          </div>
        ))}
      </div>

      {/* Nearby Places */}
      <div className="mt-12">
        <NearbyPlaces 
            recommendations={plan.nearbyRecommendations} 
            onAddToRoute={handleAddRecommendation}
            isUpdating={isUpdating}
        />
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 text-center text-slate-400 text-xs no-print">
        <p>&copy; {new Date().getFullYear()} GeziRota AI. Profesyonel Seyahat Asistanı.</p>
      </div>
    </div>
  );
};

export default ItineraryView;
