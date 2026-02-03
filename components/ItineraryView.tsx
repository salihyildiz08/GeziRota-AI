
import React, { useState } from 'react';
import { TravelPlan } from '../types';
import PlaceCard from './PlaceCard';
import Logistics from './Logistics';
import NearbyPlaces from './NearbyPlaces';
import { Printer, RefreshCw, Send, Plus, Calendar, MapPin, CloudSun, Map } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto animate-fade-in pb-20">
      
      {/* Hero Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl shadow-2xl shadow-slate-200/50 mb-10 p-8 md:p-12 print:bg-white print:text-black print:shadow-none print:border print:p-0">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-brand-500 opacity-10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
                <div className="flex items-center gap-2 text-brand-300 text-xs font-bold uppercase tracking-[0.2em] mb-3">
                    <Map className="w-4 h-4" /> Seyahat Rotası
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-2">
                    {plan.destination}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-slate-300 font-medium text-sm md:text-base">
                    <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
                        <MapPin className="w-4 h-4 text-brand-400" />
                        {plan.hotel || 'Merkez Konaklama'}
                    </span>
                    <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
                        <Calendar className="w-4 h-4 text-brand-400" />
                        {plan.itinerary.length} Günlük Plan
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3 no-print">
                <button 
                    onClick={() => setShowUpdateInput(!showUpdateInput)}
                    className="group flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-white font-semibold hover:bg-white/20 transition-all text-sm"
                >
                    <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" /> 
                    <span className="hidden sm:inline">Düzenle</span>
                </button>
                <button 
                    onClick={handlePrint}
                    className="group flex items-center gap-2 px-5 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-brand-50 transition-colors shadow-lg shadow-black/20 text-sm"
                >
                    <Printer className="w-4 h-4 group-hover:scale-110 transition-transform" /> 
                    <span className="hidden sm:inline">PDF / Yazdır</span>
                </button>
            </div>
        </div>
      </div>

      {/* Update Input Area */}
      {(showUpdateInput || isUpdating) && (
          <div className="bg-white/80 backdrop-blur-xl border border-brand-100 p-1 rounded-2xl mb-8 shadow-xl shadow-brand-100/50 no-print sticky top-24 z-40">
              <form onSubmit={handleUpdateSubmit} className="flex gap-2">
                  <input 
                      type="text" 
                      value={updateRequest}
                      onChange={(e) => setUpdateRequest(e.target.value)}
                      placeholder="Plan üzerinde ne değiştirmek istersiniz? (Örn: 2. güne öğle yemeği ekle...)"
                      className="flex-1 px-6 py-4 rounded-xl bg-transparent text-slate-800 text-sm font-medium focus:outline-none placeholder:text-slate-400"
                      disabled={isUpdating}
                  />
                  <button 
                      type="submit" 
                      disabled={isUpdating || !updateRequest.trim()}
                      className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg"
                  >
                      {isUpdating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      {isUpdating ? 'Güncelleniyor...' : 'Uygula'}
                  </button>
              </form>
          </div>
      )}
      
      {/* Logistics & Tips Section */}
      <Logistics logistics={plan.logistics} food={plan.culinaryGuide} />

      {/* Main Timeline Itinerary */}
      <div className="space-y-16 mt-16">
        {plan.itinerary.map((day) => (
          <div key={day.dayNumber} className="relative group">
            
            {/* Day Header - Sticky & Floating */}
            <div className="sticky top-4 z-30 mb-8 print:static print:mb-4">
               <div className="relative overflow-hidden bg-white/90 backdrop-blur-md border border-slate-200/60 shadow-lg shadow-slate-200/40 rounded-2xl p-4 flex items-center justify-between transition-all print:shadow-none print:border-none print:bg-transparent print:p-0">
                   {/* Background Gradient Line */}
                   <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500 opacity-20"></div>

                   <div className="flex items-center gap-5">
                      <div className="flex flex-col items-center justify-center w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-950 text-white rounded-2xl shadow-lg shrink-0 print:border print:border-black print:bg-white print:text-black">
                          <span className="text-[10px] font-bold uppercase opacity-60 tracking-wider">Gün</span>
                          <span className="text-2xl font-black leading-none">{day.dayNumber}</span>
                      </div>
                      <div>
                          <h2 className="text-xl font-bold text-slate-900 tracking-tight">{day.title}</h2>
                          <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mt-0.5">
                              <Calendar className="w-3.5 h-3.5" /> 
                              {day.date || `Seyahatin ${day.dayNumber}. Günü`}
                          </p>
                      </div>
                   </div>

                   {/* Weather Badge */}
                   {day.weatherForecast && (
                       <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                           <div className="p-2 bg-white rounded-full shadow-sm">
                                <CloudSun className="w-5 h-5 text-orange-500" />
                           </div>
                           <div className="flex flex-col text-right">
                                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Tahmin</span>
                                <span className="text-sm font-bold text-slate-700">{day.weatherForecast}</span>
                           </div>
                       </div>
                   )}
               </div>
               
               {/* Mobile Weather Pill */}
               {day.weatherForecast && (
                  <div className="mt-2 flex sm:hidden items-center justify-center gap-2 text-xs font-semibold text-slate-600 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-slate-200 shadow-sm mx-auto w-max">
                      <CloudSun className="w-3.5 h-3.5 text-orange-500" />
                      {day.weatherForecast}
                  </div>
               )}
            </div>

            {/* Activities Timeline */}
            <div className="pl-4 sm:pl-8">
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

      {/* Nearby Places Section */}
      <div className="mt-20">
        <NearbyPlaces 
            recommendations={plan.nearbyRecommendations} 
            onAddToRoute={handleAddRecommendation}
            isUpdating={isUpdating}
        />
      </div>

      <div className="mt-20 pt-10 border-t border-slate-200 flex flex-col items-center justify-center text-center gap-4 no-print opacity-60 hover:opacity-100 transition-opacity">
        <Map className="w-8 h-8 text-slate-300" />
        <p className="text-xs font-medium text-slate-400">
            &copy; {new Date().getFullYear()} GeziRota AI<br/>Profesyonel Seyahat Asistanı
        </p>
      </div>
    </div>
  );
};

export default ItineraryView;
