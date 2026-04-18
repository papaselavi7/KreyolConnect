"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Tracker() {
  const [lang, setLang] = useState('ht');
  const [view, setView] = useState('list'); // list | add | detail

  // Mock Data
  const documents = [
    { id: 1, type: 'TPS', num: '****1234', issue: '2023-01-15', expiry: '2024-06-30', days: 45, status: 'Ap Ekspire Byento' },
    { id: 2, type: 'EAD', num: '****9988', issue: '2023-05-10', expiry: '2025-05-10', days: 210, status: 'Aktif' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-brand-surface font-sans text-brand-text pb-20">
      
      <header className="px-6 pt-10 pb-4 bg-brand-navy text-white rounded-b-3xl shadow-md sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-2xl opacity-80 hover:opacity-100">←</Link>
          <h1 className="text-2xl font-display font-bold">{lang === 'ht' ? 'Estatou Mwen' : 'My Status'}</h1>
        </div>
        <button onClick={() => setLang(l => l === 'ht' ? 'en' : 'ht')} className="bg-white/20 px-3 py-1.5 rounded-full text-sm font-bold">
          {lang === 'ht' ? '🇭🇹 HT' : '🇺🇸 EN'}
        </button>
      </header>

      <main className="flex-1 px-4 mt-6">
        {/* LIST VIEW */}
        {view === 'list' && (
          <div className="animate-in fade-in duration-300">
            <div className="flex justify-between items-end mb-4 px-1">
              <h2 className="font-bold text-lg text-brand-navy">{lang === 'ht' ? 'Dokiman Ou Yo' : 'Your Documents'}</h2>
            </div>
            
            <div className="space-y-4">
              {documents.map(doc => (
                <div key={doc.id} onClick={() => setView('detail')} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-xl">📄</div>
                      <div>
                        <h3 className="font-bold text-lg text-brand-navy">{doc.type}</h3>
                        <p className="text-xs font-mono text-gray-500">{doc.num}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${doc.days < 60 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {doc.status}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-100 rounded-full h-2 mt-2 overflow-hidden">
                    <div className={`h-2 rounded-full ${doc.days < 60 ? 'bg-brand-red' : 'bg-brand-green'}`} style={{ width: `${Math.max(10, 100 - (doc.days / 365 * 100))}%` }}></div>
                  </div>
                  
                  <div className="flex justify-between mt-3 text-sm">
                    <span className="text-brand-textMuted font-medium">{lang === 'ht' ? 'Rete:' : 'Remaining:'}</span>
                    <span className={`font-bold ${doc.days < 60 ? 'text-brand-red' : 'text-brand-text'}`}>{doc.days} {lang === 'ht' ? 'jou' : 'days'}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* FAB */}
            <button onClick={() => setView('add')} className="fixed bottom-24 right-6 w-14 h-14 bg-brand-red text-white text-3xl font-light rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
              +
            </button>
          </div>
        )}

        {/* ADD VIEW */}
        {view === 'add' && (
          <div className="animate-in slide-in-from-bottom duration-300 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-display font-bold text-xl text-brand-navy mb-4">{lang === 'ht' ? 'Ajoute yon Dokiman' : 'Add Document'}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-brand-textMuted mb-1">{lang === 'ht' ? 'Kalite Dokiman' : 'Document Type'}</label>
                <select className="w-full p-4 border border-gray-200 rounded-xl bg-brand-bg outline-none">
                  <option>TPS</option>
                  <option>EAD</option>
                  <option>I-94</option>
                  <option>Asylum Notice</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-brand-textMuted mb-1">{lang === 'ht' ? 'Nimewo Dokiman (Opsyonèl)' : 'Document Number'}</label>
                <input type="text" placeholder="A123456789" className="w-full p-4 border border-gray-200 rounded-xl bg-brand-bg outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-brand-textMuted mb-1">{lang === 'ht' ? 'Dat Emisyon' : 'Issue Date'}</label>
                  <input type="date" className="w-full p-4 border border-gray-200 rounded-xl bg-brand-bg outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-textMuted mb-1">{lang === 'ht' ? 'Dat Ekspirasyon' : 'Expiry Date'}</label>
                  <input type="date" className="w-full p-4 border border-gray-200 rounded-xl bg-brand-bg outline-none text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-textMuted mb-2">{lang === 'ht' ? 'Fè m sonje' : 'Remind me'}</label>
                <div className="flex gap-2">
                  {['30', '60', '90'].map(d => (
                    <button key={d} className="flex-1 py-2 border-2 border-brand-navy rounded-lg text-brand-navy font-bold hover:bg-blue-50 focus:bg-brand-navy focus:text-white transition-colors">
                      {d} {lang === 'ht' ? 'jou' : 'days'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button onClick={() => setView('list')} className="flex-1 py-4 text-brand-navy font-bold bg-gray-100 rounded-xl">{lang === 'ht' ? 'Anile' : 'Cancel'}</button>
                <button onClick={() => setView('list')} className="flex-1 py-4 text-white font-bold bg-brand-navy rounded-xl shadow-md">{lang === 'ht' ? 'Sove' : 'Save'}</button>
              </div>
            </div>
          </div>
        )}

        {/* DETAIL VIEW */}
        {view === 'detail' && (
          <div className="animate-in slide-in-from-right bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-start mb-6">
               <div>
                  <h2 className="font-display font-bold text-2xl text-brand-navy">TPS Document</h2>
                  <p className="text-brand-textMuted font-mono mt-1">****1234</p>
               </div>
               <button onClick={() => setView('list')} className="text-gray-400 font-bold hover:text-black">✕</button>
             </div>

             <div className="bg-red-50 p-4 rounded-xl border border-red-100 mb-6 flex flex-col items-center justify-center text-center">
               <span className="text-sm font-bold text-brand-red uppercase tracking-wide">{lang === 'ht' ? 'Rete' : 'Remaining'}</span>
               <span className="text-4xl font-display font-bold text-brand-red my-1">45</span>
               <span className="text-sm text-brand-red">{lang === 'ht' ? 'jou' : 'days'}</span>
             </div>

             <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-brand-textMuted">{lang === 'ht' ? 'Kisa pou fè apre' : 'What to do next'}</h3>
                  <Link href="/guides/tps" className="block mt-2 bg-blue-50 text-brand-navy p-4 rounded-xl font-bold border border-blue-100 hover:bg-blue-100 transition-colors">
                    📘 {lang === 'ht' ? 'Gid: Kijan pou Renouvle TPS' : 'Guide: How to Renew TPS'} →
                  </Link>
                </div>
                
                <div className="flex gap-4">
                  <button className="flex-1 py-3 text-brand-navy font-bold bg-gray-50 border border-gray-200 rounded-xl">{lang === 'ht' ? 'Modifye' : 'Edit'}</button>
                  <button className="flex-1 py-3 text-brand-red font-bold bg-red-50 border border-red-100 rounded-xl">{lang === 'ht' ? 'Efase' : 'Delete'}</button>
                </div>
             </div>
          </div>
        )}

      </main>
    </div>
  );
}
