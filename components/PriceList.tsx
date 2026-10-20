"use client";

import { motion } from "framer-motion";
import { CircleCheck, Sparkles, Video, HardDriveDownload } from "lucide-react";
import { formatRupiah, MAIN_PACKAGES, PROMO_BONUS, type MainPackage } from "@/data/pricelist";
import { getPackageInterestLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";
import { cn } from "@/lib/utils";

export default function PriceList() {

  return (
    <section id="pricelist" className="relative border-t border-white/5 bg-ink-soft/40 py-20 sm:py-28">
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="pointer-events-none absolute right-1/4 top-1/4 h-48 w-48 sm:h-80 sm:w-80 rounded-full bg-gold/5 blur-[50px] sm:blur-[130px]" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Price List Paket Resmi</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Paket Dokumentasi <span className="italic text-gradient-gold">Pilihan</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Biaya terjangkau dengan hasil berkualitas studio. Setiap paket sudah dilengkapi bonus promo video reels secara gratis!
          </p>
        </div>

        {/* Promo Announcement Banner */}
        <div className="mx-auto my-10 max-w-3xl overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-r from-gold/10 via-emerald-500/10 to-gold/10 p-4 text-center sm:p-5">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold sm:text-sm">
            <Video className="size-4 text-emerald-400" />
            <span>Spesial Promo Terbatas</span>
          </div>
          <p className="mt-1 text-sm text-zinc-200 sm:text-base">
            Setiap pemesanan paket apa saja mendapatkan <strong className="text-emerald-400">FREE Video Reels / Shorts Sinematik</strong> untuk Instagram &amp; TikTok Anda!
          </p>
        </div>

        {/* Grid 3 Paket Utama */}
        <div className="grid gap-6 md:grid-cols-3">
          {MAIN_PACKAGES.map((pkg, i) => {
            const highlighted = !!pkg.badge;

            return (
              <motion.article
                key={pkg.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className={cn(
                  "relative flex flex-col rounded-3xl border p-6 transition-all duration-300 sm:p-7",
                  highlighted
                    ? "border-gold/50 bg-gradient-to-b from-gold/[0.12] to-ink-card shadow-[0_24px_60px_-28px] shadow-gold/40"
                    : "border-white/10 bg-ink-card hover:border-white/20 hover:shadow-xl hover:shadow-black/60",
                )}
              >
                {/* Badge Atas */}
                {pkg.badge && (
                  <span className="absolute -top-3 right-6 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink shadow-sm">
                    {pkg.badge}
                  </span>
                )}

                <span className="text-xs font-medium text-gold/90">{pkg.categoryTitle}</span>
                <h3 className="mt-1 text-2xl font-bold leading-snug text-white">{pkg.name}</h3>

                {/* Start From Label & Price */}
                <div className="mt-4 border-b border-white/10 pb-5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                    Mulai dari
                  </span>
                  <p className="mt-0.5 text-4xl font-extrabold tracking-tight text-white">
                    {formatRupiah(pkg.startingPrice)}
                  </p>
                  <p className="mt-2 text-xs font-medium text-zinc-300">
                    {pkg.description}
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-400">
                    {pkg.spots} · {pkg.editedPhotos}
                  </p>
                </div>

                {/* Promo Special Tag */}
                <div className="my-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-300">
                  <Video className="size-4 shrink-0 text-emerald-400" />
                  <span className="leading-tight">PROMO: FREE Video Reels / Shorts!</span>
                </div>

                {/* Fasilitas */}
                <ul className="flex-1 space-y-3">
                  {pkg.features.map((feature) => {
                    const isPromo = feature === PROMO_BONUS;
                    return (
                      <li
                        key={feature}
                        className={cn(
                          "flex items-start gap-3 text-sm",
                          isPromo ? "font-semibold text-emerald-300" : "text-zinc-300",
                        )}
                      >
                        {isPromo ? (
                          <Sparkles className="mt-0.5 size-[18px] shrink-0 text-emerald-400" />
                        ) : (
                          <CircleCheck className="mt-0.5 size-[18px] shrink-0 text-emerald-400" />
                        )}
                        <span>{feature}</span>
                      </li>
                    );
                  })}
                </ul>

                <p className="mt-6 flex items-center gap-2 rounded-xl bg-white/[0.03] px-3 py-2.5 text-xs text-zinc-400">
                  <HardDriveDownload className="size-4 shrink-0 text-gold" />
                  File dikirim aman via tautan Google Drive
                </p>

                <a
                  href={getPackageInterestLink(pkg.name, pkg.startingPrice)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wa mt-4 w-full"
                >
                  <WhatsAppIcon size={18} />
                  Hubungi Admin via WhatsApp
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
