import React, { useState } from 'react';
import { TravelInput } from '../types';
import { Search, Loader2, MapPin, Plane, Car, Calendar, Building2 } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: TravelInput) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<TravelInput>({
    departure: '',
    country: '',
    city: '',
    hotel: '',
    days: 3,
    transportMode: 'plane',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const setTransport = (mode: 'plane' | 'car') => {
    setFormData(prev => ({ ...prev, transportMode: mode }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.country || !formData.city || !formData.departure) return;
    onSubmit(formData);
  };

  // Common input class with explicit background and text color
  const inputClass = "w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all outline-none font-medium placeholder:text-slate-400";

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 mb-8 no-print">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-800">Yeni Seyahat Planı</h2>
        <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
            Profesyonel Rota
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Departure & Transport */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
             <div className="md:col-span-8">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Çıkış Noktası</label>
                <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        name="departure"
                        placeholder="Şehir, İlçe veya Havalimanı"
                        value={formData.departure}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    />
                </div>
            </div>
            <div className="md:col-span-4">
                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ulaşım Tipi</label>
                 <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button
                        type="button"
                        onClick={() => setTransport('plane')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${formData.transportMode === 'plane' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Plane className="w-4 h-4" /> Uçak
                    </button>
                    <button
                        type="button"
                        onClick={() => setTransport('car')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${formData.transportMode === 'car' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Car className="w-4 h-4" /> Araç
                    </button>
                 </div>
            </div>
        </div>

        {/* Destination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Hedef Ülke</label>
                <input
                    type="text"
                    name="country"
                    placeholder="Örn: İtalya"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all outline-none font-medium placeholder:text-slate-400"
                    required
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Hedef Şehir</label>
                <input
                    type="text"
                    name="city"
                    placeholder="Örn: Floransa"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all outline-none font-medium placeholder:text-slate-400"
                    required
                />
            </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Konaklama (Opsiyonel)</label>
                <div className="relative">
                    <Building2 className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        name="hotel"
                        placeholder="Otel Adı (Boş ise Merkez)"
                        value={formData.hotel}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Süre (Gün)</label>
                <div className="relative">
                    <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                        type="number"
                        name="days"
                        min="1"
                        max="14"
                        value={formData.days}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    />
                </div>
            </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" /> Rota Hesaplanıyor...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" /> Rotayı Oluştur
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;