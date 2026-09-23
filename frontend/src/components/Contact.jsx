import React from 'react';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';

const InstagramIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
 >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const ClockIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ExternalLinkIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function Contact() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="py-16 bg-pedal-cardBg border-t border-pedal-cardBorder text-pedal-textMuted text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Location & Operating Hours */}
        <div className="space-y-4">
          <h4 className="text-white font-extrabold text-lg tracking-wide">PedalPro Cycling</h4>
          <div className="space-y-2.5">
            <p className="flex items-center gap-3 text-slate-300">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Worli Seaface, Mumbai</span>
            </p>
            <p className="flex items-center gap-3 text-slate-300">
              <Clock className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Hours: 5:00 AM – 1:00 AM</span>
            </p>
          </div>
        </div>

        {/* Contact Info & Socials */}
        <div className="space-y-4">
          <h4 className="text-white font-extrabold text-lg tracking-wide">Contact Info</h4>
          <div className="space-y-3">
            <a 
              href="tel:+919920455722" 
              className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>+91 9920455722</span>
            </a>

            <a 
              href="mailto:pentabhavesh@gmail.com" 
              className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <span>pentabhavesh@gmail.com</span>
            </a>

            <a 
              href="https://instagram.com/pedal_pro_cycling_" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 text-slate-300 hover:text-pink-400 transition-colors group"
            >
              <InstagramIcon className="w-4 h-4 text-pink-500 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-medium">@pedal_pro_cycling_</span>
              <ExternalLinkIcon className="w-3 h-3 opacity-60 group-hover:opacity-100" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-white font-extrabold text-lg tracking-wide">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#cycles" className="hover:text-white transition-colors">Pricing & Cycles</a>
            </li>
            <li>
              <a href="#book" className="hover:text-white transition-colors">Booking Calculator</a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
            </li>
            <li>
              <a href="#faq" className="hover:text-white transition-colors">FAQ & Rules</a>
            </li>
            {/* <li>
              <a href="/admin/login" className="hover:text-white text-xs opacity-50 block mt-3">Admin Portal</a>
            </li> */}
          </ul>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-pedal-cardBorder text-center text-xs text-slate-500">
        © {currentYear} PedalPro Cycling. All rights reserved.
      </div>
    </footer>
  );
}