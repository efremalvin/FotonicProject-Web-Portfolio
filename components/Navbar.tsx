'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Image as ImageIcon, Sparkles, Menu, X } from 'lucide-react';
import { siteConfig } from '@/lib/site';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0c0a09]/95 backdrop-blur-md border-b border-stone-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo Header (Aperture + Serif Fotonic + Photo & Video Project) */}
          <a href="#top" className="flex items-center gap-2.5 sm:gap-3 group" aria-label="Fotonic — kembali ke atas">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center p-1 group-hover:border-[#d6a350]/60 transition-colors shrink-0 overflow-hidden">
              <Image
                src="/images/aperture-icon.png"
                alt="Fotonic Aperture"
                width={36}
                height={36}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight leading-none group-hover:text-[#e5b869] transition-colors">
                {siteConfig.name}
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-stone-400 font-semibold mt-0.5 leading-none">
                {siteConfig.subtitle}
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1.5">
            <a
              href="#katalog"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-stone-400 hover:text-white hover:bg-stone-900/60 transition-all"
            >
              <ImageIcon className="w-4 h-4 text-stone-400" />
              Katalog Karya
            </a>

            <a
              href="#pricelist"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-stone-400 hover:text-[#e5b869] hover:bg-stone-900/60 transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#e5b869]" />
              Price List
            </a>

            <a
              href="#notes"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-stone-400 hover:text-white hover:bg-stone-900/60 transition-all"
            >
              Ketentuan
            </a>
          </nav>

          {/* Right Action: Instagram Icon (NO WA ICON) & Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Instagram Circle Button */}
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-900/90 hover:bg-stone-850 border border-stone-800 hover:border-[#d6a350]/50 flex items-center justify-center text-stone-300 hover:text-white transition-all shadow-sm active:scale-95"
              aria-label={`Instagram ${siteConfig.instagram.handle}`}
              title={`Instagram ${siteConfig.instagram.handle}`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-900 border border-stone-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-800 bg-[#0c0a09]/98 backdrop-blur-xl px-4 pt-2 pb-5 space-y-2">
          <a
            href="#katalog"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-stone-300 hover:bg-stone-900"
          >
            <ImageIcon className="w-4 h-4 text-[#e5b869]" />
            Katalog Karya
          </a>

          <a
            href="#pricelist"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-stone-300 hover:bg-stone-900"
          >
            <Sparkles className="w-4 h-4 text-[#e5b869]" />
            Price List Paket
          </a>

          <a
            href="#notes"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-stone-300 hover:bg-stone-900"
          >
            Ketentuan &amp; Catatan
          </a>

          <div className="pt-2 border-t border-stone-800/80">
            <a
              href="#pricelist"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#e7bd70] via-[#d6a350] to-[#be8638] text-stone-950 shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              Lihat Price List ➜
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
