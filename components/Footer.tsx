import React from 'react';
import { MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { getGeneralChatLink } from '@/lib/whatsapp';

export default function Footer() {
  return (
    <footer id="kontak" className="mt-16 sm:mt-24 border-t border-stone-900 bg-[#0a0908] py-10 sm:py-14">
      {/* Container aligned with Header margins */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Responsive Layout: Stacked on mobile, Left-Right Split on Desktop (md:) */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6 sm:gap-8">
          
          {/* Left Block: Brand, Subtitle, Slogan & Location */}
          <div className="text-center md:text-left space-y-1.5">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">
                {siteConfig.name}
              </h2>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-stone-400 font-semibold mt-1">
                {siteConfig.subtitle}
              </p>
            </div>

            <p className="italic text-xs sm:text-sm text-stone-300 font-serif pt-1">
              &ldquo;Capture your moment and tell your story&rdquo;
            </p>
            
            <div className="inline-flex items-center gap-1.5 text-xs text-[#e5b869] font-medium pt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#e5b869]" />
              <span>{siteConfig.location}</span>
            </div>
          </div>

          {/* Right Block: 2 Action Pill Buttons (Stacked on mobile, side-by-side on desktop) */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto md:mx-0">
            {/* Button 1: Reservasi Sekarang! */}
            <a
              href={getGeneralChatLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-stone-900/90 hover:bg-stone-850 border border-stone-800 hover:border-[#10b981]/50 text-white text-xs sm:text-sm font-semibold transition-all group shadow-sm active:scale-[0.99] shrink-0"
            >
              {/* WhatsApp Icon */}
              <svg className="w-4 h-4 text-[#34d399] group-hover:scale-110 transition-transform shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.71 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Reservasi Sekarang!</span>
            </a>

            {/* Button 2: Instagram @fotonicproject */}
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-stone-900/90 hover:bg-stone-850 border border-stone-800 hover:border-[#d6a350]/50 text-white text-xs sm:text-sm font-semibold transition-all group shadow-sm active:scale-[0.99] shrink-0"
            >
              <svg className="w-4 h-4 text-[#e5b869] group-hover:scale-110 transition-transform shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>{siteConfig.instagram.handle}</span>
            </a>
          </div>

        </div>

        {/* Divider & Copyright Centered */}
        <div className="pt-6 border-t border-stone-900 text-center">
          <p className="text-[11px] text-stone-400">
            &copy; {new Date().getFullYear()} {siteConfig.name} Project. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
