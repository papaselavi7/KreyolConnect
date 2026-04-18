"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Lawyers() {
  const [lang, setLang] = useState('ht');
  const [search, setSearch] = useState('');

  // Mock Lawyer Data
  const lawyers = [
    { id: 1, name: 'Avoka Jean Francois', firm: 'Haitian Legal Aid Partners', specs: ['TPS', 'Asylum'], rating: 4.8, reviews: 24, verified: true, freeConsult: true },
    { id: 2, name: 'Marie Pierre, Esq.', firm: 'Pierre Law Group', specs: ['Deportation', 'Green Card'], rating: 4.9, reviews: 102, verified: true, freeConsult: false, fee: 150 },
    { id: 3, name: 'Jacques L\'Ouverture', firm: 'Independent', specs: ['DACA', 'Asylum'], rating: 4.2, reviews: 8, verified: false, freeConsult: true },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-brand-surface font-sans text-brand-text pb-20">
      
      <header className="px-6 pt-10 pb-6 bg-brand-navy text-white rounded-b-3xl shadow-md sticky top-0 z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-2xl opacity-80 hover:opacity-100">←</Link>
            <h1 className="text-2xl font-display font-bold">{lang === 'ht' ? 'Jwenn yon Avoka' : 'Find a Lawyer'}</h1>
          </div>
          <button onClick={() => setLang(l => l === 'ht' ? 'en' : 'ht')} className="bg-white/20 px-3 py-1.5 rounded-full text-sm font-bold">
            {lang === 'ht' ? '🇭🇹' : '🇺🇸'}
          </button>
        </div>

        <input 
          type="text" 
          placeholder={lang === 'ht' ? 'Chèche pa non oswa espesyalite (eg: TPS)' : 'Search by name or specialty (e.g., TPS)'}
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full p-4 border-none rounded-xl bg-white text-black focus:ring-2 focus:ring-brand-red outline-none shadow-inner" 
        />
      </header>

      <main className="flex-1 px-4 mt-6 space-y-4">
        {lawyers.filter(l => l.specs.join(' ').toLowerCase().includes(search.toLowerCase()) || l.name.toLowerCase().includes(search.toLowerCase())).map(l => (
          <div key={l.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
            
            {/* Verification Badge */}
            {l.verified && (
               <div className="absolute top-4 right-4 bg-blue-50 text-brand-navy p-1 rounded-full text-xs" title="Verified by KreyolConnect">
                 ✔️
               </div>
            )}

            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${l.name}`} alt={l.name} className="w-full h-full object-cover" />
              </div>
              <div className="pr-4">
                <h3 className="font-bold text-brand-navy text-lg leading-tight">{l.name}</h3>
                <p className="text-xs text-brand-textMuted mt-0.5">{l.firm}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-sm font-bold">{l.rating}</span>
                  <span className="text-xs text-gray-400">({l.reviews})</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {l.specs.map(s => (
                <span key={s} className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-md">{s}</span>
              ))}
            </div>

            <div className="w-full h-px bg-gray-100 mb-4"></div>

            <div className="flex justify-between items-center">
               {l.freeConsult ? (
                 <span className="text-sm font-bold text-brand-green bg-green-50 px-2.5 py-1 rounded-lg border border-green-100">
                   {lang === 'ht' ? 'Konsiltasyon Gratis' : 'Free Consultation'}
                 </span>
               ) : (
                 <span className="text-sm font-bold text-gray-600">
                   ${l.fee} / {lang === 'ht' ? 'konsiltasyon' : 'consultation'}
                 </span>
               )}

               <button className="bg-brand-red text-white text-sm font-bold py-2 px-5 rounded-xl shadow hover:bg-red-700 active:scale-95 transition-transform">
                 {lang === 'ht' ? 'Kontakte' : 'Message'}
               </button>
            </div>

          </div>
        ))}
      </main>
    </div>
  );
}
