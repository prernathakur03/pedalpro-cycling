import React, { useState } from 'react';
import { Bike, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Cycles', href: '#cycles' },
    { name: 'Calculator', href: '#book' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'FAQ & Rules', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 max-w-7xl mx-auto">
      <nav className="bg-[#1E293B]/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl px-5 py-3 flex items-center justify-between transition-all">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img src= "/src/logo.jpeg" alt="PedalPro Logo" className="w-10 h-10 rounded-full object-cover border border-sky-500/30 group-hover:scale-105 group-hover:border-sky-400 transition-all duration-300" ></img>
          <div className="flex flex-col text-left">
            <span className="text-lg font-black tracking-tight text-white leading-none">
              PEDAL<span className="text-sky-400">PRO</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Worli Seaface</span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#book"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs shadow-lg shadow-sky-500/20 transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>Book Now</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-800 focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden mt-2 p-4 bg-slate-900/95 border border-slate-800 rounded-2xl backdrop-blur-2xl shadow-2xl space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#book"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center py-3 mt-2 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-600/30"
          >
            Book Now
          </a>
        </div>
      )}
    </header>
  );
}