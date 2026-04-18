"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function PremiumPaywall() {
  const [lang, setLang] = useState('ht');

  return (
    <div className="flex flex-col min-h-screen bg-brand-surface font-sans text-brand-text pb-20">
      
      <header className="px-6 pt-10 pb-4 bg-transparent sticky top-0 z-10 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm">✕</Link>
        <button onClick={() => setLang(l => l === 'ht' ? 'en' : 'ht')} className="bg-white px-3 py-1.5 rounded-full text-sm font-bold shadow-sm">
          {lang === 'ht' ? '🇭🇹' : '🇺🇸'}
        </button>
      </header>

      <main className="flex-1 px-4 flex flex-col items-center">
        
        <div className="text-5xl mb-4">⭐</div>
        <h1 className="text-3xl font-display font-bold text-center text-brand-navy mb-2">
           KreyolConnect <span className="text-brand-red">PRO</span>
        </h1>
        <p className="text-center text-brand-textMuted mb-8 leading-relaxed max-w-xs">
          {lang === 'ht' 
            ? 'Debloke tout karakteristik ou bezwen pou avanse pèsonèlman an sekirite.' 
            : 'Unlock all the premium features you need to advance securely.'}
        </p>

        <section className="bg-white w-full rounded-3xl p-6 shadow-xl border-t-4 border-brand-red mb-8">
           <ul className="space-y-4 font-bold text-brand-navy">
             <li className="flex items-center gap-3"><span className="text-green-500">✓</span> {lang === 'ht' ? 'Alèt Renouvèlman Espesyal (SMS)' : 'Priority Renewal SMS Alerts'}</li>
             <li className="flex items-center gap-3"><span className="text-green-500">✓</span> {lang === 'ht' ? 'Entèraksyon AI San Limit' : 'Unlimited AI Legal Guide Chat'}</li>
             <li className="flex items-center gap-3"><span className="text-green-500">✓</span> {lang === 'ht' ? 'Gid Aplikasyon Detaye' : 'Detailed Premium Application Guides'}</li>
             <li className="flex items-center gap-3"><span className="text-green-500">✓</span> {lang === 'ht' ? 'Pa Gen Anons' : 'Ad-Free Remittance Exprience'}</li>
           </ul>
        </section>

        <section className="w-full flex gap-3 mb-8">
           <button className="flex-1 border-2 border-brand-red bg-red-50 p-4 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-transform active:scale-95">
             <span className="font-bold text-brand-navy text-lg">{lang === 'ht' ? 'Chak Mwa' : 'Monthly'}</span>
             <span className="text-2xl font-display font-bold text-brand-red mt-1">$4.99</span>
           </button>
           <button className="flex-1 border-2 border-transparent bg-white shadow p-4 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-navy transition-all">
             <span className="font-bold text-sm text-white bg-brand-green px-2 py-0.5 rounded-full mb-1">{lang === 'ht' ? 'Sove 20%' : 'Save 20%'}</span>
             <span className="font-bold text-brand-navy text-lg">{lang === 'ht' ? 'Pa Ane' : 'Annual'}</span>
             <span className="text-2xl font-display font-bold text-gray-800 mt-1">$49.99</span>
           </button>
        </section>

        <button className="w-full bg-brand-red text-white py-4 rounded-xl text-xl font-bold shadow-lg shadow-red-200 hover:bg-red-700 active:scale-95 transition-all mb-4">
           {lang === 'ht' ? 'Kòmanse PRO Kounye a' : 'Upgrade to PRO Now'}
        </button>

        <p className="text-xs text-center text-gray-400">
           {lang === 'ht' 
             ? 'Peman an ap fèt sou kont Apple/Google ou. Yo ap renouvle li otomatikman sof si ou anile li.' 
             : 'Payment is charged to your Apple/Google account and auto-renews unless canceled.'}
        </p>

      </main>
    </div>
  );
}
