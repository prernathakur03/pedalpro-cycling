import React, { useState } from 'react';
import { Calculator, Calendar, Clock, User, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { createWhatsAppLink } from '../utils/whatsapp';

export default function BookingCalculator() {
  const { cycles = [], settings = {} } = useSettings();

  const [cycleType, setCycleType] = useState('Gear Cycle');
  const [duration, setDuration] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const calculateTotal = () => {
    const selected = cycles.find((c) => c.name === cycleType);
    let basePrice = 300;
    if (selected) {
      basePrice = duration === 2 ? parseFloat(selected.two_hour_price) : parseFloat(selected.one_hour_price);
    } else {
      basePrice = cycleType.includes('Gear') && !cycleType.includes('Non') 
        ? (duration === 2 ? 500 : 300) 
        : (duration === 2 ? 350 : 250);
    }
    return basePrice * Math.max(1, quantity);
  };

  const estimatedTotal = calculateTotal();

  const handleEnquiry = (e) => {
    if (!name.trim()) {
      e.preventDefault();
      setErrorMsg('Please enter your name.');
      return;
    }
    const cleanPhone = phone.trim().replace(/[^0-9]/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      e.preventDefault();
      setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    setErrorMsg('');
  };

  const waLink = createWhatsAppLink({
    phone: settings?.whatsapp_number || '919920455722',
    customerName: name,
    cycleType,
    quantity,
    durationHours: duration,
    date,
    time,
    estimatedPrice: estimatedTotal
  });

  return (
    <section id="book" className="py-24 bg-slate-900/40 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-sky-400 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Instant Estimator</span>
          </div>
          <h2 className="text-3xl font-black text-white">Booking Price Calculator</h2>
          <p className="text-slate-400 text-sm mt-2">Calculate estimated ride cost instantly and enquire directly on WhatsApp.</p>
        </div>

        <div className="bg-[#1E293B]/80 border border-slate-700/80 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Cycle Type</label>
              <select
                value={cycleType}
                onChange={(e) => setCycleType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-sky-500 outline-none"
              >
                <option value="Non-Gear Cycle">Non-Gear Cycle</option>
                <option value="Gear Cycle">Gear Cycle</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-sky-500 outline-none"
              >
                <option value={1}>1 Hour</option>
                <option value={2}>2 Hours</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-sky-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-400" /> Preferred Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-sky-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" /> Preferred Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-sky-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-sky-400" /> Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-sky-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-sky-400" /> Mobile Number (10 Digits)
              </label>
              <input
                type="tel"
                placeholder="e.g. 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:border-sky-500 outline-none"
              />
            </div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between mb-8">
            <div>
              <p className="text-xs text-slate-400 font-medium">Estimated Amount</p>
              <p className="text-3xl font-black text-sky-400">₹{estimatedTotal}</p>
            </div>
            <p className="text-[11px] text-slate-500 max-w-xs text-right hidden sm:block">
              Estimated price only. Final confirmation is subject to availability via WhatsApp.
            </p>
          </div>

          <a
            href={waLink}
            onClick={handleEnquiry}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 text-base shadow-lg shadow-emerald-600/20"
          >
            <MessageSquare className="w-5 h-5" /> Enquire on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}