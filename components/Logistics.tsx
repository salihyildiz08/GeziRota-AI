
import React, { useState } from 'react';
import { Logistics as LogisticsType, CulinaryGuide, CulinaryItem } from '../types';
import { Car, Utensils, Coffee, IceCream, Bus, ChefHat, MapPin, Info } from 'lucide-react';

interface LogisticsProps {
  logistics: LogisticsType;
  food: CulinaryGuide;
}

const Logistics: React.FC<LogisticsProps> = ({ logistics, food }) => {
  const [activeTab, setActiveTab] = useState<'savory' | 'sweet' | 'drink'>('savory');

  const renderCulinaryItem = (item: CulinaryItem, idx: number) => (
    <div key={idx} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm mb-3 last:mb-0 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
        </div>
        <p className="text-xs text-slate-500 mb-3 italic leading-relaxed">
            "{item.description}"
        </p>
        <div className="flex items-start gap-2 bg-orange-50/50 p-2.5 rounded-lg border border-orange-100">
            <MapPin className="w-3.5 h-3.5 text-orange-500 mt-0.5 shrink-0" />
            <div>
                <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider block mb-0.5">En İyi Mekan</span>
                <span className="text-xs font-semibold text-slate-800">{item.bestPlaces}</span>
            </div>
        </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 print-break">
      
      {/* Transport Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 hover:shadow-md transition-shadow h-full">
        <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                 <Car className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Ulaşım & Lojistik</h3>
        </div>
        
        <div className="space-y-6">
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

      {/* Culinary Section - Advanced */}
      <div className="bg-slate-50/50 rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-100 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none opacity-50"></div>

        <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shadow-sm">
                    <ChefHat className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Lezzet Rehberi</h3>
            </div>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-white/60 backdrop-blur rounded-xl border border-slate-200 mb-5 relative z-10">
            <button 
                onClick={() => setActiveTab('savory')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'savory' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
            >
                <Utensils className="w-3.5 h-3.5" /> Ana Yemekler
            </button>
            <button 
                onClick={() => setActiveTab('sweet')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'sweet' ? 'bg-pink-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
            >
                <IceCream className="w-3.5 h-3.5" /> Tatlılar
            </button>
            <button 
                onClick={() => setActiveTab('drink')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'drink' ? 'bg-amber-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
            >
                <Coffee className="w-3.5 h-3.5" /> İçecekler
            </button>
        </div>

        {/* Content Area with Fade Effect */}
        <div className="flex-1 relative z-10 animate-fade-in">
            {activeTab === 'savory' && (
                <div className="space-y-3">
                    {food.savoryDelights.map((item, i) => renderCulinaryItem(item, i))}
                </div>
            )}
            {activeTab === 'sweet' && (
                 <div className="space-y-3">
                    {food.sweetTreats.map((item, i) => renderCulinaryItem(item, i))}
                </div>
            )}
            {activeTab === 'drink' && (
                 <div className="space-y-3">
                    {food.localDrinks.map((item, i) => renderCulinaryItem(item, i))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Logistics;
