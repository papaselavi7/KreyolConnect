"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Resources() {
  const [lang, setLang] = useState('ht');
  const [filterState, setFilterState] = useState('');
  const [creoleOnly, setCreoleOnly] = useState(false);

  // Mock data mimicking the seed
  const resources = [
    { id: 1, name: 'Miami Legal Aid Center', name_ht: 'Sant Èd Jidik Miami', cat: 'Legal', state: 'FL', isCreole: true, phone: '555-1234', distance: '2.5 mi' },
    { id: 2, name: 'NYC Housing Support', name_ht: 'Sipò Lojman NYC', cat: 'Housing', state: 'NY', isCreole: true, phone: '555-9876', distance: '12.0 mi' },
    { id: 3, name: 'Boston Health Clinic', name_ht: 'Klinik Sante Boston', cat: 'Health', state: 'MA', isCreole: false, phone: '555-5555', distance: '4.1 mi' },
  ];

  const filtered = resources.filter(r => {
    if (filterState && r.state !== filterState) return false;
    if (creoleOnly && !r.isCreole) return false;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-brand-surface font-sans text-brand-text pb-20">
      
      <header className="px-6 pt-10 pb-4 bg-brand-navy text-white rounded-b-3xl shadow-md sticky top-0 z-10 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-2xl opacity-80 hover:opacity-100">←</Link>
            <h1 className="text-2xl font-display font-bold">{lang === 'ht' ? 'Jwenn Èd' : 'Find Help'}</h1>
          </div>
          <button onClick={() => setLang(l => l === 'ht' ? 'en' : 'ht')} className="bg-white/20 px-3 py-1.5 rounded-full text-sm font-bold">
            {lang === 'ht' ? '🇭🇹' : '🇺🇸'}
          </button>
        </div>
        
        {/* Search & Filters */}
        <div className="flex gap-2">
           <select 
             className="flex-1 bg-white/10 border border-white/20 text-white rounded-xl px-4 py-2 outline-none appearance-none font-bold"
             value={filterState} onChange={e => setFilterState(e.target.value)}
           >
             <option value="" className="text-black">{lang === 'ht' ? 'Tout Eta Yo' : 'All States'}</option>
             <option value="FL" className="text-black">Florida</option>
             <option value="NY" className="text-black">New York</option>
             <option value="MA" className="text-black">Massachusetts</option>
           </select>
           
           <button 
             onClick={() => setCreoleOnly(!creoleOnly)}
             className={`flex-1 border rounded-xl px-4 py-2 font-bold transition-colors ${creoleOnly ? 'bg-brand-red border-brand-red text-white' : 'bg-white/10 border-white/20 text-white'}`}
           >
             {lang === 'ht' ? 'Sèlman Kreyòl' : 'Creole Only'}
           </button>
        </div>
      </header>

      <main className="flex-1 px-4 mt-6">
        <div className="space-y-4">
          {filtered.map(r => (
            <div key={r.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-brand-navy text-lg leading-tight">{lang === 'ht' ? r.name_ht : r.name}</h3>
                  <p className="text-xs text-brand-textMuted uppercase tracking-wider font-bold mt-1">{r.cat} • {r.state}</p>
                </div>
                <span className="text-sm font-bold text-gray-400">{r.distance}</span>
              </div>
              
              {r.isCreole && (
                <div className="inline-flex items-center gap-1.5 self-start bg-blue-50 text-brand-navy text-xs font-bold px-2.5 py-1 rounded-md border border-blue-100">
                  <span className="w-2 h-2 rounded-full bg-brand-navy"></span>
                  {lang === 'ht' ? 'Pale Kreyòl' : 'Creole Spoken'}
                </div>
              )}

              <div className="w-full h-px bg-gray-100 mt-1"></div>

              <div className="flex justify-between items-center mt-1">
                 <span className="font-mono text-sm font-bold">{r.phone}</span>
                 <div className="flex gap-2">
                   <button className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center hover:scale-105 transition-transform">📞</button>
                   <button className="w-10 h-10 rounded-full bg-gray-100 text-brand-navy flex items-center justify-center hover:bg-gray-200 transition-colors">📍</button>
                 </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
             <div className="text-center py-10 text-brand-textMuted font-bold">
               {lang === 'ht' ? 'Pa gen resous ki matche.' : 'No resources match your filters.'}
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
