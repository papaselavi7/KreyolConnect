"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomeDashboard() {
  const [lang, setLang] = useState('ht');
  const [dateStr, setDateStr] = useState('');

  const router = useRouter();

  useEffect(() => {
    // Generate static date so hydration doesn't fail
    const date = new Date();
    const options: object = { weekday: 'long', month: 'long', day: 'numeric' };
    setDateStr(date.toLocaleDateString(lang === 'ht' ? 'fr-FR' : 'en-US', options));
  }, [lang]);

  return (
    <div className="flex flex-col min-h-screen bg-brand-surface font-sans text-brand-text pb-20">
      
      {/* 1. Header */}
      <header className="px-6 pt-10 pb-4 flex justify-between items-end bg-brand-navy text-white rounded-b-3xl shadow-md">
        <div>
          <h1 className="text-2xl font-display font-bold">{lang === 'ht' ? 'Bonjou, Jean!' : 'Good morning, Jean!'}</h1>
          <p className="text-sm opacity-80 mt-1 capitalize">{dateStr}</p>
        </div>
        <button 
          onClick={() => setLang(l => l === 'ht' ? 'en' : 'ht')}
          className="bg-white/20 px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-white/30 transition-colors"
        >
          {lang === 'ht' ? '🇭🇹 HT' : '🇺🇸 EN'}
        </button>
      </header>

      <main className="flex-1 px-4 mt-6 space-y-6">

        {/* 2. Status Alert Banner */}
        <section className="bg-red-50 border-l-4 border-brand-red p-4 rounded-r-xl shadow-sm">
          <div className="flex gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <h2 className="text-brand-red font-bold">{lang === 'ht' ? 'TPS ou ap ekspire nan 45 jou' : 'Your TPS expires in 45 days'}</h2>
              <button className="mt-2 text-sm font-bold bg-brand-red text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 active:scale-95 transition-transform">
                {lang === 'ht' ? 'Renouvle Kounye a' : 'Renew Now'}
              </button>
            </div>
          </div>
        </section>

        {/* 3. Quick Actions Grid */}
        <section className="grid grid-cols-2 gap-3">
          {[
            { icon: '📋', root: lang === 'ht' ? 'Estatou Mwen' : 'My Status', bg: 'bg-blue-50' },
            { icon: '💸', root: lang === 'ht' ? 'Voye Lajan' : 'Send Money', bg: 'bg-green-50' },
            { icon: '📍', root: lang === 'ht' ? 'Jwenn Èd' : 'Find Help', bg: 'bg-yellow-50' },
            { icon: '⚖️', root: lang === 'ht' ? 'Dwa Mwen' : 'My Rights', bg: 'bg-purple-50' },
          ].map((action, i) => (
            <button key={i} className={`${action.bg} flex flex-col items-center justify-center p-4 rounded-2xl shadow-sm border border-black/5 hover:brightness-95 active:scale-95 transition-all`}>
              <span className="text-3xl mb-2">{action.icon}</span>
              <span className="font-bold text-sm text-brand-navy">{action.root}</span>
            </button>
          ))}
        </section>

        {/* 4. Latest News (Horizontal Scroll) */}
        <section>
          <h3 className="font-display font-bold text-lg mb-3 px-1">{lang === 'ht' ? 'Dènye Nouvèl' : 'Latest News'}</h3>
          <div className="flex overflow-x-auto pb-4 -mx-4 px-4 space-x-3 snap-x">
            {[1, 2].map(n => (
              <div key={n} className="min-w-[260px] bg-white border border-gray-200 p-4 rounded-xl shadow-sm snap-start">
                <span className="text-xs text-brand-textMuted uppercase font-bold tracking-wider">USCIS • Sep 14</span>
                <h4 className="font-bold mt-1 text-brand-navy">USCIS extends TPS reregistration period.</h4>
                <p className="text-sm text-brand-textMuted mt-1 line-clamp-2">The Department of Homeland Security announced a massive extension for structural filings.</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Deadlines Timeline Widget */}
        <section className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
           <h3 className="font-display font-bold text-lg mb-3">{lang === 'ht' ? 'Dat limit kap vini yo' : 'Upcoming Deadlines'}</h3>
           <div className="space-y-3">
             <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-brand-red"></div>
               <div className="flex-1">
                 <p className="font-bold text-sm">TPS I-821 Renewal</p>
                 <p className="text-xs text-brand-red font-bold mt-0.5">Expires in 45 days</p>
               </div>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-brand-green"></div>
               <div className="flex-1">
                 <p className="font-bold text-sm">Employment Authorization (EAD)</p>
                 <p className="text-xs text-brand-textMuted mt-0.5">Expires in 210 days</p>
               </div>
             </div>
           </div>
        </section>

        {/* 6. Remittance Widget */}
        <section className="bg-gradient-to-r from-brand-navy to-blue-800 p-5 rounded-2xl text-white shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -top-4 text-7xl opacity-10">💸</div>
          <p className="text-sm opacity-90 font-bold mb-1 uppercase tracking-wider">{lang === 'ht' ? 'Pousantaj jodi a' : "Today's Rate"}</p>
          <h2 className="text-3xl font-display font-bold">$1 = 132.00 HTG</h2>
          <p className="text-sm mt-1 mb-4 opacity-90">via CAM Transfer (Instant)</p>
          <button className="bg-white text-brand-navy text-sm font-bold py-2 px-4 rounded-lg shadow hover:bg-gray-100 active:scale-95 transition-all">
            {lang === 'ht' ? 'Konpare tout' : 'Compare all rates'}
          </button>
        </section>

      </main>

      {/* Floating Bottom Nav */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 px-6 py-3 flex justify-between pb-8 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        {['🏠', '⚖️', '💬', '⚙️'].map((emoji, idx) => (
          <button key={idx} className={`p-2 text-2xl ${idx === 0 ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-100'} transition-all`}>
            {emoji}
          </button>
        ))}
      </div>

    </div>
  );
}
