
import React, { useState, useEffect, createContext, useContext } from 'react';
import { AppState, Language } from './types';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import { UI_TRANSLATIONS } from './lib/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppState>('HOME');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('therapy');
  const [lang, setLang] = useState<Language>('ka');

  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash.replace('#', '').toLowerCase();
      const [hash, id] = fullHash.split('/');
      
      // Scroll to top on every route change
      window.scrollTo({ top: 0, behavior: 'instant' });

      if (hash === 'dashboard') {
        setCurrentPage('DASHBOARD');
      } else if (hash === 'login') {
        setCurrentPage('LOGIN');
      } else if (hash === 'service') {
        setCurrentPage('SERVICE');
        if (id) setSelectedServiceId(id);
      } else {
        setCurrentPage('HOME');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: AppState, id?: string) => {
    let hash = '';
    if (page === 'SERVICE') {
      hash = `#service/${id || selectedServiceId}`;
    } else if (page !== 'HOME') {
      hash = `#${page.toLowerCase()}`;
    }
    window.location.hash = hash;
  };

  const t = (key: string) => {
    return UI_TRANSLATIONS[key]?.[lang] || key;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'HOME':
        return <Home onNavigateToService={(id) => navigateTo('SERVICE', id)} />;
      case 'SERVICE':
        return <ServiceDetail serviceId={selectedServiceId} />;
      case 'DASHBOARD':
        return <Dashboard />;
      case 'LOGIN':
        return <Login onLogin={() => navigateTo('DASHBOARD')} />;
      default:
        return <Home onNavigateToService={(id) => navigateTo('SERVICE', id)} />;
    }
  };

  const showNav = currentPage !== 'DASHBOARD' && currentPage !== 'LOGIN';

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div className="min-h-screen flex flex-col">
        {showNav && <Header onNavigate={navigateTo} activePage={currentPage} />}
        <main className={`flex-grow ${showNav ? 'pt-20' : ''}`}>
          {renderPage()}
        </main>
        {showNav && <Footer />}
      </div>
    </LanguageContext.Provider>
  );
};

export default App;
