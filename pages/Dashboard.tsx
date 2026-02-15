
import React, { useState, useEffect, useMemo } from 'react';
import { Booking, Doctor, Service } from '../types';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../App';
import { DOCTORS as INITIAL_DOCTORS, SERVICES as INITIAL_SERVICES } from '../constants';

type Tab = 'bookings' | 'personnel' | 'services';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x500?text=No+Image';

const Dashboard: React.FC = () => {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('bookings');
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [doctorFilter, setDoctorFilter] = useState('all');

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      if (data) {
        setBookings(data.map((item: any) => ({
          id: item.id,
          patientName: item.patient_name,
          phone: item.phone,
          service: item.service,
          date: item.appointment_date,
          time: item.appointment_time,
          doctor: item.doctor,
          status: item.status as any,
        })));
      }
    } catch (err: any) {
      console.error('Error fetching bookings:', err.message);
    }
  };

  const fetchDoctors = async () => {
    try {
      const { data, error } = await supabase.from('doctors').select('*').order('created_at', { ascending: true });
      if (!error && data && data.length > 0) {
        setDoctors(data);
      } else {
        // Mark as fallback so we know they aren't in the DB
        setDoctors(INITIAL_DOCTORS.map(d => ({ ...d, isFallback: true })));
      }
    } catch (err) {
      setDoctors(INITIAL_DOCTORS.map(d => ({ ...d, isFallback: true })));
    }
  };

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
      if (!error && data && data.length > 0) {
        setServices(data.map((s: any) => ({
          ...s,
          shortDescription: s.short_description || s.shortDescription,
          fullDescription: s.full_description || s.fullDescription
        })));
      } else {
        setServices(INITIAL_SERVICES.map(s => ({ ...s, isFallback: true })) as any);
      }
    } catch (err) {
      setServices(INITIAL_SERVICES.map(s => ({ ...s, isFallback: true })) as any);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchDoctors();
    fetchServices();
  }, []);

  const stats = useMemo(() => {
    return {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
    };
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchesSearch = b.patientName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
      const matchesDoctor = doctorFilter === 'all' || b.doctor === doctorFilter;
      return matchesSearch && matchesStatus && matchesDoctor;
    });
  }, [bookings, searchTerm, statusFilter, doctorFilter]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('bookings').update({ status: newStatus }).eq('id', id);
    if (error) {
      alert('სტატუსის განახლება ვერ მოხერხდა: ' + error.message);
    } else {
      fetchBookings();
    }
  };

  const handleDelete = async (item: any, table: string) => {
    // Check if it's a fallback item
    if (item.isFallback) {
      alert('ეს არის სისტემური (სტატიკური) მონაცემი და მისი წაშლა მონაცემთა ბაზიდან შეუძლებელია. შეგიძლიათ წაშალოთ მხოლოდ თქვენს მიერ დამატებული ელემენტები.');
      return;
    }

    if (!window.confirm('ნამდვილად გსურთ წაშლა?')) return;

    try {
      const { error } = await supabase.from(table).delete().eq('id', item.id);
      
      if (error) {
        console.error('Delete error:', error);
        throw error;
      }

      // Refresh data
      if (table === 'bookings') fetchBookings();
      if (table === 'doctors') fetchDoctors();
      if (table === 'services') fetchServices();
      
      alert('წარმატებით წაიშალა');
    } catch (err: any) {
      alert('წაშლისას მოხდა შეცდომა: ' + (err.message || 'უცნობი შეცდომა'));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  const uploadImage = async (file: File, folder: string): Promise<string | null> => {
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    const { error: uploadError } = await supabase.storage
      .from(folder)
      .upload(fileName, file);

    if (uploadError) {
      alert('სურათის ატვირთვის შეცდომა: ' + uploadError.message);
      return null;
    }

    const { data } = supabase.storage.from(folder).getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData(e.currentTarget);
    const fileInput = (e.currentTarget as any).image_file as HTMLInputElement;
    const file = fileInput.files?.[0];

    const folder = activeTab === 'personnel' ? 'doctors' : 'services';
    let imageUrl = editingItem?.image || '';
    if (file) {
      const uploadedUrl = await uploadImage(file, folder);
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    const table = activeTab === 'personnel' ? 'doctors' : 'services';
    let itemData: any = {};

    if (activeTab === 'personnel') {
      itemData = {
        name: { ka: formData.get('name_ka'), en: formData.get('name_en'), ru: formData.get('name_ru') },
        role: { ka: formData.get('role_ka'), en: formData.get('role_en'), ru: formData.get('role_ru') },
        quote: { ka: formData.get('quote_ka'), en: formData.get('quote_en'), ru: formData.get('quote_ru') },
        image: imageUrl || PLACEHOLDER_IMAGE
      };
    } else {
      itemData = {
        title: { ka: formData.get('title_ka'), en: formData.get('title_en'), ru: formData.get('title_ru') },
        short_description: { ka: formData.get('short_ka'), en: formData.get('short_en'), ru: formData.get('short_ru') },
        full_description: { ka: formData.get('full_ka'), en: formData.get('full_en'), ru: formData.get('full_ru') },
        image: imageUrl || PLACEHOLDER_IMAGE
      };
    }
    
    try {
      if (editingItem?.id && !editingItem.isFallback) {
        const { error } = await supabase.from(table).update(itemData).eq('id', editingItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(table).insert([itemData]);
        if (error) throw error;
      }
      activeTab === 'personnel' ? fetchDoctors() : fetchServices();
      setIsModalOpen(false);
      setEditingItem(null);
      setPreviewImage('');
    } catch (err: any) {
      alert('შეცდომა შენახვისას: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] dark:bg-background-dark overflow-hidden font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
        <div className="p-8 flex items-center gap-4 border-b border-slate-50 dark:border-slate-800">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/30">
            <span className="material-icons text-2xl">admin_panel_settings</span>
          </div>
          <h1 className="text-xl font-black dark:text-white uppercase tracking-tighter">Admin</h1>
        </div>
        <nav className="flex-1 p-6 space-y-3">
          <button onClick={() => setActiveTab('bookings')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-xs uppercase transition-all ${activeTab === 'bookings' ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
            <span className="material-icons">calendar_today</span> ჯავშნები
          </button>
          <button onClick={() => setActiveTab('personnel')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-xs uppercase transition-all ${activeTab === 'personnel' ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
            <span className="material-icons">groups</span> პერსონალი
          </button>
          <button onClick={() => setActiveTab('services')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-xs uppercase transition-all ${activeTab === 'services' ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
            <span className="material-icons">medical_services</span> სერვისები
          </button>
          <div className="pt-10">
            <button onClick={() => window.location.hash = ''} className="w-full flex items-center gap-4 px-5 py-4 text-xs font-black text-slate-400 uppercase hover:text-primary transition-all">
              <span className="material-icons">logout</span> საიტზე გასვლა
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center gap-4">
             <h2 className="text-xl font-black dark:text-white uppercase tracking-tight">
               {activeTab === 'bookings' ? 'ჯავშნების მართვა' : activeTab === 'personnel' ? 'გუნდის მართვა' : 'სერვისების მართვა'}
             </h2>
             <button onClick={() => { fetchBookings(); fetchDoctors(); fetchServices(); }} className="p-2 text-slate-400 hover:text-primary transition-colors">
               <span className="material-icons text-xl">refresh</span>
             </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
              <input 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="pl-12 pr-6 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl text-xs font-bold w-80 focus:ring-2 focus:ring-primary/20" 
                placeholder="ძებნა..." 
              />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {activeTab === 'bookings' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'სულ ჯავშნები', val: stats.total, color: 'text-primary', bg: 'bg-primary/10', icon: 'list_alt' },
                  { label: 'მოლოდინში', val: stats.pending, color: 'text-amber-500', bg: 'bg-amber-50', icon: 'pending_actions' },
                  { label: 'დადასტურებული', val: stats.confirmed, color: 'text-green-500', bg: 'bg-green-50', icon: 'check_circle_outline' },
                  { label: 'გაუქმებული', val: stats.cancelled, color: 'text-red-500', bg: 'bg-red-50', icon: 'cancel' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{stat.label}</p>
                      <h3 className="text-4xl font-black dark:text-white">{stat.val}</h3>
                    </div>
                    <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                      <span className="material-icons text-3xl">{stat.icon}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-6">
                 <div className="flex items-center gap-6">
                    <select 
                      value={doctorFilter}
                      onChange={(e) => setDoctorFilter(e.target.value)}
                      className="bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-[11px] font-black py-2.5 px-4 focus:ring-0"
                    >
                      <option value="all">ყველა ექიმი</option>
                      {doctors.map(d => <option key={d.id} value={d.name[lang]}>{d.name[lang]}</option>)}
                    </select>
                    <select 
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-[11px] font-black py-2.5 px-4 focus:ring-0"
                    >
                      <option value="all">ყველა სტატუსი</option>
                      <option value="pending">მოლოდინში</option>
                      <option value="confirmed">დადასტურებული</option>
                      <option value="cancelled">გაუქმებული</option>
                    </select>
                 </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-800">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">პაციენტი</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">სერვისი</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">ექიმი</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">სტატუსი</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    {filteredBookings.map(book => (
                      <tr key={book.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                        <td className="px-8 py-5">
                          <p className="font-black dark:text-white text-sm">{book.patientName}</p>
                          <p className="text-[10px] text-slate-400 font-bold">{book.phone}</p>
                        </td>
                        <td className="px-8 py-5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wide">{book.service}</td>
                        <td className="px-8 py-5 text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wide">{book.doctor}</td>
                        <td className="px-8 py-5">
                          <select 
                            value={book.status} 
                            onChange={(e) => handleUpdateStatus(book.id, e.target.value)} 
                            className={`text-[9px] font-black uppercase px-4 py-2 rounded-full border-none focus:ring-0 ${
                              book.status === 'confirmed' ? 'bg-green-100 text-green-600' : 
                              book.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
                            }`}
                          >
                            <option value="pending">მოლოდინი</option>
                            <option value="confirmed">დადასტურებული</option>
                            <option value="cancelled">გაუქმებული</option>
                          </select>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button onClick={() => handleDelete(book, 'bookings')} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                            <span className="material-icons text-xl">delete_outline</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {(activeTab === 'personnel' || activeTab === 'services') && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(activeTab === 'personnel' ? doctors : services).filter((i: any) => (i.name?.[lang] || i.title?.[lang] || '').toLowerCase().includes(searchTerm.toLowerCase())).map((item: any) => (
                <div key={item.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all relative">
                  {item.isFallback && (
                    <div className="absolute top-4 left-4 z-10 bg-slate-900/50 backdrop-blur-sm text-white text-[8px] font-black uppercase px-2 py-1 rounded-md">
                      სისტემური
                    </div>
                  )}
                  <div className="w-full h-56 bg-slate-100 dark:bg-slate-800 relative">
                    <img src={item.image || PLACEHOLDER_IMAGE} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8">
                    <h4 className="font-black text-lg dark:text-white">{item.name?.[lang] || item.title?.[lang]}</h4>
                    <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-2">{item.role?.[lang] || item.shortDescription?.[lang]}</p>
                    <div className="mt-8 flex gap-3">
                      <button onClick={() => { setEditingItem(item); setPreviewImage(item.image); setIsModalOpen(true); }} className="flex-1 py-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 font-black text-[10px] uppercase">რედაქტირება</button>
                      <button onClick={() => handleDelete(item, activeTab === 'personnel' ? 'doctors' : 'services')} className="p-4 bg-red-50 dark:bg-red-900/20 text-red-400 rounded-xl hover:bg-red-100 transition-colors">
                        <span className="material-icons text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div 
                onClick={() => { setEditingItem(null); setPreviewImage(''); setIsModalOpen(true); }}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center min-h-[400px] cursor-pointer hover:bg-slate-100 transition-all text-slate-300 hover:text-primary"
              >
                 <span className="material-icons text-6xl mb-4">add_circle_outline</span>
                 <span className="font-black text-xs uppercase tracking-widest">ახალი {activeTab === 'personnel' ? 'ექიმი' : 'სერვისი'}</span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="px-12 py-10 bg-primary text-white flex justify-between items-center">
              <h3 className="text-2xl font-black uppercase">{editingItem ? 'რედაქტირება' : 'დამატება'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="material-icons">close</button>
            </div>
            <form onSubmit={handleSaveItem} className="p-12 overflow-y-auto max-h-[85vh] grid grid-cols-12 gap-10">
              <div className="col-span-4 space-y-6">
                 <div className="aspect-[4/5] bg-slate-100 dark:bg-slate-800 rounded-3xl overflow-hidden flex items-center justify-center relative border-2 border-dashed border-slate-200 dark:border-slate-700">
                    {previewImage ? <img src={previewImage} className="w-full h-full object-cover" /> : <span className="material-icons text-5xl text-slate-300">add_a_photo</span>}
                 </div>
                 <input type="file" name="image_file" accept="image/*" onChange={handleFileChange} className="w-full text-[10px] font-black dark:text-slate-400" />
                 <p className="text-[10px] text-slate-400 font-bold italic text-center">ატვირთული სურათი ავტომატურად განახლდება</p>
              </div>
              <div className="col-span-8 space-y-6">
                {activeTab === 'personnel' ? (
                  <>
                    <div className="grid grid-cols-3 gap-3">
                      <input name="name_ka" defaultValue={editingItem?.name?.ka} placeholder="სახელი (KA)" className="p-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl text-xs font-bold w-full focus:ring-2 focus:ring-primary/20" required />
                      <input name="name_en" defaultValue={editingItem?.name?.en} placeholder="Name (EN)" className="p-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl text-xs font-bold w-full focus:ring-2 focus:ring-primary/20" />
                      <input name="name_ru" defaultValue={editingItem?.name?.ru} placeholder="Имя (RU)" className="p-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl text-xs font-bold w-full focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <input name="role_ka" defaultValue={editingItem?.role?.ka} placeholder="როლი (KA)" className="p-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl text-xs font-bold w-full focus:ring-2 focus:ring-primary/20" required />
                      <input name="role_en" defaultValue={editingItem?.role?.en} placeholder="Role (EN)" className="p-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl text-xs font-bold w-full focus:ring-2 focus:ring-primary/20" />
                      <input name="role_ru" defaultValue={editingItem?.role?.ru} placeholder="Роль (RU)" className="p-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl text-xs font-bold w-full focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <textarea name="quote_ka" defaultValue={editingItem?.quote?.ka} placeholder="ციტატა (KA)" className="w-full p-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl text-xs font-bold h-24 focus:ring-2 focus:ring-primary/20" />
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-3 gap-3">
                      <input name="title_ka" defaultValue={editingItem?.title?.ka} placeholder="სათაური (KA)" className="p-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl text-xs font-bold w-full focus:ring-2 focus:ring-primary/20" required />
                      <input name="title_en" defaultValue={editingItem?.title?.en} placeholder="Title (EN)" className="p-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl text-xs font-bold w-full focus:ring-2 focus:ring-primary/20" />
                      <input name="title_ru" defaultValue={editingItem?.title?.ru} placeholder="Заголовок (RU)" className="p-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl text-xs font-bold w-full focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase text-slate-400">მოკლე აღწერა (მთავარზე საჩვენებლად)</p>
                      <div className="grid grid-cols-1 gap-3">
                        <textarea name="short_ka" defaultValue={editingItem?.shortDescription?.ka || editingItem?.short_description?.ka} placeholder="KA" className="p-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl text-xs font-bold h-16 w-full focus:ring-2 focus:ring-primary/20" required />
                        <textarea name="short_en" defaultValue={editingItem?.shortDescription?.en || editingItem?.short_description?.en} placeholder="EN" className="p-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl text-xs font-bold h-16 w-full focus:ring-2 focus:ring-primary/20" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase text-slate-400">სრული აღწერა (სერვისის გვერდისთვის)</p>
                      <div className="grid grid-cols-1 gap-3">
                        <textarea name="full_ka" defaultValue={editingItem?.fullDescription?.ka || editingItem?.full_description?.ka} placeholder="KA" className="p-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl text-xs font-bold h-32 w-full focus:ring-2 focus:ring-primary/20" />
                        <textarea name="full_en" defaultValue={editingItem?.fullDescription?.en || editingItem?.full_description?.en} placeholder="EN" className="p-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl text-xs font-bold h-32 w-full focus:ring-2 focus:ring-primary/20" />
                      </div>
                    </div>
                  </>
                )}
                <div className="flex gap-4 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-5 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-2xl font-black uppercase text-[10px]">გაუქმება</button>
                  <button type="submit" disabled={uploading} className="flex-1 py-5 bg-primary text-white rounded-2xl font-black uppercase text-[10px] shadow-xl shadow-primary/30 flex items-center justify-center gap-2">
                    {uploading ? (
                      <>
                        <span className="material-icons animate-spin text-sm">sync</span>
                        იტვირთება...
                      </>
                    ) : 'შენახვა'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
