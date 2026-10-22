import Image from "next/image";
import { Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { getGeneralChatLink } from "@/lib/whatsapp";
import { WhatsAppIcon, InstagramIcon } from "@/components/icons/SocialIcons";

export default function MaintenanceView() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-ink px-5 py-10 text-white selection:bg-gold selection:text-ink">
      {/* Ambient Lighting Background */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-[280px] w-[320px] sm:h-[450px] sm:w-[500px] rounded-full bg-gold/10 blur-[90px] sm:blur-[150px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[280px] w-[320px] sm:h-[500px] sm:w-[600px] rounded-full bg-zinc-800/40 blur-[90px] sm:blur-[160px]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Header / Brand Logo */}
      <header className="relative z-10 flex items-center gap-3 pt-4">
        <div className="relative size-9 sm:size-10 overflow-hidden rounded-full border border-gold/40 bg-gold/10 p-1.5 shadow-lg shadow-gold/10">
          <Image
            src="/images/aperture-white.png"
            alt="Fotonic Shutter Icon"
            width={40}
            height={40}
            priority
            className="size-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-display text-lg sm:text-xl font-bold tracking-wider text-white">
            {siteConfig.name}
          </span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-zinc-400">
            {siteConfig.subtitle}
          </span>
        </div>
      </header>

      {/* Main Content Box */}
      <main className="relative z-10 mx-auto my-auto max-w-xl text-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur-md">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-amber-500" />
          </span>
          <span>Website Under Maintenance</span>
        </div>

        {/* Big White Logo */}
        <div className="my-6 flex justify-center">
          <div className="relative w-full max-w-[260px] sm:max-w-[320px]">
            <Image
              src="/images/logo-white.png"
              alt="Fotonic Photo & Video Project"
              width={1024}
              height={442}
              priority
              draggable={false}
              className="pointer-events-none select-none h-auto w-full object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-display text-2xl sm:text-4xl font-extrabold leading-tight text-white">
          Sedang Dalam <span className="italic text-gradient-gold">Pembaruan Sistem</span>
        </h1>

        <p className="mx-auto mt-4 max-w-md text-xs sm:text-sm leading-relaxed text-zinc-300">
          Kami sedang melakukan pembaruan berkala pada portofolio dan katalog karya Fotonic untuk memberikan pengalaman visual terbaik bagi Anda. 
          Website akan segera aktif kembali.
        </p>

        {/* Info Note: Layanan Tetap Buka */}
        <div className="mx-auto my-6 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs text-zinc-300 sm:max-w-md">
          <Sparkles className="size-4 shrink-0 text-gold" />
          <span>Layanan fotografi &amp; reservasi jadwal photoshoot tetap buka seperti biasa!</span>
        </div>

        {/* CTA Hubungi WhatsApp & Instagram */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={getGeneralChatLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-bold shadow-lg shadow-wa/20"
          >
            <WhatsAppIcon size={18} />
            <span>Hubungi Admin via WhatsApp</span>
          </a>

          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-xs sm:text-sm font-semibold text-white transition hover:border-gold hover:text-gold"
          >
            <InstagramIcon size={17} className="text-pink-400" />
            <span>Instagram @fotonicproject</span>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 pt-6 text-center text-[11px] text-zinc-500">
        <p>&copy; {new Date().getFullYear()} Fotonic Photo &amp; Video Project. All rights reserved.</p>
      </footer>
    </div>
  );
}
