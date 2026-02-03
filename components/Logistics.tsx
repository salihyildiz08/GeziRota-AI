import React from 'react';
import { Logistics as LogisticsType, FoodGuide } from '../types';
import { Car, Utensils, Coffee, IceCream, Bus } from 'lucide-react';

interface LogisticsProps {
  logistics: LogisticsType;
  food: FoodGuide;
}

const Logistics: React.FC<LogisticsProps> = ({ logistics, food }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 print-break">
      
      {/* Transport Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Car className="text-brand-600" /> Ulaşım & Araç Kiralama
        </h3>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-xl">
            <h4 className="font-semibold text-blue-800 text-sm mb-1 flex items-center gap-2">
                <Car className="w-4 h-4"/> Araç Kiralama Mantıklı mı?
            </h4>
            <p className="text-blue-900 text-sm leading-relaxed">
              {logistics.carRentalAdvice}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl">
            <h4 className="font-semibold text-slate-800 text-sm mb-1 flex items-center gap-2">
                <Bus className="w-4 h-4"/> Genel İpuçları
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {logistics.generalTransportTips}
            </p>
          </div>
        </div>
      </div>

      {/* Food Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Utensils className="text-orange-500" /> Lezzet Rehberi
        </h3>

        <div className="space-y-4">
            <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Ne Yemeli?</h4>
                <div className="flex flex-wrap gap-2">
                    {food.dishes.map((dish, i) => (
                        <span key={i} className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-lg font-medium border border-orange-100">
                            {dish}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <IceCream className="w-3 h-3" /> Tatlılar
                    </h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                        {food.desserts.map((d, i) => <li key={i}>• {d}</li>)}
                    </ul>
                </div>
                <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Coffee className="w-3 h-3" /> İçecekler
                    </h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                        {food.drinks.map((d, i) => <li key={i}>• {d}</li>)}
                    </ul>
                </div>
            </div>
            
            <div className="pt-2 border-t border-slate-100">
                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Mekan Önerileri</h4>
                 <p className="text-sm text-slate-600 italic">
                    {food.restaurantRecommendations.join(", ")}
                 </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Logistics;