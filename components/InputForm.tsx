
import React, { useState, useEffect } from 'react';
import { TravelInput } from '../types';
import { Search, Loader2, MapPin, Plane, Car, Calendar, Building2, ArrowRight } from 'lucide-react';

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
    startDate: '',
    endDate: '',
    transportMode: 'plane',
  });

  const [duration, setDuration] = useState<number>(0);

  // Auto-calculate days when dates change
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include starting day
      setDuration(diffDays > 0 ? diffDays : 0);
    } else {
      setDuration(0);
    }
  }, [formData.startDate, formData.endDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const setTransport = (mode: 'plane' | 'car') => {
    setFormData(prev => ({ ...prev, transportMode: mode }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.country || !formData.city || !formData.departure || !formData.startDate || !formData.endDate) return;
    
    // Basic validation
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      alert("Bitiş tarihi başlangıç tarihinden önce olamaz!");
      return;
    }
    
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

        {/* Dates & Hotel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Seyahat Tarihleri</label>
                <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-brand-500 outline-none text-sm font-medium"
                            required
                        />
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <div className="relative flex-1">
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            min={formData.startDate}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-brand-500 outline-none text-sm font-medium"
                            required
                        />
                    </div>
                </div>
                {duration > 0 && (
                    <p className="text-xs text-brand-600 font-bold mt-2 text-right">
                        Toplam Süre: {duration} Gün
                    </p>
                )}
            </div>

            <div>
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
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" /> Rota ve Hava Durumu Hesaplanıyor...
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
