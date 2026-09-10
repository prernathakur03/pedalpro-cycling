import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PricingCards from './components/PricingCards';
import BookingCalculator from './components/BookingCalculator';
import Chatbot from './components/Chatbot';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AdminDashboard from './admin/AdminDashboard';
import AdminLogin from './admin/AdminLogin';
import Gallery from './components/Gallery';
import FaqRules from './components/FaqRules';
import Contact from './components/Contact';

function HomePage() {
  return (
    <div className="bg-pedal-darkBg min-h-screen text-gray-100 font-sans selection:bg-pedal-bluePrimary selection:text-white">
      <Navbar />
      <Hero />
      <PricingCards />
      <BookingCalculator />
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-pedal-darkBg ">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-pedal-cardBg p-6 rounded-2xl border border-pedal-cardBorder">
              <span className="text-3xl font-extrabold text-pedal-blueAccent block mb-2">01</span>
              <h3 className="text-lg font-bold text-white mb-2">Choose Your Cycle</h3>
              <p className="text-sm text-pedal-textMuted">Select Gear or Non-Gear cycles based on your preference.</p>
            </div>
            <div className="bg-pedal-cardBg p-6 rounded-2xl border border-pedal-cardBorder">
              <span className="text-3xl font-extrabold text-pedal-blueAccent block mb-2">02</span>
              <h3 className="text-lg font-bold text-white mb-2">Select Duration</h3>
              <p className="text-sm text-pedal-textMuted">Pick 1 or 2 hours duration and calculate estimated cost.</p>
            </div>
            <div className="bg-pedal-cardBg p-6 rounded-2xl border border-pedal-cardBorder">
              <span className="text-3xl font-extrabold text-pedal-blueAccent block mb-2">03</span>
              <h3 className="text-lg font-bold text-white mb-2">WhatsApp Us</h3>
              <p className="text-sm text-pedal-textMuted">Send enquiry. Owner checks availability instantly.</p>
            </div>
            <div className="bg-pedal-cardBg p-6 rounded-2xl border border-pedal-cardBorder">
              <span className="text-3xl font-extrabold text-pedal-blueAccent block mb-2">04</span>
              <h3 className="text-lg font-bold text-white mb-2">Ride!</h3>
              <p className="text-sm text-pedal-textMuted">Collect your cycle at Worli Seaface and enjoy your ride!</p>
            </div>
          </div>
        </div>
      </section>

      <Gallery />
      <FaqRules />

      <Contact />

      <Chatbot />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </SettingsProvider>
    </AuthProvider>
  );
}