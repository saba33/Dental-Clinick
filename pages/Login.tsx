
import React from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -ml-48 -mb-48"></div>
      
      <div className="max-w-md w-full animate-in zoom-in duration-500">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-primary/20">
            <span className="material-icons text-3xl">medical_services</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">NM Dental</h1>
          <p className="text-slate-500 mt-2">ადმინისტრირების სისტემა</p>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 relative overflow-hidden">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">ავტორიზაცია</h2>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            გთხოვთ, შეიყვანოთ თქვენი მონაცემები სისტემაში შესასვლელად.
          </p>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">მომხმარებელი / ელ-ფოსტა</label>
              <div className="relative">
                <input 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/50 text-sm transition-all" 
                  placeholder="info@nmdental.ge" 
                  type="email" 
                  required
                />
                <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">person_outline</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">პაროლი</label>
                <button type="button" className="text-xs font-bold text-primary hover:underline">დაგავიწყდათ პაროლი?</button>
              </div>
              <div className="relative">
                <input 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/50 text-sm transition-all" 
                  placeholder="••••••••" 
                  type="password" 
                  required
                />
                <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">lock_outline</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded text-primary focus:ring-primary w-4 h-4" />
              <label htmlFor="remember" className="text-sm text-slate-500 select-none">დამიმახსოვრე</label>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold shadow-xl shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="material-icons">login</span>
              შესვლა
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-center gap-2 text-xs text-slate-400">
            <span className="material-icons text-sm">verified_user</span>
            დაცული გარემო
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400">© 2024 NM Dental Clinic. ყველა უფლება დაცულია.</p>
          <div className="mt-4 flex justify-center gap-6 text-xs font-medium text-slate-300">
            <a href="#" className="hover:text-primary transition-colors">კონფიდენციალურობა</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">დახმარება</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
