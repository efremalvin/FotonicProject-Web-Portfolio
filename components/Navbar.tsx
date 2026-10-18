import Image from "next/image";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/SocialIcons";
import { siteConfig } from "@/lib/site";
import { getGeneralChatLink } from "@/lib/whatsapp";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 sm:h-[72px] max-w-6xl items-center justify-between px-4 sm:px-8">
        {/* Brand / Logo */}
        <a href="#top" className="group flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-90 shrink-0" aria-label="Fotonic — kembali ke atas">
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
          <div className="flex flex-col justify-center">
            <span className="block font-display text-base sm:text-xl font-bold leading-tight tracking-wide text-white">
              {siteConfig.name}
            </span>
            <span className="block text-[8px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.25em] text-zinc-400 leading-tight mt-0.5">
              {siteConfig.subtitle}
            </span>
          </div>
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

        {/* Action Buttons - Simpel & Minimalis */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${siteConfig.instagram.handle}`}
            className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-gold/50 hover:bg-gold/10 hover:text-white"
          >
            <InstagramIcon size={16} className="text-zinc-300 hover:text-white" />
          </a>
          <a
            href={getGeneralChatLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Reservasi WhatsApp Fotonic"
            title="Reservasi via WhatsApp"
            className="flex size-9 items-center justify-center rounded-full bg-wa text-black shadow-lg shadow-wa/20 transition hover:brightness-110 active:scale-95"
          >
            <WhatsAppIcon size={17} />
          </a>
        </div>
      </nav>
    </header>
  );
}
