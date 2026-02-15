
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../App';
import { DOCTORS as FALLBACK_DOCTORS } from '../constants';
import { Doctor } from '../types';

const BookingWidget: React.FC = () => {
  const { lang, t } = useLanguage();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDate, setSelectedDate] = useState(19);
  const [selectedTime, setSelectedTime] = useState('11:30');
  const [selectedDoctor, setSelectedDoctor] = useState(t('any_doctor'));
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data, error } = await supabase.from('doctors').select('*').order('created_at', { ascending: true });
        if (error) {
          setDoctors(FALLBACK_DOCTORS);
          return;
        }
        if (data && data.length > 0) {
          setDoctors(data);
        } else {
          setDoctors(FALLBACK_DOCTORS);
        }
      } catch (e) {
        setDoctors(FALLBACK_DOCTORS);
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert(lang === 'ka' ? 'გთხოვთ შეავსოთ სახელი და ტელეფონის ნომერი' : lang === 'ru' ? 'Пожалуйста, заполните имя и номер телефона' : 'Please fill in name and phone number');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from('bookings').insert([
        {
          patient_name: name,
          phone: phone,
          service: 'General Therapy', 
          appointment_date: `${selectedDate} Nov`,
          appointment_time: selectedTime,
          doctor: selectedDoctor,
          status: 'pending'
        }
      ]);

      if (error) throw error;

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setName('');
        setPhone('');
      }, 5000);
    } catch (error: any) {
      alert('დაჯავშნა ვერ მოხერხდა. დარწმუნდით რომ "bookings" ცხრილი შექმნილია Supabase-ში.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const times = ['10:00', '11:30', '14:00', '15:30', '17:00', '18:30'];
  const dates = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

  if (isSuccess) {
    return (
      <div className="sticky-widget bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl p-10 border border-green-100 dark:border-green-900/30 text-center animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-icons text-4xl">check_circle</span>
        </div>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">{t('success_msg')}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 font-medium leading-relaxed">
          {t('success_submsg')}
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="w-full py-4 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-colors"
        >
          OK
        </button>
      </div>
    );
  }

  const daysKa = ['ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ', 'კვი'];
  const daysEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const daysRu = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const currentDays = lang === 'ka' ? daysKa : lang === 'ru' ? daysRu : daysEn;

  return (
    <div className="sticky-widget bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1 uppercase tracking-tight">{t('booking')}</h3>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none">NM DENTAL CLINIC</p>
      </div>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">{t('service_label')}</label>
          <div className="relative">
            <select 
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-4 focus:ring-primary/20 text-sm font-bold appearance-none dark:text-white transition-all"
            >
              <option>{t('any_doctor')}</option>
              {doctors.map(d => <option key={d.id} value={d.name[lang]}>{d.name[lang]}</option>)}
            </select>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
              <span className="material-icons text-primary text-xl">person_outline</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">{t('date_label')}</label>
          <div className="grid grid-cols-7 gap-1 text-center">
            {currentDays.map(day => (
              <div key={day} className="text-[9px] font-black text-slate-300 pb-1 uppercase">{day}</div>
            ))}
            {dates.map((date) => (
              <button
                key={date}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={`py-3 text-[11px] font-black rounded-xl transition-all ${
                  selectedDate === date 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110 z-10' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400'
                } ${date < 15 ? 'opacity-20 pointer-events-none grayscale' : ''}`}
              >
                {date}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Time Slots</label>
          <div className="grid grid-cols-3 gap-2">
            {times.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`py-3 text-[10px] font-black border rounded-xl transition-all ${
                  selectedTime === time 
                    ? 'bg-primary/10 border-primary text-primary shadow-sm' 
                    : 'border-slate-100 dark:border-slate-700 hover:border-primary/30 dark:text-slate-300'
                } ${time === '18:30' ? 'opacity-40 cursor-not-allowed line-through' : ''}`}
                disabled={time === '18:30'}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <input 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-4 focus:ring-primary/20 text-sm font-bold dark:text-white" 
              placeholder={lang === 'ka' ? 'თქვენი სახელი' : lang === 'ru' ? 'Ваше имя' : 'Your Name'} 
              type="text" 
            />
            <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">badge</span>
          </div>
          <div className="relative">
            <input 
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-4 focus:ring-primary/20 text-sm font-bold dark:text-white" 
              placeholder={lang === 'ka' ? 'ტელეფონის ნომერი' : lang === 'ru' ? 'Номер телефона' : 'Phone Number'} 
              type="tel" 
            />
            <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">phone_iphone</span>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-5 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-primary/30 transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-wait' : 'active:scale-95'}`}
        >
          {isSubmitting ? (
            <>
              <span className="material-icons animate-spin text-xl">sync</span>
            </>
          ) : (
            <>
              <span className="material-icons">event_available</span>
              <span>{t('book_visit_btn')}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingWidget;
