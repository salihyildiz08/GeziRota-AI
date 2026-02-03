
import React from 'react';
import { Plane, Github, PlusCircle } from 'lucide-react';

interface HeaderProps {
  hasPlan?: boolean;
  onReset?: () => void;
}

const Header: React.FC<HeaderProps> = ({ hasPlan, onReset }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 no-print">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-brand-600 cursor-pointer" onClick={() => window.location.reload()}>
          <Plane className="h-6 w-6" />
          <span className="font-bold text-xl tracking-tight text-slate-900">Salih Yıldız GeziRota AI</span>
        </div>
        
        <div className="flex items-center gap-3">
          {hasPlan && onReset && (
            <button 
              onClick={onReset}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 text-xs font-bold rounded-full hover:bg-brand-100 transition-colors border border-brand-200"
            >
              <PlusCircle className="w-4 h-4" />
              Yeni Rota Çiz
            </button>
          )}

          <a 
            href="https://github.com/salihyildiz08" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all px-4 py-2 rounded-full flex items-center gap-2 shadow-sm"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub Profilim</span>
            <span className="sm:hidden">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
