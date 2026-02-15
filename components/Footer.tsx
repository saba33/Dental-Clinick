
import React from 'react';
import { useLanguage } from '../App';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-white dark:bg-slate-900 pt-20 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-icons text-white">medical_services</span>
              </div>
              <span className="text-2xl font-black tracking-tighter dark:text-white leading-none">NM <span className="text-primary">DENTAL</span></span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-loose mb-8 font-medium">
              {t('hero_subtitle')}
            </p>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'twitter'].map(social => (
                <a key={social} className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition-all" href="#">
                  <span className={`material-icons text-lg`}>{social === 'facebook' ? 'facebook' : social === 'instagram' ? 'camera_alt' : 'public'}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-8">Quick Links</h4>
            <ul className="space-y-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">
              <li><a className="hover:text-primary transition-colors flex items-center gap-2" href="#"><span className="w-1 h-1 bg-primary/30 rounded-full"></span>{t('home')}</a></li>
              <li><a className="hover:text-primary transition-colors flex items-center gap-2" href="#"><span className="w-1 h-1 bg-primary/30 rounded-full"></span>{t('services')}</a></li>
              <li><a className="hover:text-primary transition-colors flex items-center gap-2" href="#"><span className="w-1 h-1 bg-primary/30 rounded-full"></span>{t('doctors')}</a></li>
              <li><a className="hover:text-primary transition-colors flex items-center gap-2" href="#"><span className="w-1 h-1 bg-primary/30 rounded-full"></span>{t('contact')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-8">{t('contact')}</h4>
            <ul className="space-y-5 text-[11px] font-black text-slate-500 tracking-widest uppercase">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                  <span className="material-icons text-primary text-sm">location_on</span>
                </div>
                <span className="leading-relaxed">{t('address')}</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                  <span className="material-icons text-primary text-sm">phone</span>
                </div>
                <span>+995 32 2 00 00 00</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                  <span className="material-icons text-primary text-sm">mail</span>
                </div>
                <span className="lowercase">info@nmdental.ge</span>
              </li>
            </ul>
          </div>
          
          <div className="rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 h-52 shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800">
            <img 
              alt="Clinic Map" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgtP3qfcOwcb8_Iiu_uRMyObCPiCA8A-jx_8130rD1385Wth1ZsQbA9xOtpS8pXm925QJl9luEamfW34rLLzSCpTkfEtv___-tDMH7F933HqYxGQOY0oy4edI_RKvvgGok6uSzMqjdl1GJ_j2oDbXq1VSogvcs2LCtFtf5kaTYAk4DTJJKss2KjbvQoKizc1nkJrNZey3cfE5XsGwge8Mi8nSKtglU4wLBFY7eLDnNCmjy4lJrYKXugcHXlBkubuMFlxwhRxMOkas" 
            />
          </div>
        </div>
      </div>
      
      <div className="border-t border-slate-100 dark:border-slate-800/50 py-10 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            © 2024 NM DENTAL. {t('rights_reserved')}.
          </p>
          <div className="flex gap-8 items-center text-[10px] font-black uppercase tracking-widest">
            <a className="text-slate-400 hover:text-primary transition-colors" href="#">{t('privacy')}</a>
            <a className="text-slate-400 hover:text-primary transition-colors" href="#">{t('terms')}</a>
            
            <a 
              className="px-4 py-2 bg-slate-200/50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-primary hover:bg-primary/10 transition-all flex items-center gap-2 rounded-lg border border-transparent hover:border-primary/20" 
              href="#login"
            >
              <span className="material-icons text-sm">admin_panel_settings</span>
              {t('administration')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
