
import React, { useState, useEffect } from 'react';
import BookingWidget from '../components/BookingWidget';
import { SERVICES as FALLBACK_SERVICES } from '../constants';
import { useLanguage } from '../App';
import { supabase } from '../lib/supabase';
import { Service } from '../types';

interface ServiceDetailProps {
  serviceId: string;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceId }) => {
  const { lang, t } = useLanguage();
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      const { data, error } = await supabase.from('services').select('*').eq('id', serviceId).single();
      if (!error && data) {
        setService({
          ...data,
          shortDescription: data.short_description || data.shortDescription,
          fullDescription: data.full_description || data.fullDescription,
          features: data.features || { ka: [], en: [], ru: [] },
          faqs: data.faqs || []
        });
      } else {
        const fallback = FALLBACK_SERVICES.find(s => s.id === serviceId) || FALLBACK_SERVICES[0];
        setService(fallback);
      }
    };
    fetchService();
  }, [serviceId]);

  if (!service) return null;

  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative h-[400px] w-full overflow-hidden">
        <img alt={service.title[lang]} className="w-full h-full object-cover brightness-[0.4]" src={service.image} />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <nav className="flex items-center gap-2 text-white/70 text-sm mb-4 font-black uppercase">
              <a href="#" className="hover:text-white">{t('home')}</a>
              <span className="material-icons text-xs">chevron_right</span>
              <span className="text-white">{service.title[lang]}</span>
            </nav>
            <h1 className="text-5xl font-black text-white mb-6 uppercase tracking-tight">{service.title[lang]}</h1>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3 uppercase">
              <span className="w-1.5 h-8 bg-primary rounded-full"></span>
              {t('about_procedure')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">{service.fullDescription?.[lang] || service.full_description?.[lang]}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
              <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100">
                <span className="material-icons text-primary mb-4 text-3xl">verified</span>
                <h3 className="font-black mb-2 uppercase text-sm">{t('quality_guarantee')}</h3>
                <p className="text-sm text-slate-500">{t('quality_desc')}</p>
              </div>
            </div>

            {service.features?.[lang]?.length > 0 && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features[lang].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-100">
                    <span className="material-icons text-primary">check_circle</span>
                    <span className="text-slate-700 dark:text-slate-300 font-bold text-sm uppercase">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="lg:col-span-1">
            <BookingWidget />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
