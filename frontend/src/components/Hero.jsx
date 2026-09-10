import React from 'react';
import { MapPin, Bike, MessageSquare, ShieldCheck, Clock } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function Hero() {
  const { settings } = useSettings();

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-24 pb-16 bg-[#0F172A]">
      {/* Background Hero Image with Blend Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-250 z-0"
        style={{
          backgroundImage: `url('/src/backdrop.jpeg')`
        }}
      />
      <div className="absolute inset-0 bg-black/60" />
      {/* <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/80 via-[#0F172A]/90 to-[#0F172A] z-10" /> */}

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center">
        
        {/* Location Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-sky-400 text-xs font-semibold tracking-wide mb-6">
          <MapPin className="w-3.5 h-3.5 text-sky-400" />
          <span>{settings?.address || 'Worli Seaface, Mumbai'}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-tight max-w-4xl">
          Ride Through The City With <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Freedom</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          {settings?.description || 'Premium cycle rentals available from 5:00 AM to 1:00 AM. Enjoy smooth rides, hourly rentals, and unforgettable adventures along Mumbai coastal promenade.'}
        </p>

        {/* Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 w-full max-w-3xl">
          {[
            { label: '40+ Premium Cycles', icon: Bike },
            { label: 'Starts @ ₹250/hr', icon: Clock },
            { label: 'Easy WhatsApp Booking', icon: MessageSquare },
            { label: 'Worli Seaface Location', icon: ShieldCheck }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex flex-col items-center justify-center gap-1.5 backdrop-blur-sm">
                <Icon className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold text-slate-200">{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <a
            href="#book"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Bike className="w-4 h-4" />
            <span>Calculate & Book</span>
          </a>

          <a
            href={`https://wa.me/${settings?.whatsapp_number || '919920455722'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/20 transition-all duration-200 hover:-translate-y-0.5"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}