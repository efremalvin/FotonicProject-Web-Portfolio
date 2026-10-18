import Image from "next/image";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/SocialIcons";
import { siteConfig } from "@/lib/site";
import { getGeneralChatLink } from "@/lib/whatsapp";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3 transition-opacity hover:opacity-90" aria-label="Fotonic — kembali ke atas">
          <div className="relative size-9 overflow-hidden rounded-full border border-gold/40 bg-gold/10 p-1.5 transition duration-500 group-hover:rotate-90 group-hover:bg-gold/20">
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
            <span className="block font-display text-xl tracking-wide text-white">{siteConfig.name}</span>
            <span className="mt-0.5 block text-[10px] uppercase tracking-[0.25em] text-zinc-400">
              {siteConfig.subtitle}
            </span>
          </span>
        </a>

        {/* Quick Nav Anchor */}
        <div className="hidden items-center gap-6 md:flex">
          <a href="#katalog" className="text-xs uppercase tracking-widest text-zinc-400 transition hover:text-gold">
            Katalog
          </a>
          <a href="#pricelist" className="text-xs uppercase tracking-widest text-zinc-400 transition hover:text-gold">
            Price List
          </a>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${siteConfig.instagram.handle}`}
            className="flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-xs font-medium text-zinc-300 transition hover:border-gold/50 hover:text-white sm:text-sm"
          >
            <InstagramIcon size={16} />
            <span className="hidden sm:inline">{siteConfig.instagram.handle}</span>
          </a>
          <a
            href={getGeneralChatLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat admin via WhatsApp"
            className="btn-wa px-3.5 py-2 text-xs sm:px-4 sm:text-sm"
          >
            <WhatsAppIcon size={16} />
            <span className="hidden sm:inline">Chat Admin</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
