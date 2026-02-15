
import { Doctor, Service, Testimonial } from './types';

export const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: { ka: 'ნინო ნაკაშიძე', en: 'Nino Nakashidze', ru: 'Нино Накашидзе' },
    role: { ka: 'მთავარი ექიმი, თერაპევტი', en: 'Chief Doctor, Therapist', ru: 'Главный врач, Терапевт' },
    quote: { ka: '"თქვენი ღიმილი ჩემი უდიდესი მოტივაციაა."', en: '"Your smile is my greatest motivation."', ru: '"Ваша улыбка — моя величайшая мотивация."' },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmCldZr6aN0Z9CayK-gwjGb_TddV74Qs1N_9vnVdWEZ95mSzu7Xmo4VhT0E8KZfS7QIZF9qVgWNSZsX77fVEw1oI10LChVMT8Ekw1B9mWMsk8JtwNz-6WQ0ElXOe4BK2mLdy_ZaDNFn_Mo3Oc_ESb_MpKYBnbUOPcC1OODg9HHigK1_wftyahoqh8iLCripEIPI8bX7mqDpT32uDQejh2mhFB3wmn9GOT5m6yqEJfk2ALljvRrVUmKbJWOTlBpUNtzxV8wDNQqhgY',
  },
  {
    id: '2',
    name: { ka: 'გიორგი ბერიძე', en: 'Giorgi Beridze', ru: 'Гиоргий Беридзе' },
    role: { ka: 'ქირურგ-იმპლანტოლოგი', en: 'Surgeon-Implantologist', ru: 'Хирург-имплантолог' },
    quote: { ka: '"თანამედროვე ქირურგია უმტკივნეულოა."', en: '"Modern surgery is painless."', ru: '"Современная хирургия безболезненна."' },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNtHblxEGFYCiu-k9MAzIvkdFYTQsPg9LZi1J6kRPFg_G50zFeSOZXRJ1G0MAYhxXQVV2AHo2bFWU_8cmaz2WelcvbyYQZeBgC62igMoaV7rJO6i01-Gz1MI71NfcXayVE7dkf_CVcmTZOHfCBUAJZUsASlbYcKm-ac9KGGxZNoyXWDCQlVM5uQmX46AYD-yJyl7wWhd5FQqNoYOK-Yv0s3MpVnqs8Ta6fmYji8lPRVGBjC0uGxZMEzpOT4cKPIShAYfylb8yBkR0',
  },
  {
    id: '3',
    name: { ka: 'მარიამ აბაშიძე', en: 'Mariam Abashidze', ru: 'Мариам Абашидзе' },
    role: { ka: 'ორთოდონტი', en: 'Orthodontist', ru: 'Ортодонт' },
    quote: { ka: '"იდეალური თანკბილვა - ჯანსაღი მომავალი."', en: '"Perfect occlusion - healthy future."', ru: '"Идеальный прикус — здоровое будущее."' },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1Slvzhq4PdlRAiiGUd3CHvJ0QyYeQD6uy2in_YfmTcQqJ0j8oHjlh8kyk4VAgH7Iom9z0WYxg3dnv44y7hSstpqSaBYF_xYjuQx5HYmvKDbrD73TD2lfSAb4GXWBP3n4VALhgOBZ7iE_jIYRaCCR3xdBJdIHCGJ9NPnY2N11UVd4ycmLrw0rxPpV5sOXyPVE_kprLJ1yfGLTQf7S5z1CWyVAiEPDwetv0z4H4IK13sDAq4wNiQxUlV6vjQ4uqLO3iStD263LhzLU',
  },
  {
    id: '4',
    name: { ka: 'დავით გვეტაძე', en: 'Davit Gvetadze', ru: 'Давид Гветадзе' },
    role: { ka: 'ორთოპედი', en: 'Orthopedist', ru: 'Ортопед' },
    quote: { ka: '"ესთეტიკა და ფუნქციურობა ერთ მთლიანობაში."', en: '"Aesthetics and functionality in one."', ru: '"Эстетика и функциональность в одном целом."' },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-MRc20N-RhqCAmqaTy7WooF65gFL21cq719DBoumcR_zmNOiES8rEKcHuJVdlCqS5iPl8zlM80eAbxiBh1MlhV04-MMDu_an1rg-UJMCCOzrwcnr-aZzhc5mfyTjEXjJcyhC-rdFnpkWCWZdbT5RLp8js_4700Q10l6qXoDhehYn-7F9xxOo1GSt6LRdE_PDXznoWaUUe9cOs302XuBTl3wkeLF1P_L6Gjm5aDnRUmcBuoCGI49YDy_jm3GRmz8s-AU739zPyX84',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: { ka: 'ანა კალანდაძე', en: 'Ana Kalandadze', ru: 'Ана Каландадзе' },
    text: { 
      ka: 'საუკეთესო კლინიკა თბილისში! პროფესიონალი ექიმები და ძალიან თბილი გარემო. ნინო ექიმი უბრალოდ ჯადოქარია.', 
      en: 'The best clinic in Tbilisi! Professional doctors and a very warm environment. Dr. Nino is just a wizard.', 
      ru: 'Лучшая клиника в Тбилиси! Профессиональные врачи и очень теплая атмосфера. Доктор Нино просто волшебница.' 
    },
    rating: 5
  },
  {
    id: '2',
    name: { ka: 'ლევან მესხი', en: 'Levan Meskhi', ru: 'Леван Месхи' },
    text: { 
      ka: 'უმტკივნეულო ქირურგიული ჩარევა. გიორგი ექიმთან იმპლანტაციის პროცესმა იდეალურად ჩაიარა. დიდი მადლობა!', 
      en: 'Painless surgical intervention. The implantation process with Dr. Giorgi went perfectly. Thank you very much!', 
      ru: 'Безболезненное хирургическое вмешательство. Процесс имплантации у доктора Гиоргия прошел идеально. Большое спасибо!' 
    },
    rating: 5
  },
  {
    id: '3',
    name: { ka: 'თამარ ბერიძე', en: 'Tamar Beridze', ru: 'Тамар Беридзе' },
    text: { 
      ka: 'ორთოდონტიული მკურნალობით ძალიან კმაყოფილი ვარ. შედეგმა მოლოდინს გადააჭარბა. კლინიკა არის ძალიან სუფთა და თანამედროვე.', 
      en: 'I am very satisfied with the orthodontic treatment. The result exceeded expectations. The clinic is very clean and modern.', 
      ru: 'Я очень довольна ортодонтическим лечением. Результат превзошел ожидания. Клиника очень чистая и современная.' 
    },
    rating: 5
  }
];

export const SERVICES: Service[] = [
  {
    id: 'therapy',
    title: { ka: 'თერაპია', en: 'Therapy', ru: 'Терапия' },
    shortDescription: { ka: 'კარიესის მკურნალობა და ესთეტიკური რესტავრაცია.', en: 'Caries treatment and aesthetic restoration.', ru: 'Лечение кариеса и эстетическая реставрация.' },
    fullDescription: { 
      ka: 'თერაპიული სტომატოლოგია NM Dental-ში მოიცავს კბილების მკურნალობის სრულ სპექტრს. ჩვენ ვიყენებთ თანამედროვე საბჟენ მასალებს, რომლებიც უზრუნველყოფენ კბილის ფორმისა და ფერის იდეალურ აღდგენას.',
      en: 'Therapeutic dentistry at NM Dental includes a full range of tooth treatments. We use modern filling materials that provide ideal restoration of tooth shape and color.',
      ru: 'Терапевтическая стоматология в NM Dental включает полный спектр лечения зубов. Мы используем современные пломбировочные материалы, которые обеспечивают идеальное восстановление формы и цвета зуба.'
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV_ZHQQclByQ16uKrCR0WYAc7PYJd05aauK9jDFBh9_Rsf3nH8brwxUy7bWXRf0G3TWxbNyRIVJbgWPW8D9tsRlKR7ZlDo3BAbHqilWzSzfBzMFjBYPMjTwrmNildNY9VYLT3fO_ehzZ3O08QCSuqDdQlBLitiyFc7D1eM7GnU_46WJ5Q3Q7B3MjJYW8rgp_ueuozYZssPsAAqBgsHWrzrI2TVEe_PrBpnwaHm45L_6ETSWZ5FipcMmJ1Wop3W5wdHHdpWkpxQZlI',
    features: {
      ka: ['კარიესის უმტკივნეულო მკურნალობა.', 'არხების ენდოდონტიური მკურნალობა მიკროსკოპით.', 'ესთეტიკური რესტავრაცია ჰელიო-ბჟენებით.', 'პროფესიული წმენდა და გათეთრება.'],
      en: ['Painless caries treatment.', 'Endodontic canal treatment with a microscope.', 'Aesthetic restoration with helio-fillings.', 'Professional cleaning and whitening.'],
      ru: ['Безболезненное лечение кариеса.', 'Эндодонтическое лечение каналов под микроскопом.', 'Эстетическая реставрация гелио-пломбами.', 'Профессиональная чистка и отбеливание.']
    },
    faqs: [
      { 
        q: { ka: 'რამდენ ხანს ძლებს ბჟენი?', en: 'How long does a filling last?', ru: 'Как долго держится пломба?' }, 
        a: { ka: 'სათანადო მოვლის შემთხვევაში თანამედროვე ჰელიო-ბჟენები 5-10 წლამდე და მეტხანს ინარჩუნებენ მდგრადობას.', en: 'With proper care, modern fillings can last 5-10 years or more.', ru: 'При должном уходе современные гелио-пломбы сохраняют устойчивость от 5 до 10 лет и дольше.' } 
      }
    ]
  },
  {
    id: 'ortho',
    title: { ka: 'ორთოდონტია', en: 'Orthodontics', ru: 'Ортодонтия' },
    shortDescription: { ka: 'კბილების გასწორება ბრეკეტებით და ელაინერებით.', en: 'Teeth straightening with braces and aligners.', ru: 'Выравнивание зубов брекетами и элайнерами.' },
    fullDescription: {
      ka: 'ორთოდონტიული მკურნალობა საშუალებას გაძლევთ გაისწოროთ კბილთა მწკრივი და გამოასწოროთ თანკბილვის პრობლემები. ჩვენ გთავაზობთ როგორც მეტალის, ისე კერამიკულ და ლინგვალურ ბრეკეტ-სისტემებს.',
      en: 'Orthodontic treatment allows you to straighten your teeth and correct bite problems. We offer metal, ceramic, and lingual brace systems.',
      ru: 'Ортодонтическое лечение позволяет выровнять зубной ряд и исправить проблемы с прикусом. Мы предлагаем как металлические, так и керамические и лингвальные брекет-системы.'
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHMJcONq_oHFR_ercJy2D9oqXFKWxRnXUZTKPxQVA3YYZFVzhN1OppaC-NflL0EWqecre0ONpxs0msUKvT2_wwtiaLub8tJoWDiM_Bu7sfwEkbBV75PWo7WghyJE7tWR9Yd91sD-zRS_nOhKOBfftJ_JXLnl9q-JABWbv1RKA8tNyhMHbNle2AVzzXBOX3gHWZzVzBz2Kigkxnes2lGq4iwa16caeNvaorllKxWhXif1jxxFqxEbi-7Ote0bA8-eUE-5TZOzch5w8',
    features: {
      ka: ['ბავშვთა და მოზრდილთა ორთოდონტია.', 'უახლესი თაობის ბრეკეტ-სისტემები.', 'გამჭვირვალე ელაინერები.', '3D სკანირება.'],
      en: ['Pediatric and adult orthodontics.', 'Latest generation brace systems.', 'Transparent aligners.', '3D scanning.'],
      ru: ['Детская и взрослая ортодонтия.', 'Брекет-системы новейшего поколения.', 'Прозрачные элайнеры.', '3D сканирование.']
    },
    faqs: []
  },
  {
    id: 'orthopedics',
    title: { ka: 'ორთოპედია', en: 'Orthopedics', ru: 'Ортопедия' },
    shortDescription: { ka: 'პროტეზირება, ვინირები და ცირკონო-კერამიკა.', en: 'Prosthetics, veneers, and zirconia ceramics.', ru: 'Протезирование, виниры и цирконий-керамика.' },
    fullDescription: {
      ka: 'ორთოპედიული სტომატოლოგია ორიენტირებულია კბილების ფუნქციური და ესთეტიკური მხარის აღდგენაზე. ვინირები და ცირკონის გვირგვინები თქვენს ღიმილს ჰოლივუდის სტანდარტებს მიუახლოვებს.',
      en: 'Orthopedic dentistry focuses on restoring the functional and aesthetic side of the teeth. Veneers and zirconia crowns will bring your smile closer to Hollywood standards.',
      ru: 'Ортопедическая стоматология ориентирована на восстановление функциональной и эстетической стороны зубов. Виниры и циркониевые коронки приблизят вашу улыбку к голливудским стандартам.'
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtLB3CkFmkB2yvGHKpZIGCA7A1Yhr3tARVdFIYIeGF03DK2K4-yR4M8LDT2ojA9ai4NQhIrlhlaG-0lmbyYwpJgNCPW2JXQC68F4uWN9WtEFm6rD4EidAtUUzzZWxTKDKw9rg4tmeeXnT8-nFRxEQuqbrFGE-Qg-yp0T7jgQTh_F_6zc1q7dpwuEQpQjpyhO_-AEDeaAr85WyjCNonBDJf_xNBFwN5cJuRS8nxtA5DOM1MhQEP1RrnQR-ZwmKkz8AfxS4-vnCZiVA',
    features: {
      ka: ['ცირკონო-კერამიკული გვირგვინები.', 'ულტრა-თხელი ვინირები.', 'მოსახსნელი პროტეზირება.', 'CAD/CAM ტექნოლოგიები.'],
      en: ['Zirconia-ceramic crowns.', 'Ultra-thin veneers.', 'Removable prosthetics.', 'CAD/CAM technologies.'],
      ru: ['Цирконий-керамические коронки.', 'Ультратонкие виниры.', 'Съемное протезирование.', 'CAD/CAM технологии.']
    },
    faqs: []
  },
  {
    id: 'surgery',
    title: { ka: 'ქირურგია', en: 'Surgery', ru: 'Хирургия' },
    shortDescription: { ka: 'იმპლანტაცია და რთული სტომატოლოგიური ოპერაციები.', en: 'Implantation and complex dental surgeries.', ru: 'Имплантация и сложные стоматологические операции.' },
    fullDescription: {
      ka: 'ქირურგიული სტომატოლოგია NM Dental-ში მოიცავს იმპლანტაციასა და სხვადასხვა სირთულის ოპერაციებს. ჩვენ ვიყენებთ შვეიცარიულ და გერმანულ პრემიუმ იმპლანტებს.',
      en: 'Surgical dentistry at NM Dental includes implantation and various complex surgeries. We use Swiss and German premium implants.',
      ru: 'Хирургическая стоматология в NM Dental включает имплантацию и операции различной сложности. Мы используем швейцарские и немецкие имплантаты премиум-класса.'
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBavDNfxbS0hoU-bixg33gAO53wAmE9qg7mz9U_-6eR0fGDIaTxmLGXdXrT9wlRBVXH0-FHePMoO4clnVZRj9uYq2LUHG0o3NMH1XSYbNegVYLjZ63HOUTqWJmbzAf8xuiglN-PKN2iNgze0FMVC7zj6_yjYiUz-_PdXPmG1CS0CRjJE3K-sl1Ry7o9GJkmjo487FTXOzZ39e-8n_ZWjy5nG7OIFVpZG-bhJWjqIjj3hc2NOEvIhf5kJ-TXVH5a-5NHliNv_JHtzL8',
    features: {
      ka: ['დენტალური იმპლანტაცია.', 'სიბრძნის კბილების ექსტრაქცია.', 'სინუს-ლიფტინგი.', 'ძვლის პლასტიკა.'],
      en: ['Dental implantation.', 'Wisdom tooth extraction.', 'Sinus lifting.', 'Bone grafting.'],
      ru: ['Дентальная имплантация.', 'Удаление зубов мудрости.', 'Синус-лифтинг.', 'Костная пластика.']
    },
    faqs: []
  },
];
