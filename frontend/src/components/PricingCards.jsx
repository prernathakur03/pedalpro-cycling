import React from 'react';
import { Check, MessageCircle, Sparkles, Clock, Award } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { createWhatsAppLink } from '../utils/whatsapp';

export default function PricingCards() {
  const { cycles = [], settings = {} } = useSettings();

  const displayCycles = Array.isArray(cycles) && cycles.length > 0 ? cycles : [
    {
      id: 1,
      name: 'Non-Gear Cycle',
      description: 'Smooth, lightweight standard city cycle. Ideal for relaxed cruising along Worli Seaface.',
      one_hour_price: 250,
      two_hour_price: 350,
      badge_text: 'Best for Casual Riders'
    },
    {
      id: 2,
      name: 'Gear Cycle',
      description: 'Multi-speed Shimano geared bicycle for effortless fitness, speed, and long distances.',
      one_hour_price: 300,
      two_hour_price: 500,
      badge_text: 'Most Popular'
    }
  ];

  return (
    <section id="cycles" className="py-24 bg-[#0F172A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Cycles & Pricing
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Transparent pricing directly synchronized with our database. No hidden charges.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {displayCycles.map((item) => {
            const waLink = createWhatsAppLink({
              phone: settings?.whatsapp_number || '919920455722',
              cycleType: item.name,
              quantity: 1,
              durationHours: 1,
              estimatedPrice: item.one_hour_price
            });

            return (
              <div
                key={item.id}
                className="group relative bg-[#1E293B]/70 border border-slate-700/80 rounded-3xl p-8 flex flex-col justify-between hover:border-sky-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 text-[11px] font-bold uppercase tracking-wider">
                      <Award className="w-3 h-3" />
                      {item.badge_text || 'Premium'}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.description}</p>

                  {/* Pricing Box */}
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-500" /> 1 Hour Ride
                      </span>
                      <span className="text-xl font-black text-white">₹{parseFloat(item.one_hour_price || 0)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                      <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-sky-400" /> 2 Hours Ride
                      </span>
                      <span className="text-xl font-black text-sky-400">₹{parseFloat(item.two_hour_price || 0)}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Sanitized helmet & safety lock included
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Verified condition & disk brakes
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Direct pickup at Worli Seaface
                    </li>
                  </ul>
                </div>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" /> Enquire Availability
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}