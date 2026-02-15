
import React from 'react';
import { AppState, Language } from '../types';
import { useLanguage } from '../App';

interface HeaderProps {
  onNavigate: (page: AppState, id?: string) => void;
  activePage: AppState;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, activePage }) => {
  const { lang, setLang, t } = useLanguage();

  const scrollToSection = (id: string) => {
    if (activePage !== 'HOME') {
      onNavigate('HOME');
      // Give time for home to mount
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const langOptions: { code: Language; label: string }[] = [
    { code: 'ka', label: 'KA' },
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
  ];

  return (
    <header className="fixed w-full z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => onNavigate('HOME')}
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <span className="material-icons">medical_services</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                NM <span className="text-primary">DENTAL</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-black opacity-80">Stomatology</span>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center font-bold text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
            <button 
              onClick={() => onNavigate('HOME')}
              className={`hover:text-primary transition-colors flex flex-col items-center gap-0.5 ${activePage === 'HOME' ? 'text-primary' : ''}`}
            >
              {t('home')}
              {activePage === 'HOME' && <span className="w-1 h-1 bg-primary rounded-full"></span>}
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className={`hover:text-primary transition-colors flex flex-col items-center gap-0.5 ${activePage === 'SERVICE' ? 'text-primary' : ''}`}
            >
              {t('services')}
              {activePage === 'SERVICE' && <span className="w-1 h-1 bg-primary rounded-full"></span>}
            </button>
            <button 
              onClick={() => scrollToSection('team')}
              className="hover:text-primary transition-colors"
            >
              {t('doctors')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="hover:text-primary transition-colors"
            >
              {t('contact')}
            </button>
          </nav>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 gap-1">
              {langOptions.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => setLang(opt.code)}
                  className={`px-2 py-1 rounded text-[9px] font-black transition-all ${
                    lang === opt.code 
                      ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' 
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex flex-col items-end mr-2">
              <a className="text-slate-900 dark:text-white font-black text-sm hover:text-primary transition-colors" href="tel:+995322000000">
                +995 32 2 00 00 00
              </a>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t('phone_support')}</span>
            </div>
            
            <button 
              onClick={() => scrollToSection('booking')}
              className="hidden sm:block bg-primary hover:bg-primary/90 text-white px-7 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-primary/20 active:scale-95"
            >
              {t('booking')}
            </button>

            {/* Admin Quick Access */}
            <button 
              onClick={() => onNavigate('LOGIN')}
              className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:text-primary hover:bg-primary/10 transition-all active:scale-90"
            >
              <span className="material-icons-outlined text-xl">admin_panel_settings</span>
            </button>
          </div>
          
          <div className="md:hidden">
            <span className="material-icons text-3xl cursor-pointer text-slate-900 dark:text-white">menu</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
