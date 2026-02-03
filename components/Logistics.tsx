
import React from 'react';
import { Logistics as LogisticsType, FoodGuide } from '../types';
import { Car, Utensils, Coffee, IceCream, Bus, CheckCircle2, AlertCircle } from 'lucide-react';

interface LogisticsProps {
  logistics: LogisticsType;
  food: FoodGuide;
}

const Logistics: React.FC<LogisticsProps> = ({ logistics, food }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 print-break">
      
      {/* Transport Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                 <Car className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Ulaşım & Lojistik</h3>
        </div>
        
        <div className="space-y-5">
          <div className="relative pl-4 border-l-2 border-blue-100">
            <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                Araç Kiralamalı mı?
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {logistics.carRentalAdvice}
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                <Bus className="w-4 h-4 text-slate-500"/> Şehir İçi Ulaşım İpuçları
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {logistics.generalTransportTips}
            </p>
          </div>
        </div>
      </div>

      {/* Food Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 hover:shadow-md transition-shadow relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

        <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                 <Utensils className="w-5 h-5 text-orange-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Lezzet Rehberi</h3>
        </div>

        <div className="space-y-6 relative z-10">
            <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Mutlaka Deneyin</h4>
                <div className="flex flex-wrap gap-2">
                    {food.dishes.map((dish, i) => (
                        <span key={i} className="px-3 py-1.5 bg-white border border-orange-100 text-orange-800 text-xs font-semibold rounded-lg shadow-sm">
                            {dish}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <IceCream className="w-3 h-3" /> Tatlılar
                    </h4>
                    <ul className="text-sm text-slate-600 space-y-2">
                        {food.desserts.map((d, i) => (
                            <li key={i} className="flex items-start gap-1.5 leading-snug">
                                <span className="w-1 h-1 rounded-full bg-orange-300 mt-1.5 shrink-0"></span> 
                                {d}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Coffee className="w-3 h-3" /> İçecekler
                    </h4>
                    <ul className="text-sm text-slate-600 space-y-2">
                        {food.drinks.map((d, i) => (
                            <li key={i} className="flex items-start gap-1.5 leading-snug">
                                <span className="w-1 h-1 rounded-full bg-orange-300 mt-1.5 shrink-0"></span> 
                                {d}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            <div className="pt-4 border-t border-slate-100 mt-2">
                 <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Mekan Önerileri</h4>
                 <p className="text-xs font-medium text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {food.restaurantRecommendations.join(", ")}
                 </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Logistics;
