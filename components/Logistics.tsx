
import React, { useState } from 'react';
import { Logistics as LogisticsType, CulinaryGuide, CulinaryItem } from '../types';
import { Car, Utensils, Coffee, IceCream, Bus, ChefHat, MapPin, Wallet } from 'lucide-react';

interface LogisticsProps {
  logistics: LogisticsType;
  food: CulinaryGuide;
}

const Logistics: React.FC<LogisticsProps> = ({ logistics, food }) => {
  const [activeTab, setActiveTab] = useState<'savory' | 'sweet' | 'drink'>('savory');

  const renderCulinaryItem = (item: CulinaryItem, idx: number) => (
    <div key={idx} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm mb-3 last:mb-0 hover:shadow-md transition-shadow print:shadow-none print:border-slate-300 print:mb-4 print:break-inside-avoid">
        <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
            {item.priceRange && (
                <span className="shrink-0 ml-2 px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-full border border-green-100 print:bg-transparent print:border-slate-200 print:text-slate-600">
                    {item.priceRange}
                </span>
            )}
        </div>
        <p className="text-xs text-slate-500 mb-3 italic leading-relaxed print:text-slate-700">
            "{item.description}"
        </p>
        <div className="flex items-start gap-2 bg-orange-50/50 p-2.5 rounded-lg border border-orange-100 print:bg-transparent print:border-slate-200 print:p-0">
            <MapPin className="w-3.5 h-3.5 text-orange-500 mt-0.5 shrink-0 print:text-slate-900" />
            <div>
                <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider block mb-0.5 print:text-slate-500">En İyi Mekan</span>
                <span className="text-xs font-semibold text-slate-800">{item.bestPlaces}</span>
            </div>
        </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 print:block">
      
      {/* Transport Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 hover:shadow-md transition-shadow h-full print:mb-6 print:shadow-none print:border print:border-slate-300 print:rounded-xl">
        <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center print:border print:border-slate-200">
                 <Car className="w-5 h-5 text-blue-600 print:text-black" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Ulaşım & Lojistik</h3>
        </div>
        
        <div className="space-y-6">
          <div className="relative pl-4 border-l-2 border-blue-100 print:border-l-4 print:border-slate-300">
            <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                Araç Kiralamalı mı?
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed text-justify mb-2">
              {logistics.carRentalAdvice}
            </p>
            {logistics.carRentalCost && (
                <div className="flex items-center gap-2 mt-2 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg w-max print:bg-transparent print:border print:border-slate-200 print:text-slate-700">
                    <Wallet className="w-3.5 h-3.5" />
                    Tahmini: {logistics.carRentalCost}
                </div>
            )}
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 print:bg-white print:border-slate-200 print:p-0 print:pt-4">
            <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                <Bus className="w-4 h-4 text-slate-500"/> Şehir İçi Ulaşım İpuçları
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed text-justify mb-2">
              {logistics.generalTransportTips}
            </p>
             {logistics.publicTransportCost && (
                <div className="flex items-center gap-2 mt-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg w-max print:border-slate-300">
                    <Wallet className="w-3.5 h-3.5" />
                    Bilet/Kart: {logistics.publicTransportCost}
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Culinary Section - Advanced */}
      <div className="bg-slate-50/50 rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col print:bg-white print:shadow-none print:border print:border-slate-300 print:rounded-xl print:block print:overflow-visible">
        {/* Background Pattern - Hide in Print */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-100 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none opacity-50 print:hidden"></div>

        <div className="flex items-center justify-between mb-6 relative z-10 print:mb-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shadow-sm print:bg-white print:border print:border-slate-200">
                    <ChefHat className="w-5 h-5 text-orange-600 print:text-black" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Lezzet Rehberi</h3>
            </div>
        </div>

        {/* Tabs - Hidden in Print */}
        <div className="flex p-1 bg-white/60 backdrop-blur rounded-xl border border-slate-200 mb-5 relative z-10 print:hidden">
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

        {/* Content Area - On Screen: Show Tabs. On Print: Show All Stacked */}
        <div className="flex-1 relative z-10 animate-fade-in">
            
            {/* Savory Section */}
            <div className={activeTab === 'savory' ? 'block' : 'hidden print:block'}>
                <h4 className="hidden print:block font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3 mt-2 text-sm uppercase tracking-wider">Ana Yemekler</h4>
                <div className="space-y-3">
                    {food.savoryDelights.map((item, i) => renderCulinaryItem(item, i))}
                </div>
            </div>

            {/* Sweet Section */}
            <div className={activeTab === 'sweet' ? 'block' : 'hidden print:block print:mt-6'}>
                 <h4 className="hidden print:block font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3 mt-2 text-sm uppercase tracking-wider">Tatlılar</h4>
                 <div className="space-y-3">
                    {food.sweetTreats.map((item, i) => renderCulinaryItem(item, i))}
                </div>
            </div>

            {/* Drink Section */}
            <div className={activeTab === 'drink' ? 'block' : 'hidden print:block print:mt-6'}>
                 <h4 className="hidden print:block font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3 mt-2 text-sm uppercase tracking-wider">İçecekler</h4>
                 <div className="space-y-3">
                    {food.localDrinks.map((item, i) => renderCulinaryItem(item, i))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Logistics;
