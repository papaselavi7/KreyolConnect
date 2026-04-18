"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Remittances() {
  const [lang, setLang] = useState('ht');
  const [usdAmount, setUsdAmount] = useState<number>(100);

  // Mock Providers based on Seed
  const providers = [
    { id: 1, name: 'Western Union', fee: 5.0, rate: 131.50, speed: 'instant' },
    { id: 2, name: 'CAM Transfer', fee: 4.0, rate: 132.00, speed: 'instant' },
    { id: 3, name: 'Remitly', fee: 1.99, rate: 130.00, speed: 'instant' },
    { id: 4, name: 'CashApp (P2P Workaround)', fee: 0.0, rate: 131.00, speed: 'instant' },
    { id: 5, name: 'Xoom', fee: 4.99, rate: 127.50, speed: '1-2 days' },
  ];

  // Calculate Net HTG Recieved: ((USD - Fee) * Rate) OR (USD * Rate) - (Fee*Rate). 
  // Let's assume Fee is deducted from total charged, so if I send $100, $5 is fee, $95 is converted.
  const calculations = providers.map(p => {
    const amountToConvert = Math.max(0, usdAmount - p.fee);
    const netHtg = amountToConvert * p.rate;
    return { ...p, netHtg };
  }).sort((a, b) => b.netHtg - a.netHtg); // Sort best payout first

  return (
    <div className="flex flex-col min-h-screen bg-brand-surface font-sans text-brand-text pb-20">
      
      <header className="px-6 pt-10 pb-8 bg-brand-navy text-white rounded-b-3xl shadow-md sticky top-0 z-10 transition-all">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-2xl opacity-80 hover:opacity-100">←</Link>
            <h1 className="text-2xl font-display font-bold">{lang === 'ht' ? 'Konpare Lajan' : 'Compare Rates'}</h1>
          </div>
          <button onClick={() => setLang(l => l === 'ht' ? 'en' : 'ht')} className="bg-white/20 px-3 py-1.5 rounded-full text-sm font-bold">
            {lang === 'ht' ? '🇭🇹' : '🇺🇸'}
          </button>
        </div>

        <div className="bg-white/10 p-5 rounded-2xl border border-white/20 mt-4 backdrop-blur-md relative overflow-hidden">
           <p className="text-sm opacity-80 font-bold mb-2">{lang === 'ht' ? 'Montan ou vle voye a (USD)' : 'Amount you want to send (USD)'}</p>
           <div className="flex items-center text-4xl font-display font-bold">
             <span className="opacity-50 mr-1">$</span>
             <input 
               type="number" 
               value={usdAmount} 
               onChange={e => setUsdAmount(Number(e.target.value) || 0)}
               className="bg-transparent outline-none w-full border-b-2 border-transparent focus:border-brand-red transition-colors"
             />
           </div>
        </div>
      </header>

      <main className="flex-1 px-4 mt-6">
        <div className="flex justify-between items-end mb-4 px-1">
          <h2 className="font-bold text-lg text-brand-navy">{lang === 'ht' ? 'Pi bon fason pou voye jodi a' : 'Best ways to send today'}</h2>
        </div>

        <div className="space-y-4">
          {calculations.map((p, index) => (
            <div key={p.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              
              {/* Highlight Best Rate Badge */}
              {index === 0 && (
                <div className="absolute top-0 right-0 bg-brand-green text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-sm">
                  {lang === 'ht' ? 'Pi Bon Chwa' : 'Best Choice'}
                </div>
              )}

              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-brand-navy shadow-inner text-xs text-center leading-tight">
                    {p.name.substring(0, 3).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy leading-tight">{p.name}</h3>
                    <p className="text-xs text-brand-textMuted flex items-center gap-1 mt-0.5">
                      <span className="text-green-500">⚡</span> {p.speed === 'instant' ? (lang === 'ht' ? 'Menm Kote A' : 'Instant') : p.speed}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 my-2">
                 <div className="flex justify-between items-center mb-1">
                   <span className="text-sm text-gray-500">{lang === 'ht' ? 'Pousantaj Echanj' : 'Exchange Rate'}:</span>
                   <span className="font-mono text-sm font-bold text-brand-navy">1$ = {p.rate.toFixed(2)} HTG</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-sm text-gray-500">{lang === 'ht' ? 'Frè Transfè' : 'Transfer Fee'}:</span>
                   <span className="font-mono text-sm font-bold text-brand-red">-${p.fee.toFixed(2)}</span>
                 </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                 <div className="flex flex-col">
                   <span className="text-xs font-bold text-brand-textMuted uppercase tracking-wider">{lang === 'ht' ? 'Fanmi w ap resevwa' : 'Family receives'}</span>
                   <span className="text-2xl font-display font-bold text-brand-green">
                     {new Intl.NumberFormat('fr-FR').format(p.netHtg)} <span className="text-sm opacity-60">HTG</span>
                   </span>
                 </div>
                 
                 <button className="bg-brand-navy text-white text-sm font-bold py-3 px-5 rounded-xl shadow hover:bg-gray-800 active:scale-95 transition-transform">
                   {lang === 'ht' ? 'Voye' : 'Send'}
                 </button>
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
