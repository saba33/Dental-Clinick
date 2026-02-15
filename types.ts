
export type AppState = 'HOME' | 'SERVICE' | 'DASHBOARD' | 'LOGIN';
export type Language = 'ka' | 'en' | 'ru';

export interface LocalizedString {
  ka: string;
  en: string;
  ru: string;
}

export interface Doctor {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  quote: LocalizedString;
  image: string;
}

export interface FAQ {
  q: LocalizedString;
  a: LocalizedString;
}

export interface Testimonial {
  id: string;
  name: LocalizedString;
  text: LocalizedString;
  rating: number;
}

export interface Service {
  id: string;
  title: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  image: string;
  features: {
    ka: string[];
    en: string[];
    ru: string[];
  };
  faqs: FAQ[];
}

export interface Booking {
  id: string;
  patientName: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  doctor: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}
