import Image from "next/image";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/SocialIcons";
import { siteConfig } from "@/lib/site";
import { getGeneralChatLink } from "@/lib/whatsapp";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 sm:h-[72px] max-w-6xl items-center justify-between px-4 sm:px-8">
        {/* Brand / Logo */}
        <a href="#top" className="group flex items-center gap-2.5 sm:gap-3 transition-opacity hover:opacity-90 shrink-0" aria-label="Fotonic — kembali ke atas">
          <div className="relative size-8 sm:size-9 overflow-hidden rounded-full border border-gold/40 bg-gold/10 p-1 sm:p-1.5 transition duration-500 group-hover:rotate-90 group-hover:bg-gold/20 shrink-0">
            <Image
              src="/images/aperture-white.png"
              alt="Fotonic Shutter Icon"
              width={36}
              height={36}
              priority
              className="size-full object-contain"
            />
          </div>
          <span className="leading-none">
            <span className="block font-display text-lg sm:text-xl tracking-wide text-white">{siteConfig.name}</span>
            <span className="mt-0.5 block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-zinc-400">
              {siteConfig.subtitle}
            </span>
          </span>
        </a>

        {/* Quick Nav Anchor (Desktop) */}
        <div className="hidden items-center gap-6 md:flex">
          <a href="#katalog" className="text-xs uppercase tracking-widest text-zinc-400 transition hover:text-gold">
            Katalog
          </a>
          <a href="#pricelist" className="text-xs uppercase tracking-widest text-zinc-400 transition hover:text-gold">
            Price List
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${siteConfig.instagram.handle}`}
            className="flex size-9 sm:size-auto sm:h-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] sm:px-4 text-xs font-medium text-zinc-300 transition hover:border-gold/50 hover:text-white"
          >
            <InstagramIcon size={16} />
            <span className="hidden sm:inline">{siteConfig.instagram.handle}</span>
          </a>
          <a
            href={getGeneralChatLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat admin via WhatsApp"
            className="btn-wa h-9 sm:h-10 px-3.5 sm:px-5 text-xs sm:text-sm font-semibold whitespace-nowrap"
          >
            <WhatsAppIcon size={16} className="shrink-0" />
            <span>Reservasi Sekarang!</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
