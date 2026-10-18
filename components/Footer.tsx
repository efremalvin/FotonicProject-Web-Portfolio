import { InstagramIcon, WhatsAppIcon } from "@/components/icons/SocialIcons";
import { displayPhone, siteConfig } from "@/lib/site";
import { getGeneralChatLink } from "@/lib/whatsapp";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="kontak" className="relative border-t border-white/5 bg-ink py-12 sm:py-16">
      {/* Subtle Ambient Light */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start">
            <a href="#top" className="group inline-block transition-opacity hover:opacity-90" aria-label="Fotonic Project">
              <span className="block font-display text-2xl tracking-wide text-white">
                {siteConfig.name}
              </span>
              <span className="mt-0.5 block text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                {siteConfig.subtitle}
              </span>
            </a>
            <p className="mt-2 text-sm italic text-zinc-400">
              &ldquo;Capture your moment and tell your story&rdquo;
            </p>
          </div>

          {/* Symmetrical Action Buttons */}
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <a
              href={getGeneralChatLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-full sm:w-[280px] items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-5 text-xs sm:text-sm font-medium text-zinc-200 whitespace-nowrap transition hover:border-wa/60 hover:bg-wa/10 hover:text-white"
            >
              <WhatsAppIcon size={18} className="text-wa shrink-0" />
              <span className="whitespace-nowrap">Reservasi Sekarang! (WA Me)</span>
            </a>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-full sm:w-[280px] items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-5 text-xs sm:text-sm font-medium text-zinc-200 whitespace-nowrap transition hover:border-gold/60 hover:bg-gold/10 hover:text-white"
            >
              <InstagramIcon size={18} className="text-gold shrink-0" />
              <span className="whitespace-nowrap">{siteConfig.instagram.handle}</span>
            </a>
          </div>
        </div>

        <p className="mt-12 border-t border-white/5 pt-6 text-center text-xs text-zinc-600">
          © {year} Fotonic Project. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
