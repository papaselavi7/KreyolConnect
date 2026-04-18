"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function KnowYourRights() {
  const [lang, setLang] = useState('ht');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: 'police', icon: '🚔', title_ht: 'Arè Lapolis', title_en: 'Police Stop' },
    { id: 'ice', icon: '🏠', title_ht: 'ICE Vini Kay Ou', title_en: 'ICE at Your Door' },
    { id: 'work', icon: '💼', title_ht: 'Nan Travay', title_en: 'At Work' },
    { id: 'hospital', icon: '🏥', title_ht: 'Nan Lopital', title_en: 'At the Hospital' },
    { id: 'airport', icon: '✈️', title_ht: 'Nan Ayewopò', title_en: 'At the Airport' },
    { id: 'family', icon: '👨‍👩‍👧', title_ht: 'Dwa Fanmi', title_en: 'Family Rights' },
  ];

  const scriptEn = "I do not want to speak without my lawyer. I choose to remain silent.";
  const scriptHt = "Mwen pa vle pale san avoka mwen. Mwen deside rete an silans.";

  const handleCopy = () => {
    navigator.clipboard.writeText(lang === 'ht' ? scriptHt : scriptEn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-surface font-sans text-brand-text pb-20">
      
      <header className="px-6 pt-10 pb-4 bg-brand-navy text-white rounded-b-3xl shadow-md sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-2xl opacity-80 hover:opacity-100">←</Link>
          <h1 className="text-2xl font-display font-bold">{lang === 'ht' ? 'Dwa Mwen' : 'Know Your Rights'}</h1>
        </div>
        <button onClick={() => setLang(l => l === 'ht' ? 'en' : 'ht')} className="bg-white/20 px-3 py-1.5 rounded-full text-sm font-bold">
          {lang === 'ht' ? '🇭🇹 HT' : '🇺🇸 EN'}
        </button>
      </header>

      <main className="flex-1 px-4 mt-6">
        
        {/* HOMESCREEN TILES */}
        {!activeCategory && (
          <div className="animate-in fade-in duration-300">
            <p className="text-brand-textMuted mb-6 px-1">
              {lang === 'ht' 
                ? 'Ou gen dwa, kèlkeswa estati imigrasyon ou. Chwazi yon sitiyasyon anba a.' 
                : 'You have rights, regardless of your immigration status. Select a situation below.'}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {categories.map(c => (
                <button key={c.id} onClick={() => setActiveCategory(c.id)} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:scale-105 active:scale-95 transition-transform">
                  <span className="text-4xl mb-3">{c.icon}</span>
                  <span className="font-bold text-sm text-brand-navy">{lang === 'ht' ? c.title_ht : c.title_en}</span>
                </button>
              ))}
            </div>
            {/* Offline badge constraint demonstration */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-brand-textMuted font-bold bg-gray-100 p-3 rounded-xl mx-4">
              <span>⚡</span> {lang === 'ht' ? 'Disponib oflayn (San entènèt)' : 'Available Offline (No internet required)'}
            </div>
          </div>
        )}

        {/* CATEGORY DETAILS */}
        {activeCategory && (
          <div className="animate-in slide-in-from-right duration-300">
             <button onClick={() => setActiveCategory(null)} className="text-brand-textMuted font-bold mb-4 flex items-center gap-2">
               ← {lang === 'ht' ? 'Tounen' : 'Back'}
             </button>

             <h2 className="text-2xl font-display font-bold text-brand-navy mb-6">
                {lang === 'ht' ? 'Arè Lapolis' : 'Police Stop'}
             </h2>

             {/* Script Card (Critical UI constraint) */}
             <div className="bg-white rounded-2xl shadow-lg border-2 border-brand-navy p-5 mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-brand-red"></div>
                <h3 className="text-xs font-bold text-brand-textMuted uppercase tracking-wider mb-2">
                  {lang === 'ht' ? 'Kisa pou w di (Ekzakteman)' : 'What to say (Exactly)'}
                </h3>
                <p className="text-lg font-bold text-brand-navy leading-relaxed mb-4">
                  "{lang === 'ht' ? scriptHt : scriptEn}"
                </p>
                <button onClick={handleCopy} className={`w-full py-3 rounded-xl font-bold transition-colors ${copied ? 'bg-brand-green text-white' : 'bg-blue-50 text-brand-navy border border-blue-100'}`}>
                  {copied ? (lang === 'ht' ? '✓ Kopye!' : '✓ Copied!') : (lang === 'ht' ? 'Kopye Tèks La' : 'Copy to clipboard')}
                </button>
             </div>

             {/* DOs and DONTs */}
             <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
                <h3 className="font-bold text-brand-navy mb-3 flex items-center gap-2"><span className="text-green-500">✓</span> {lang === 'ht' ? 'Dwa Ou Yo' : 'Your Rights'}</h3>
                <ul className="space-y-2 text-sm text-brand-textMuted mb-6">
                  <li>• {lang === 'ht' ? 'Ou gen dwa rete an silans.' : 'You have the right to remain silent.'}</li>
                  <li>• {lang === 'ht' ? 'Ou poze kesyon si ou lib pou ou ale.' : 'You can ask if you are free to leave.'}</li>
                </ul>

                <h3 className="font-bold text-brand-red mb-3 flex items-center gap-2"><span>❌</span> {lang === 'ht' ? 'Kisa pou w PA JANM fè' : 'What you should NEVER do'}</h3>
                <ul className="space-y-2 text-sm text-brand-textMuted text-red-900">
                  <li>• {lang === 'ht' ? 'Pa bay fo dokiman oswa fo non.' : 'Do not provide fake documents or a fake name.'}</li>
                  <li>• {lang === 'ht' ? 'Pa kouri lè kout lapolis.' : 'Do not run away from the police.'}</li>
                </ul>
             </section>

             <div className="flex gap-4">
                <Link href="/lawyers" className="flex-1 py-4 text-center font-bold text-brand-red bg-red-50 border border-red-100 rounded-xl shadow-sm">
                  {lang === 'ht' ? 'Rele yon Avoka' : 'Call a Lawyer'}
                </Link>
             </div>

          </div>
        )}

      </main>
    </div>
  );
}
