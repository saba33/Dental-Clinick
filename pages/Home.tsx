
import React, { useState, useEffect } from 'react';
import { SERVICES as FALLBACK_SERVICES, DOCTORS as FALLBACK_DOCTORS, TESTIMONIALS } from '../constants.tsx';
import { useLanguage } from '../App';
import { supabase } from '../lib/supabase';
import { Doctor, Service } from '../types';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x500?text=No+Image';

interface HomeProps {
  onNavigateToService: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigateToService }) => {
  const { lang, t } = useLanguage();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Doctors
      const { data: docData } = await supabase.from('doctors').select('*').order('created_at', { ascending: true });
      if (docData && docData.length > 0) setDoctors(docData); else setDoctors(FALLBACK_DOCTORS);
      
      // Fetch Services
      const { data: servData } = await supabase.from('services').select('*').order('created_at', { ascending: true });
      if (servData && servData.length > 0) {
        setServices(servData.map((s: any) => ({
          ...s,
          shortDescription: s.short_description || s.shortDescription // Handle snake_case from DB
        })));
      } else {
        setServices(FALLBACK_SERVICES);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section id="booking" className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 flex">
          <div className="w-1/2 bg-white dark:bg-background-dark"></div>
          <div className="w-1/2 relative">
            <img alt="Clinic" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoBW-REiCM9_NJJRt6fxFZfHusOTSpRsMLj7seoMHIxM8nZLe4zL-hW67Zh7o8rBJfE7tmwQI1-L9u4-Hzanjur8nCXXnBwnV5HhyG6CSFURdRnakcZWVzdpi-YWfXTt0z7s1sGm1F0ljp_PomPeVYhJBNQaWGwnbAJ0bx1nTq-ZPO-TGNYmKugbyFbaQ7SCsWGdsLuakCyWn5z7R7GNrT-1mwgxaPRVjWv9my_qReCwZXFBRvA7Ub96GCYyv2cCtKinNFHjUhLM4" />
            <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-background-dark to-transparent"></div>
          </div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white mb-6 uppercase tracking-tight">
              {t('hero_title')} <span className="text-primary">{t('hero_tbilisi')}</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium">{t('hero_subtitle')}</p>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-800">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); alert(t('success_msg')); }}>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">{t('service_label')}</label>
                  <select className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary text-sm font-bold dark:text-white">
                    {services.map(s => <option key={s.id} value={s.id}>{s.title[lang]}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">{t('date_label')}</label>
                  <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary text-sm font-bold dark:text-white" type="date" required />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">{t('phone_label')}</label>
                  <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary text-sm font-bold dark:text-white" placeholder="+995 XXX XX XX XX" type="tel" required />
                </div>
                <button className="md:col-span-2 bg-primary text-white font-black py-4 rounded-lg shadow-lg uppercase tracking-widest text-xs" type="submit">{t('book_visit_btn')}</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid (Now first after Hero) */}
      <section className="py-24 bg-white dark:bg-background-dark" id="services">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase">{t('our_services')}</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.id} className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer" onClick={() => onNavigateToService(service.id)}>
                <div className="aspect-[4/5] relative">
                  <img alt={service.title[lang]} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" src={service.image} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h4 className="text-xl font-bold text-white mb-2">{service.title[lang]}</h4>
                  <p className="text-slate-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity">{service.shortDescription?.[lang] || service.short_description?.[lang]}</p>
                  <button className="text-primary font-black flex items-center gap-2 text-[10px] uppercase">{t('learn_more')}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section (Now second after Services, Photos are colorized) */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/50" id="team">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-20 text-center">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6 uppercase">{t('our_team')}</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {doctors.map((doc) => (
              <div key={doc.id} className="group flex flex-col items-center">
                <div className="w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-xl mb-8 relative bg-white">
                  <img alt={doc.name[lang]} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" src={doc.image || PLACEHOLDER_IMAGE} />
                </div>
                <div className="text-center px-4">
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase">{doc.name[lang]}</h4>
                  <p className="text-primary font-black text-[11px] mb-4 uppercase tracking-[0.25em]">{doc.role[lang]}</p>
                  <p className="text-slate-500 text-sm italic">"{doc.quote[lang]}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section (New Section) */}
      <section className="py-32 bg-white dark:bg-background-dark" id="testimonials">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-20 text-center">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">
              {t('testimonials_title')}
            </h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="bg-slate-50 dark:bg-slate-800 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 relative shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
                <div className="text-primary mb-6">
                  <span className="material-icons text-5xl opacity-20">format_quote</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8 flex-grow font-medium">
                  {testimonial.text[lang]}
                </p>
                <div className="flex flex-col">
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="material-icons text-lg">star</span>
                    ))}
                  </div>
                  <h5 className="text-slate-900 dark:text-white font-black uppercase text-xs tracking-widest">
                    {testimonial.name[lang]}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
