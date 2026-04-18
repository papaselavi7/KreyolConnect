"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  
  // State variables for form
  const [lang, setLang] = useState('ht');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState({ state: '', zip: '' });

  const nextStep = () => setStep(s => s + 1);
  const finish = () => router.push('/');

  return (
    <div className="flex flex-col min-h-screen bg-brand-surface p-6 font-sans text-brand-text">
      
      {/* Step 1: Language */}
      {step === 1 && (
        <div className="flex flex-col items-center justify-center flex-1 animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-brand-navy rounded-full mb-8 flex items-center justify-center shadow-lg border-4 border-brand-red">
            <span className="text-4xl text-white font-display font-bold">K</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-center text-brand-navy mb-2">Konpayon ou nan Etazini</h1>
          <h2 className="text-lg text-brand-textMuted text-center mb-12">Your Companion in America</h2>
          
          <div className="space-y-4 w-full px-4">
            <button onClick={() => { setLang('ht'); nextStep(); }} className="w-full py-4 text-xl font-bold bg-brand-navy text-white rounded-xl shadow-md hover:bg-opacity-90 active:scale-95 transition-all">
              Kreyòl Ayisyen
            </button>
            <button onClick={() => { setLang('en'); nextStep(); }} className="w-full py-4 text-xl font-bold border-2 border-brand-navy text-brand-navy rounded-xl shadow-sm hover:bg-brand-bg active:scale-95 transition-all">
              English
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Account */}
      {step === 2 && (
        <div className="flex flex-col flex-1 animate-in slide-in-from-right duration-300">
          <h1 className="text-2xl font-display font-bold text-brand-navy mb-6">
            {lang === 'ht' ? 'Kreye Kont Ou' : 'Create Your Account'}
          </h1>
          <div className="space-y-4 flex-1">
            <input type="text" placeholder={lang === 'ht' ? 'Siyati ak Non' : 'Full Name'} className="w-full p-4 border border-gray-300 rounded-xl bg-brand-bg focus:ring-2 focus:ring-brand-navy outline-none" />
            <input type="email" placeholder={lang === 'ht' ? 'Imèl' : 'Email Address'} className="w-full p-4 border border-gray-300 rounded-xl bg-brand-bg focus:ring-2 focus:ring-brand-navy outline-none" />
            <input type="password" placeholder={lang === 'ht' ? 'Paskòd' : 'Password'} className="w-full p-4 border border-gray-300 rounded-xl bg-brand-bg focus:ring-2 focus:ring-brand-navy outline-none" />
            
            <button onClick={nextStep} className="w-full py-4 mt-6 text-lg font-bold bg-brand-red text-white rounded-xl shadow-md focus:outline-none">
              {lang === 'ht' ? 'Kontinye' : 'Continue'}
            </button>
            
            <div className="text-center mt-4 flex items-center justify-center space-x-2">
              <span className="w-full h-px bg-gray-200"></span>
              <span className="text-sm text-gray-500 whitespace-nowrap px-4">OR</span>
              <span className="w-full h-px bg-gray-200"></span>
            </div>
            
            <button onClick={nextStep} className="w-full py-4 text-lg font-bold bg-brand-bg text-brand-navy border border-gray-300 rounded-xl shadow-sm mt-4 flex justify-center items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /><path fill="none" d="M1 1h22v22H1z" /></svg>
              Google
            </button>
            <p className="text-xs text-center text-gray-500 mt-6">{lang === 'ht' ? 'Enfòmasyon ou yo pwoteje' : 'Your information is protected'}</p>
          </div>
        </div>
      )}

      {/* Step 3: Status */}
      {step === 3 && (
        <div className="flex flex-col flex-1 animate-in slide-in-from-right duration-300">
           <h1 className="text-2xl font-display font-bold text-brand-navy mb-2">
            {lang === 'ht' ? 'Estatou Imigrasyon Ou' : 'Your Immigration Status'}
          </h1>
          <p className="text-sm text-brand-textMuted mb-6">
            {lang === 'ht' ? 'Sa pèmèt nou voye alèt enpòtan ba ou. Nou pap janm pataje sa ak pèsonn.' : 'This allows us to send you important alerts. We never share this.'}
          </p>

          <div className="grid grid-cols-2 gap-3 flex-1">
            {['TPS', 'DACA', 'Asylum Seeker', 'EAD (Pèmi Travay)', 'Green Card', 'Citizen', 'Other'].map(s => (
              <button 
                key={s} 
                onClick={() => setStatus(s)}
                className={`py-3 px-2 rounded-2xl border-2 font-bold text-sm transition-colors ${status === s ? 'bg-brand-navy text-white border-brand-navy' : 'bg-transparent text-brand-navy border-brand-navy hover:bg-blue-50'}`}
              >
                {s}
              </button>
            ))}
          </div>

          <button onClick={nextStep} disabled={!status} className={`w-full py-4 mt-6 text-lg font-bold text-white rounded-xl shadow-md ${!status ? 'bg-gray-300' : 'bg-brand-red'}`}>
              {lang === 'ht' ? 'Kontinye' : 'Continue'}
          </button>
        </div>
      )}

      {/* Step 4: Location */}
      {step === 4 && (
        <div className="flex flex-col flex-1 animate-in slide-in-from-right duration-300">
          <h1 className="text-2xl font-display font-bold text-brand-navy mb-6">
            {lang === 'ht' ? 'Ki kote ou rete?' : 'Where do you live?'}
          </h1>
          
          <div className="space-y-4 flex-1">
            <select className="w-full p-4 border border-gray-300 rounded-xl bg-brand-bg focus:ring-2 focus:ring-brand-navy outline-none appearance-none">
              <option value="">{lang === 'ht' ? 'Chwazi yon Eta' : 'Select a State'}</option>
              <option value="FL">Florida</option>
              <option value="NY">New York</option>
              <option value="MA">Massachusetts</option>
              <option value="PA">Pennsylvania</option>
              <option value="OH">Ohio</option>
            </select>
            
            <input type="text" placeholder={lang === 'ht' ? 'Kòd Postal (Opsyonèl)' : 'Zip Code (Optional)'} className="w-full p-4 border border-gray-300 rounded-xl bg-brand-bg focus:ring-2 focus:ring-brand-navy outline-none" />
          </div>

          <button onClick={nextStep} className="w-full py-4 text-lg font-bold bg-brand-navy text-white rounded-xl shadow-md mb-3">
              {lang === 'ht' ? 'Sove' : 'Save'}
          </button>
          
          <button onClick={nextStep} className="w-full py-3 text-brand-textMuted font-bold bg-transparent">
              {lang === 'ht' ? 'Ka ou pa vle pataje lokal ou' : 'Skip location for now'}
          </button>
        </div>
      )}

      {/* Step 5: Notifications */}
      {step === 5 && (
        <div className="flex flex-col items-center justify-center flex-1 animate-in zoom-in duration-300 px-2 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full mb-6 flex items-center justify-center">
            <span className="text-3xl">🔔</span>
          </div>
          
          <h1 className="text-2xl font-display font-bold text-brand-navy mb-4">
            {lang === 'ht' ? 'Rete Enfòme' : 'Stay Informed'}
          </h1>
          
          <p className="text-brand-textMuted mb-8 leading-relaxed">
            {lang === 'ht' ? 'Nou pral voye alèt enpòtan si TPS ap ekspire, si gen chanjman nan lwa imigrasyon yo, oswa nouvo resous nan zòn ou an.' : 'We will send alerts when TPS expires, policy changes occur, or local resources are added.'}
          </p>

          <button onClick={finish} className="w-full py-4 text-lg font-bold bg-brand-green text-white rounded-xl shadow-lg mb-4 hover:bg-green-600 active:scale-95 transition-transform animate-bounce">
              {lang === 'ht' ? 'Aktive Notifikasyon' : 'Enable Notifications'}
          </button>

          <button onClick={finish} className="text-brand-textMuted underline mt-2 text-sm font-bold active:text-brand-navy">
              {lang === 'ht' ? 'Pa kounye a' : 'Not now'}
          </button>
        </div>
      )}
    </div>
  );
}
