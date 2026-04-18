"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

type Message = { role: 'user' | 'assistant'; content: string };

export default function AIChat() {
  const [lang, setLang] = useState('ht');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Bonjou! Mwen se asistan legal vityèl ou. Kijan m ka ede w jodi a ak koze imigrasyon ou?' }
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = (override?: string) => {
    const text = override || input;
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    
    // Stub response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: lang === 'ht' 
          ? "Mwen byen konprann sitiyasyon w lan. Men kisa ofisyèl la di sou sa..." 
          : "I understand your situation. Here is what the official guidance states..." 
      }]);
    }, 1000);
  };

  const presetsHt = ["Konbyen tan TPS dire?", "Kijan poum aplike pou Azil?", "Frè pou Pèmi Travay la"];
  const presetsEn = ["How long does TPS last?", "How to apply for Asylum?", "Work Permit Fees"];

  return (
    <div className="flex flex-col h-screen bg-brand-surface font-sans text-brand-text">
      
      <header className="px-6 pt-10 pb-4 bg-brand-navy text-white rounded-b-3xl shadow-md z-10 flex justify-between items-center flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-2xl opacity-80 hover:opacity-100">←</Link>
          <h1 className="text-lg font-display font-bold">
            {lang === 'ht' ? 'Asistan Konseye' : 'Legal Assistant'} ⚖️
          </h1>
        </div>
        <button onClick={() => {
            setLang(l => l === 'ht' ? 'en' : 'ht');
            setMessages([{ role: 'assistant', content: lang === 'ht' ? 'Hello! I am your virtual legal assistant. How can I help you regarding immigration today?' : 'Bonjou! Mwen se asistan legal vityèl ou. Kijan m ka ede w jodi a ak koze imigrasyon ou?'}]);
          }} className="bg-white/20 px-3 py-1.5 rounded-full text-sm font-bold">
          {lang === 'ht' ? '🇭🇹' : '🇺🇸'}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-brand-navy text-white rounded-br-sm' : 'bg-white border border-gray-100 shadow-sm rounded-bl-sm'}`}>
              <p className="text-sm leading-relaxed">{m.content}</p>
            </div>
          </div>
        ))}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {(lang === 'ht' ? presetsHt : presetsEn).map(p => (
              <button key={p} onClick={() => send(p)} className="bg-blue-50 text-brand-navy text-xs font-bold border border-blue-100 px-3 py-2 rounded-full hover:bg-blue-100 transition-colors">
                {p}
              </button>
            ))}
          </div>
        )}
        <div ref={endRef} />
      </main>

      <div className="p-4 bg-white border-t border-gray-100 pb-8 flex gap-2">
        <input 
          type="text" 
          placeholder={lang === 'ht' ? 'Ekri mesaj ou la...' : 'Type your message...'}
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          className="flex-1 p-3 border border-gray-200 rounded-xl bg-brand-bg focus:ring-2 focus:ring-brand-navy outline-none"
        />
        <button onClick={() => send()} className="w-12 h-12 bg-brand-red text-white rounded-xl flex justify-center items-center font-bold hover:scale-105 transition-transform shadow-md">
          →
        </button>
      </div>

    </div>
  );
}
