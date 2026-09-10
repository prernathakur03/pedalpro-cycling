import React, { useState } from 'react';
import { HelpCircle, Shield, ChevronDown, Clock, FileText, Info, Phone } from 'lucide-react';

export default function FaqRules() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What documents do I need to submit to rent a cycle?",
      answer: "You must present an original valid Government ID (Aadhaar Card, Driving License, or Passport) for verification upon pick-up at Worli Seaface."
    },
    {
      question: "How does the WhatsApp booking flow work?",
      answer: "Select your preferred cycle category (Gear or Non-Gear) and duration on our website, then click 'Book via WhatsApp'. You will be redirected to chat directly with our team to confirm real-time availability and pick-up timing."
    },
    {
      question: "Are helmets and security locks provided?",
      answer: "Yes, protective helmets and cycle locks are included free of charge with every rental for your safety."
    },
    {
      question: "What are your operational hours?",
      answer: "We operate daily from 5:00 AM to 1:00 AM at Worli Seaface, Mumbai."
    }
  ];

  const rules = [
    {
      icon: FileText,
      title: "Mandatory ID Verification",
      description: "Original Government ID proof is required at the time of cycle collection."
    },
    {
      icon: Clock,
      title: "Punctual Return",
      description: "Return cycles on time to keep rentals smooth for scheduled riders."
    },
    {
      icon: Info,
      title: "Ride Responsibility",
      description: "Riders are responsible for safe riding and any accidental damage during the rental period."
    },
    {
      icon: Shield,
      title: "Promenade Rules",
      description: "Follow local traffic signals and obey designated pedestrian/cycling guidelines along Worli Seaface."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-pedal-darkBg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support & Guidelines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            FAQ & Rental Rules
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Everything you need to know before taking your cycle out on Worli Seaface.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Rules Column */}
          <div className="lg:col-span-5 bg-pedal-cardBg border border-pedal-cardBorder rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-sky-400" />
              <span>Rental Terms & Rules</span>
            </h3>

            <div className="space-y-6">
              {rules.map((rule, idx) => {
                const IconComponent = rule.icon;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{rule.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {rule.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Support Callout Box */}
            <div className="mt-8 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
              <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-xs text-slate-300">
                Have custom group ride requirements? <span className="text-white font-semibold">Contact us directly on WhatsApp.</span>
              </div>
            </div>
          </div>

          {/* FAQ Accordion Column */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-sky-400" />
              <span>Frequently Asked Questions</span>
            </h3>

            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-pedal-cardBorder bg-pedal-cardBg rounded-2xl overflow-hidden transition-colors duration-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-semibold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-sky-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 border-t border-pedal-cardBorder pt-3 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}