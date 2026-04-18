"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Settings() {
  const [lang, setLang] = useState('ht');
  const [pushAuth, setPushAuth] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg font-sans text-brand-text pb-20">
      
      <header className="px-6 pt-10 pb-4 bg-brand-navy text-white rounded-b-3xl shadow-md sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-2xl opacity-80 hover:opacity-100">←</Link>
          <h1 className="text-2xl font-display font-bold">{lang === 'ht' ? 'Paramèt' : 'Settings'}</h1>
        </div>
      </header>

      <main className="flex-1 px-4 mt-6">
        
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center hover:bg-gray-50 transition-colors">
            <span className="font-bold flex items-center gap-3">🌐 {lang === 'ht' ? 'Langaj' : 'Language'}</span>
            <select value={lang} onChange={e => setLang(e.target.value)} className="bg-transparent font-bold text-brand-textMuted outline-none cursor-pointer text-right">
              <option value="ht">Kreyòl Ayisyen</option>
              <option value="en">English (US)</option>
            </select>
          </div>
          <div className="px-5 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
            <span className="font-bold flex items-center gap-3">🔔 {lang === 'ht' ? 'Notifikasyon' : 'Notifications'}</span>
            <button onClick={() => setPushAuth(!pushAuth)} className={`w-12 h-6 rounded-full transition-colors relative ${pushAuth ? 'bg-brand-green' : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${pushAuth ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center custom-cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="font-bold flex items-center gap-3">⭐ {lang === 'ht' ? 'Abònman Premium' : 'Premium Subscription'}</span>
            <Link href="/premium" className="text-brand-navy font-bold text-sm bg-blue-50 px-3 py-1 rounded-lg">PRO →</Link>
          </div>
          <div className="px-5 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
            <span className="font-bold flex items-center gap-3">📄 {lang === 'ht' ? 'Tèm ak Kondisyon' : 'Terms & Conditions'}</span>
            <span className="opacity-50 text-xl">→</span>
          </div>
        </section>

        <section className="mt-8 text-center">
           <button className="text-brand-red font-bold p-4 w-full">
             {lang === 'ht' ? 'Efase Kont Mwen (Data Deletion)' : 'Delete My Account'}
           </button>
           <p className="text-xs text-brand-textMuted mt-4">KreyolConnect v1.0.0 (Phase 3 Build)</p>
        </section>

      </main>
    </div>
  );
}
