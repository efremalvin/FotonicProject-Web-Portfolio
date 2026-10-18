import { InstagramIcon, WhatsAppIcon } from "@/components/icons/SocialIcons";
import { displayPhone, siteConfig } from "@/lib/site";
import { getGeneralChatLink } from "@/lib/whatsapp";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="kontak" className="border-t border-white/5 bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <a href="#top" className="group inline-block transition-opacity hover:opacity-90" aria-label="Fotonic Project">
              <span className="block font-display text-2xl tracking-wide text-white">
                {siteConfig.name}
              </span>
              <span className="mt-0.5 block text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                {siteConfig.subtitle}
              </span>
            </a>
            <p className="mt-3 text-sm italic text-zinc-400">
              &ldquo;Capture your moment and tell your story&rdquo;
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={getGeneralChatLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-5 py-3 text-sm text-zinc-300 transition hover:border-wa/50 hover:bg-wa/5 hover:text-white"
            >
              <WhatsAppIcon size={18} className="text-wa" />
              <span>{displayPhone()}</span>
            </a>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-5 py-3 text-sm text-zinc-300 transition hover:border-gold/50 hover:bg-gold/5 hover:text-white"
            >
              <InstagramIcon size={18} className="text-gold" />
              <span>{siteConfig.instagram.handle}</span>
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
