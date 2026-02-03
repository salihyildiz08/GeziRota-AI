import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ItineraryView from './components/ItineraryView';
import { generateTravelPlan, updateTravelPlan } from './services/geminiService';
import { TravelInput, TravelPlan } from './types';
import { AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreatePlan = async (input: TravelInput) => {
    setLoading(true);
    setError(null);
    try {
      const plan = await generateTravelPlan(input);
      setTravelPlan(plan);
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePlan = async (request: string) => {
    if (!travelPlan) return;
    setUpdating(true);
    setError(null);
    try {
      const updatedPlan = await updateTravelPlan(travelPlan, request);
      setTravelPlan(updatedPlan);
    } catch (err: any) {
      setError("Plan güncellenirken bir sorun oluştu.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5" />
            {error}
          </div>
        )}

        {!travelPlan ? (
          <>
            <div className="text-center mb-10 mt-4 md:mt-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Hayalinizdeki Tatili <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
                  Saniyeler İçinde Planlayın
                </span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Yapay zeka asistanımız; otelinize, havaalanına ve şehirdeki en iyi noktalara göre size özel, kilometre detaylı ve lezzet garantili bir rota oluştursun.
              </p>
            </div>
            <InputForm onSubmit={handleCreatePlan} isLoading={loading} />
            
            {/* Feature Highlights (Empty State Decoration) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-center opacity-60">
                <div className="p-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl">🗺️</div>
                    <h3 className="font-bold text-slate-800">Akıllı Rota</h3>
                    <p className="text-sm">Mesafeleri optimize eder.</p>
                </div>
                <div className="p-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl">🍕</div>
                    <h3 className="font-bold text-slate-800">Yerel Lezzetler</h3>
                    <p className="text-sm">Ne yemeli, nerede yemeli.</p>
                </div>
                 <div className="p-4">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl">🚗</div>
                    <h3 className="font-bold text-slate-800">Ulaşım Analizi</h3>
                    <p className="text-sm">Araç kiralamak mantıklı mı?</p>
                </div>
            </div>
          </>
        ) : (
          <ItineraryView 
            plan={travelPlan} 
            onUpdate={handleUpdatePlan} 
            isUpdating={updating} 
          />
        )}
      </main>
    </div>
  );
};

export default App;